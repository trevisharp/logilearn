<script lang="ts" setup>
import { Opportunity } from '@element-plus/icons-vue'
import { ElInput } from 'element-plus';
import { ref } from 'vue'

const input = ref("")

const emit = defineEmits<{(e: "sended", text: string): void}>()

const onRun = () => {
    emit("sended", input.value)
    input.value = ""
}
</script>

<template>
    <div class="input-container">
        <el-input class="elinput" v-model="input" 
            :prefix-icon="Opportunity" 
            placeholder="Generate circuits with AI"
            size="large" v-on:keydown.enter="onRun">
        </el-input>
    </div>
</template>

<style scoped>
.input-container {
    width: 100%;
}

.elinput {
    width: 90vw;
    margin: 2vh 5vw;
    background-color: rgb(30, 30, 40);
}
</style>