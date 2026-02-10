<script lang="ts" setup>
import { ElCard, ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElIcon } from 'element-plus';
import { Plus, RefreshLeft, RefreshRight, Link } from '@element-plus/icons-vue';
import type { KonvaEventObject } from 'konva/lib/Node';
import { onMounted, onUnmounted, ref } from 'vue';
import { Circuit } from '@/simulation/engine/Circuit';
import type { RenderContext } from '@/simulation/rendering/RenderContext';
import Konva from 'konva';
import type { Command } from '@/simulation/commands/Command';
import { AddInputGateCommand } from '@/simulation/commands/AddInputGateCommand';
import { MoveGateCommand } from '@/simulation/commands/MoveGateCommand';
import type { SimulationItem } from '@/simulation/engine/SimulationItem';
import { AddOutputGateCommand } from '@/simulation/commands/AddOutputGateCommand';
import { ConnectGateCommand } from '@/simulation/commands/ConnectGateCommand';

const circuit = new Circuit()
const visualMap = new Map<Konva.Group, SimulationItem>()

setInterval(() => {
    circuit.onTick(0.02)
}, 20);

const container = ref<HTMLElement | null>(null)
const width = ref(0);
const height = ref(0)
onMounted(() =>
{
    if (container.value == null)
        return;

    width.value = container.value.clientWidth;
    height.value = container.value.clientHeight;
})

//#region UNDO/REDO SYSTEM

const history: Command[] = []
const undohistory: Command[] = []

const undo = () => {
    const command = history.pop()
    if (command === undefined) {
        return
    }

    command.undo()
    undohistory.push(command)
}

const redo = () => {
    const command = undohistory.pop()
    if (command === undefined) {
        return
    }
    
    command.do()
    history.push(command)
}

//#endregion


//#region LAYER A RENDER CONTEXT SETUP

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const layerRef = ref<any>(null)
const ctx = ref<RenderContext>() 
let layer: Konva.Layer
onMounted(() => {
    layer = layerRef.value.getNode()

    ctx.value = {
        layer: layer,
        map: visualMap,
        connectMode: false,
        currentWire: null,
        currentWireGate: null
    }
})
const getContextRender = () => {
    if (ctx.value === undefined) {
        throw Error()
    }
    return ctx.value
}

//#endregion


//#region CONTEXT MENU SETUP

const handleClick = () => {
    closeMenu()
}

let newItemDeslocation = 0
const menu = ref({
    visible: false,
    x: 0,
    y: 0
})
const openContextMenu = (e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault()
    
    if (e.target.getClassName() !== "Stage") {
        return
    }
    
    newItemDeslocation = 0
    menu.value = {
        visible: true,
        x: e.evt.clientX,
        y: e.evt.clientY
    }
}
const closeMenu = () => menu.value.visible = false;

//#endregion


//#region DRAG DROP BEHAVIOUR

let draggedGroup: Konva.Group | null = null
let pointerStart: Konva.Vector2d | null = null

const handleDrag = (e: Konva.KonvaEventObject<DragEvent>) => {
    draggedGroup = e.target as Konva.Group
    pointerStart = draggedGroup.position()
};

const handleDrop = () => {
    if (draggedGroup === null || pointerStart === null) {
        return
    }

    const pointerEnd = draggedGroup.position()
    if (pointerEnd === null) {
        return
    }

    const simulationItem = visualMap.get(draggedGroup)
    if (simulationItem === undefined) {
        return
    }
    
    const command = new MoveGateCommand(
        simulationItem.getVisualItem(), pointerStart, pointerEnd
    )
    command.do()
    history.push(command)

    pointerStart = null
    draggedGroup = null
};

//#endregion


//#region SHORTCUT KEYS SETUP

const onKeyDown = (e: KeyboardEvent) => {
    const isCtrl = e.ctrlKey || e.metaKey

  if (e.key === 'z' || e.key === 'Z' && isCtrl) {
    e.preventDefault()
    undo()
    return
  }

  if (e.key === 'y' || e.key === 'Y' && isCtrl) {
    e.preventDefault()
    redo()
    return
  }

  if (e.key === 'k' || e.key === 'K' && isCtrl) {
    e.preventDefault()
    if (ctx.value === undefined) {
        return
    }
    ctx.value.connectMode = !ctx.value.connectMode
    return
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))

onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

//#endregion

const addInput = () => {
    const command = new AddInputGateCommand(
        circuit, getContextRender(),
        menu.value.x, menu.value.y + newItemDeslocation
    )
    newItemDeslocation += 40
    command.do()
    history.push(command)
}

const addOutput = () => {
    const command = new AddOutputGateCommand(
        circuit, getContextRender(),
        menu.value.x, menu.value.y + newItemDeslocation
    )
    newItemDeslocation += 40
    command.do()
    history.push(command)
}

const connect = () => {
    getContextRender().connectMode = true
}

