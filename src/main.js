import {createApp} from 'vue'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style'
import './style.css'
import App from './App.vue'
import axios from "axios";

axios.defaults.baseURL = '/api'

createApp(App).use(Varlet).mount('#app')
