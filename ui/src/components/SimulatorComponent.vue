<script lang="ts" setup>
import { ElCard, ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElIcon } from 'element-plus';
import { Plus, RefreshLeft, RefreshRight } from '@element-plus/icons-vue';
import type { KonvaEventObject } from 'konva/lib/Node';
import { onMounted, onUnmounted, ref } from 'vue';

const container = ref<HTMLElement | null>(null)

const width = ref(0);
const height = ref(0)

const menu = ref({
    visible: false,
    x: 0,
    y: 0
})

onMounted(() =>
{
    if (container.value == null)
        return;

    width.value = container.value.clientWidth;
    height.value = container.value.clientHeight;
})

const closeMenu = () => menu.value.visible = false;

const undo = () => {
    console.log("undo")
}

const redo = () => {
    console.log("redo")

}

const handleClick = () => {
    closeMenu()
}

const handleDrag = () => {

};

const handleDrop = () => {

};

const openContextMenu = (e: KonvaEventObject<PointerEvent>) => {
    e.evt.preventDefault()

    menu.value = {
        visible: true,
        x: e.evt.clientX,
        y: e.evt.clientY
    }
}

const handleSelect = (key: string, keyPath: string[]) => {
    closeMenu();

    console.log(key)
    console.log(keyPath)
}

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
            <v-layer>
                <v-circle :config="{ x: width / 2, y: 10, radius: 60, fill: 'red', draggable: true }"></v-circle>
            </v-layer>
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