const disableconnect = () => {
    getContextRender().connectMode = false
}

const findClosest = (x: number, y: number) => {

    let closest = circuit.gates[0]
    if (closest === undefined) {
        return
    }
    let dist = 
        (closest.x - x) * (closest.x - x) + 
        (closest.y - y) * (closest.y - y)

    circuit.gates.forEach(gate => {
        const dx = gate.x - x
        const dy = gate.y - y
        const newdist = dx * dx + dy * dy
        if (newdist < dist) {
            dist = newdist
            closest = gate
        }
    });

    return closest
}

const mousedownConnectLogic = (e: KonvaEventObject<PointerEvent>) => {
    
    if (!ctx.value?.connectMode) {
        return
    }

    const closest = findClosest(e.evt.x, e.evt.y)
    if (closest === undefined) {
        return
    }

    ctx.value.currentWireGate = closest
}

const mouseupConnectLogic = (e: KonvaEventObject<PointerEvent>) => {
    
    if (!ctx.value?.connectMode) {
        return
    }

    if (ctx.value.currentWireGate === null) {
        return
    }

    const closest = findClosest(e.evt.x, e.evt.y)
    if (closest === undefined) {
        return
    }

    const command = new ConnectGateCommand(
        ctx.value.currentWireGate, closest, ctx.value
    )
    command.do()
    history.push(command)
}

</script>

<template>
<div ref="container" class="canva-container">
    <v-stage ref="stageRef"
    @dragstart="handleDrag"
    @dragend="handleDrop"
    @contextmenu="openContextMenu"
    @click="handleClick"
    @mousedown="mousedownConnectLogic"
    @mouseup="mouseupConnectLogic"
    :config="{ width: width, height: height }">
        <v-layer ref="layerRef"></v-layer>
    </v-stage>

    <div class="connect-mode-message" v-if="ctx?.connectMode">
        Connect Mode ON
    </div>

    <el-card
        v-if="menu.visible"
        class="context-menu"
        :style="{ top: menu.y + 'px', left: menu.x + 'px' }"
        shadow="always">
        
        <el-menu default-active="2" class="vertical-menu">
            
            <el-sub-menu index="add">
                <template #title>
                    <el-icon><plus color="white"/></el-icon>
                    <span class="item-title">Add</span>
                </template>
                <el-menu-item-group title="Basic Gates" class="item-group">
                    <el-menu-item index="input-gate" class="sub-menu-item" @click="addInput">Input</el-menu-item>
                    <el-menu-item index="ouput-gate" class="sub-menu-item" @click="addOutput">Output</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group title="Logic" class="item-group">
                    <el-menu-item index="or-gate" class="sub-menu-item">Or Gate</el-menu-item>
                    <el-menu-item index="and-gate" class="sub-menu-item">And Gate</el-menu-item>
                    <el-menu-item index="not-gate" class="sub-menu-item">Not Gate</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item index="connect" class="menu-item" @click="connect" v-if="!ctx?.connectMode">
                <el-icon><Link color="white"/></el-icon>
                <span class="item-title">Enable Connect Mode (Ctrl + K)</span>
            </el-menu-item>

            <el-menu-item index="connect" class="menu-item" @click="disableconnect" v-if="ctx?.connectMode">
                <el-icon><Link color="white"/></el-icon>
                <span class="item-title">Disable Connect Mode (Ctrl + K)</span>
            </el-menu-item>

            <el-menu-item index="undo" class="menu-item" @click="undo">
                <el-icon><refresh-left color="white"/></el-icon>
                <span class="item-title">Undo (Ctrl + Z)</span>
            </el-menu-item>

            <el-menu-item index="redo" class="menu-item" @click="redo">
                <el-icon><refresh-right color="white"/></el-icon>
                <span class="item-title">Redo (Ctrl + Y)</span>
            </el-menu-item>

        </el-menu>

    </el-card>

</div>
</template>

<style scoped>
.canva-container {
    width: 100%;
    height: 100%;
}

.connect-mode-message {
    position: fixed;
    right: 10px;
    bottom: 10px;
}

.context-menu {
    background-color: rgb(30, 30, 40);
    position: absolute;
    z-index: 10;
    padding: 0;
    margin: 0;
}

:deep(.el-sub-menu__title:hover) {
    background-color: gray;
}

.vertical-menu {
    background-color: rgb(30, 30, 40);
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
}

.menu-item {
    color: white;
    line-height: var(--el-menu-item-height);
    padding: 0 var(--el-menu-base-level-padding);
}

.menu-item:hover {
    background-color: gray;
}

.sub-menu-item {
    color: white;
    margin-left: 20px;
    line-height: calc(var(--el-menu-item-height) / 2);
}

.sub-menu-item:hover {
    background-color: gray;
}


.item-group {
    background-color: rgb(30, 30, 40);
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
}

.item-title {
    color: white;
}
</style>