<script setup lang="ts">
import AIText from '@/components/AIText.vue';
import SimulatorComponent from '@/components/SimulatorComponent.vue';
import { requestGeneration } from '@/services/aiGeneratorService';
import { onMounted, ref } from 'vue';

const model = ref({
    gates: [ 
        { id: "in", x: 100, y: 100, type: "input" }, 
        { id: "out", x: 200, y: 100, type: "output"}
    ],
    wires: [ { fromId: "in", toId: "out"} ]
})

const width = ref(0);
const height = ref(0)
const container = ref<HTMLElement | null>(null)
onMounted(() =>
{
    if (container.value == null)
        return;

    width.value = container.value.clientWidth;
    height.value = container.value.clientHeight;
})

const generateModel = async (prompt: string) => {
    const response = await requestGeneration(prompt, width.value, height.value)
    model.value = JSON.parse(response)
}
</script>

<template>
    <div class="page-container" ref="container">
        <SimulatorComponent :model="model" />
    </div>

    <div class="ai-container">
        <AIText @sended="generateModel"></AIText>
    </div>
</template>

<style scoped>
.page-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.ai-container {
    position: absolute;
    width: 100%;
    bottom: 20px;
}
</style>