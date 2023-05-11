import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2'

import App from './App.vue'
import store from "./store"
import VTooltip from 'v-tooltip'

import 'sweetalert2/dist/sweetalert2.min.css'
import './assets/tailwind.css'
import './assets/darkMode.css'


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Importa los iconos de la categoría 'solid'
library.add(fas);

createApp(App)
    .use(store)
    .use(createPinia())
    .use(VueSweetalert2)
    .use(VTooltip)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')