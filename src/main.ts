import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import dayjs from "dayjs";
import dayjsUtc from "dayjs/plugin/utc";

dayjs.extend(dayjsUtc)

const app = createApp(App)

app.use(router)

app.mount('#app')
