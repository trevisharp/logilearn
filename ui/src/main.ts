import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva'
import { useFlagsStore } from './stores/flagsStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueKonva)

const bootstrap = async () => {
  const flagsStore = useFlagsStore()
  await flagsStore.loadFlags()
  app.mount("#app")
}

bootstrap()
