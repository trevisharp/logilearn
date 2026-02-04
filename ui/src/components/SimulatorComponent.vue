<script lang="ts" setup>
import { onMounted, ref } from 'vue';

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

const handleDrag = () => {
};

const handleDrop = () => {
};

</script>

<template>
    <div ref="container" class="canva-container">
        <v-stage
        @dragstart="handleDrag"
        @dragend="handleDrop"
        :config="{ width: width, height: height }">
            <v-layer>
                <v-circle :config="{ x: width / 2, y: 10, radius: 60, fill: 'red', draggable: true }"></v-circle>
            </v-layer>
        </v-stage>
    </div>
</template>

<style scoped>
.canva-container {
    width: 100%;
    height: 100%;
}
</style>