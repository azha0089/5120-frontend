import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import L from 'leaflet'
import 'leaflet-routing-machine'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css' // Import Element Plus styles
// Fix Leaflet icon path issues
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const app = createApp(App)
app.use(ElementPlus)
app.config.globalProperties.$L = L

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {  // Register all icons
  app.component(key, component)
}

app.use(router).mount('#app')
