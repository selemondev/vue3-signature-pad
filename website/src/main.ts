import { createApp } from 'vue'
import './assets/css/tailwind.css'
import { VCodeBlock } from '@wdns/vue-code-block'
import App from './App.vue'

const app = createApp(App)
app.component('VCodeBlock', VCodeBlock)
app.mount('#app')
