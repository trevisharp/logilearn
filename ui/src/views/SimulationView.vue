<script setup lang="ts">
import AIText from '@/components/AIText.vue';
import SimulatorComponent from '@/components/SimulatorComponent.vue';
import router from '@/router';
import { requestGeneration } from '@/services/aiGeneratorService';
import { createNewCircuit, getUserCircuit, updateUserCircuit } from '@/services/gistService';
import { useFlagsStore  } from '@/stores/flagsStore';
import { onMounted, ref } from 'vue';
import { ElInput } from 'element-plus';

const flagStore = useFlagsStore()

const description = ref('')

const model = ref({
    gates: [],
    wires: []
})

const updateModel = async (value: string) => {
    const code = router.currentRoute.value.params.code as string;
    if (code == "test" || code == "new") {
        return
    }

    await updateUserCircuit(code, description.value, value)
};

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
        model.value = JSON.parse(json.circuit)
        description.value = json.description
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
        <SimulatorComponent :model="model" @model-changed="updateModel" />
    </div>

    <div class="ai-container" v-if="flagStore.aiCircuitGenerator">
        <AIText @sended="generateModel"></AIText>
    </div>

    <div class="desc-container">
        <el-input v-model="description"></el-input>
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

.desc-container {
    position: absolute;
    width: 80px;
    bottom: 40px;
    opacity: 0.20;
    padding: 0px 20px;
    transition: width 0.4s ease-in-out;
    transition: opacity 0.4s ease-in-out;
}

.desc-container:hover {
    position: absolute;
    width: calc(100vw - 40px);
    opacity: 1;
    bottom: 40px;
    padding: 0px 20px
}
</style>