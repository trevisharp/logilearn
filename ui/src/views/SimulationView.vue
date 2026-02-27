<script setup lang="ts">
import AIText from '@/components/AIText.vue';
import SimulatorComponent from '@/components/SimulatorComponent.vue';
import router from '@/router';
import { requestGeneration } from '@/services/aiGeneratorService';
import { createNewCircuit, getUserCircuit } from '@/services/gistService';
import { useFlagsStore  } from '@/stores/flagsStore';
import { onMounted, ref } from 'vue';

const flagStore = useFlagsStore()

const model = ref({
    gates: [],
    wires: []
})

const width = ref(0);
const height = ref(0)
const container = ref<HTMLElement | null>(null)
onMounted(async () =>
{
    const code = router.currentRoute.value.params.code as string;

    if (code == "new") {
        const newGist = await createNewCircuit()
        router.push("/simulation/" + newGist.id)
        return;
    }

    if (code != "test") {
        const json = await getUserCircuit(code)
        model.value = JSON.parse(json)
    }

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

    <div class="ai-container" v-if="flagStore.aiCircuitGenerator">
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