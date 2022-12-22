import { createApp } from 'vue';
import '../src/styles/model/reset.scss';
import './style.scss';
import App from './App.vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import {
    faUser,
    faUserDoctor,
    faHeartPulse,
    faDatabase,
    faFileMedical,
    faFileWaveform,
    faBars,
    faXmark,
    faGauge,
    faIdCard,
    faCapsules,
    faFilePrescription,
    faArrowRightFromBracket,
    faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import router from './router/index.js';
library.add(
    faGoogle,
    faFacebook,
    faUser,
    faUserDoctor,
    faHeartPulse,
    faDatabase,
    faFileMedical,
    faFileWaveform,
    faBars,
    faXmark,
    faGauge,
    faIdCard,
    faCapsules,
    faFilePrescription,
    faCalendarCheck,
    faArrowRightFromBracket
);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
    .use(router)
    .mount('#app');
