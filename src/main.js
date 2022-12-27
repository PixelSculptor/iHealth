import { createApp, watch } from 'vue';
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
    faFileImport,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import router from './router/index.js';
import { projectAuth } from './firebase/config.js';
library.add(
    faGoogle,
    faFacebook,
    faUser,
    faUserDoctor,
    faHeartPulse,
    faDatabase,
    faFileMedical,
    faFileWaveform,
    faFileImport,
    faFileWaveform,
    faBars,
    faXmark,
    faGauge,
    faIdCard,
    faCapsules,
    faFilePrescription,
    faCalendarCheck,
    faArrowRightFromBracket,
    faPlus
);

let app;
const pinia = createPinia();
projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .component('font-awesome-icon', FontAwesomeIcon)
            .use(pinia)
            .use(router)
            .mount('#app');
    }
});
if (localStorage.getItem('state')) {
    pinia.state.value = JSON.parse(localStorage.getItem('state'));
}
watch(
    pinia.state,
    (state) => {
        localStorage.setItem('state', JSON.stringify(state));
    },
    { deep: true }
);
