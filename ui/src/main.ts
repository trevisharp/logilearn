import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva'
import { useFlagsStore } from './stores/flagsStore'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)
app.use(VueKonva)

const bootstrap = async () => {
  app.mount("#app")
  const flagsStore = useFlagsStore()
  await flagsStore.loadFlags()
}

bootstrap()
