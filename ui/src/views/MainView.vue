<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SimulatorComponent from '@/components/SimulatorComponent.vue';
import { ElButton } from 'element-plus';
import router from '@/router';

const model = ref({
    gates: [
        { id: "S", x: 100, y: 120, type: "input" },
        { id: "R", x: 100, y: 300, type: "input" },
        { id: "notS", x: 260, y: 120, type: "not" },
        { id: "notR", x: 260, y: 300, type: "not" },
        { id: "notQbar", x: 360, y: 120, type: "not" },
        { id: "notQ", x: 360, y: 300, type: "not" },
        { id: "andQ", x: 460, y: 120, type: "and" },
        { id: "andQbar", x: 460, y: 300, type: "and" },
        { id: "Q", x: 640, y: 120, type: "output" },
        { id: "Qbar", x: 640, y: 300, type: "output" }
    ],
    wires: [
        { fromId: "S", toId: "notS" },
        { fromId: "notS", toId: "andQ" },
        { fromId: "R", toId: "notR" },
        { fromId: "notR", toId: "andQbar" },
        { fromId: "andQbar", toId: "notQbar" },
        { fromId: "notQbar", toId: "andQ" },
        { fromId: "andQ", toId: "notQ" },
        { fromId: "notQ", toId: "andQbar" },
        { fromId: "andQ", toId: "Q" },
        { fromId: "andQbar", toId: "Qbar" }
    ]
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

</script>

<template>
    <div class="page-container">
        <div class="title">
            <h1>Create. Test. Have fun.</h1>
        </div>
        
        <div class="example-area">
            <div class="simulation-example-container" ref="container">
                <SimulatorComponent :model="model" />
            </div>

            <div class="open-new-area">
                <el-button v-on:click="router.push({ path: '/simulation/test' })">
                    <h2>
                        Create your circuit >>
                    </h2>
                </el-button>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.title {
    padding-left: 20px;
    height: 10%;
}

.page-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.example-area {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
}

.simulation-example-container {
    height: calc(90% - 60px);
    width: 60%;
    margin: 20px;
    border: solid 2px white;
}

.open-new-area {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>