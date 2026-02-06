<script lang="ts" setup>
import { ElCard, ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElIcon } from 'element-plus';
import { Plus, RefreshLeft, RefreshRight } from '@element-plus/icons-vue';
import type { KonvaEventObject } from 'konva/lib/Node';
import { onMounted, onUnmounted, ref } from 'vue';
import { Circuit } from '@/simulation/engine/Circuit';
import type { RenderContext } from '@/simulation/rendering/RenderContext';
import Konva from 'konva';
import type { Command } from '@/simulation/commands/Command';
import { AddInputGateCommand } from '@/simulation/commands/AddInputGateCommand';

const circuit = new Circuit()

const history: Command[] = []
const undohistory: Command[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const layerRef = ref<any>(null)
let layer: Konva.Layer
onMounted(() => {
    layer = layerRef.value.getNode()
})
const getContextRender = () => {
    return {
        layer: layer
    } as RenderContext
}


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

let newItemDeslocation = 0
const menu = ref({
    visible: false,
    x: 0,
    y: 0
})
const openContextMenu = (e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault()
    
    newItemDeslocation = 0
    menu.value = {
        visible: true,
        x: e.evt.clientX,
        y: e.evt.clientY
    }
}
const closeMenu = () => menu.value.visible = false;


const addInput = () => {
    const command = new AddInputGateCommand(
        circuit, getContextRender(),
        menu.value.x, menu.value.y + newItemDeslocation
    )
    newItemDeslocation += 20
    command.do()
    history.push(command)
}

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

const handleClick = () => {
    closeMenu()
}

const handleDrag = () => {

};

const handleDrop = () => {

};

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
}

onMounted(() => window.addEventListener('keydown', onKeyDown))

onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

</script>

<template>
    <div ref="container" class="canva-container">
        <v-stage
        @dragstart="handleDrag"
        @dragend="handleDrop"
        @contextmenu="openContextMenu"
        @click="handleClick"
        :config="{ width: width, height: height }">
            <v-layer ref="layerRef"></v-layer>
        </v-stage>

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
                    </el-menu-item-group>

                    <el-menu-item-group title="Logic" class="item-group">
                        <el-menu-item index="or-gate" class="sub-menu-item">Or Gate</el-menu-item>
                        <el-menu-item index="and-gate" class="sub-menu-item">And Gate</el-menu-item>
                        <el-menu-item index="not-gate" class="sub-menu-item">Not Gate</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

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