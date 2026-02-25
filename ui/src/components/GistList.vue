<script setup lang="ts">
import { type Gist } from '@/contracts/Gist';
import GistItem from './GistItem.vue';

const props = defineProps<{
    gists: Gist[]
}>()
</script>

<template>
    <div class="gistcontainer">
        <div v-for="gist in props.gists" :key="gist.id">
            <GistItem :gist="gist"></GistItem>
        </div>
    </div>
</template>

<style lang="css" scoped>
.gistcontainer {
    display: flex;
}
</style>