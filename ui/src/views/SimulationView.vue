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

const description = ref('circuit description')

const model = ref({
    gates: [],
    wires: []
})
const showSaved = ref(false)
const showGenerating = ref(false)

const updateModel = async (value: string) => {
    const code = router.currentRoute.value.params.code as string;
    if (code == "test" || code == "new") {
        return
    }

    const success = await updateUserCircuit(code, description.value, value)
    showSaved.value = success

    setTimeout(() => showSaved.value = false, 2000)
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
    showGenerating.value = true
    const response = await requestGeneration(prompt, width.value, height.value)
    model.value = JSON.parse(response)
    showGenerating.value = false
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

    <div class="saved-container" v-if="showSaved">
        <h3>Salvo!</h3>
    </div>

    <div class="generating-container" v-if="showGenerating">
        <h3>Gerando...</h3>
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
    bottom: 60px;
}

.desc-container {
    position: absolute;
    width: 80px;
    bottom: 20px;
    opacity: 0.20;
    padding: 0px 20px;
    transition: width 0.4s ease-in-out;
    transition: opacity 0.4s ease-in-out;
}

.desc-container:hover {
    position: absolute;
    width: calc(100vw - 40px);
    opacity: 1;
    bottom: 20px;
    padding: 0px 20px
}

.saved-container {
    position: absolute;
    top: 80px;
    left: 20px;
    opacity: 0.5;
}

.generating-container {
    position: absolute;
    top: 80px;
    left: 20px;
    opacity: 0.5;
}
</style>