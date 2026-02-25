<script lang="ts" setup>
import type { Gist } from '@/contracts/Gist';
import router from '@/router';

const props = defineProps<{
    gist: Gist
}>()
</script>

<template>
    <div class="item" @click="() => router.push('/simulation/' + props.gist.id)">
        <div> Gist {{ props.gist.id }} </div>
        <div> description: {{ props.gist.description ?? "none" }} </div>
        <div> files: {{ Object.keys(props.gist.files) }}</div>
    </div>
</template>

<style lang="css" scoped>
.item {
    cursor: pointer;
    background-color: rgb(5, 5, 10);
    border: solid #ddd 1px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
</style>