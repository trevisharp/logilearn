<script setup lang="ts">
import SimulatorComponent from '@/components/SimulatorComponent.vue';

const model = {
    gates: [
        { id: 'i1', x: 100, y: 100, type: 'input' },
        { id: 'i2', x: 100, y: 200, type: 'input' },
        { id: 'a1', x: 200, y: 100, type: 'and' },
        { id: 'a2', x: 200, y: 200, type: 'and' },
        { id: 'n1', x: 300, y: 100, type: 'not' },
        { id: 'n2', x: 300, y: 200, type: 'not' },
        { id: 'o1', x: 400, y: 100, type: 'output' },
    ],
    wires: [
        { fromId: 'i1', toId: 'a1' },
        { fromId: 'i2', toId: 'a2' },
        { fromId: 'a1', toId: 'n1' },
        { fromId: 'a2', toId: 'n2' },
        { fromId: 'n1', toId: 'o1' },
        { fromId: 'n1', toId: 'a2' },
        { fromId: 'n2', toId: 'a1' },
    ]
}
</script>

<template>
    <div class="page-container">
        <SimulatorComponent :model="model" />
    </div>
</template>

<style scoped>
.page-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>