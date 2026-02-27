<script setup lang="ts">
import { type Gist } from '@/contracts/Gist';
import GistItem from './GistItem.vue';

const props = defineProps<{
    gists: Gist[]
}>()
</script>

<template>
    <div class="gistcontainer">
        <div v-if="props.gists.length == 0">
            Nenhum gist de circuito foi encontrado em seu github.
        </div>

        <div v-for="gist in props.gists" :key="gist.id">
            <GistItem :gist="gist"></GistItem>
        </div>
    </div>
</template>

<style lang="css" scoped>
.gistcontainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: solid gray 1px;
    width: fit-content;
}
</style>