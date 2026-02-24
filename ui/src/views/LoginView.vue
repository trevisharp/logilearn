<script setup lang="ts">
import { ElButton } from 'element-plus';
import { Icon } from '@iconify/vue'

const auth = () =>
{
    window.location.href = "http://localhost:5148/api/v1/auth"
}

</script>

<template>
    <div class="container">
        <div class="authBox">
            <h3>Opções de Login</h3>
            <div class="authOptions">
                <el-button @click="auth">
                    <Icon icon="simple-icons:github" width="18" style="margin-right: 6px;" />
                    Continuar com o Github
                </el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100%;
}

.authBox {
    border: solid white 2px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.authOptions {
    margin: 5px;
}
</style>