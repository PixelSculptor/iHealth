import { createApp, watch } from 'vue';
import '../src/styles/model/reset.scss';
import './style.scss';
import App from './App.vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
    faArrowRightFromBracket,
    faBars,
    faCalendarCheck,
    faCapsules,
    faCrutch,
    faDatabase,
    faDroplet,
    faFileImport,
    faFileMedical,
    faFilePrescription,
    faFileWaveform,
    faGauge,
    faHandDots,
    faHeartPulse,
    faIdCard,
    faLungs,
    faNotesMedical,
    faPlus,
    faStethoscope,
    faSyringe,
    faUser,
    faUserAstronaut,
    faUserDoctor,
    faVirusCovid,
    faXmark,
    faPills,
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
    faPlus,
    faDroplet,
    faSyringe,
    faVirusCovid,
    faNotesMedical,
    faPills,
    faHandDots,
    faLungs,
    faCrutch,
    faStethoscope,
    faUserAstronaut
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
if (sessionStorage.getItem('state')) {
    pinia.state.value = JSON.parse(sessionStorage.getItem('state'));
}
watch(
    pinia.state,
    (state) => {
        sessionStorage.setItem('state', JSON.stringify(state));
    },
    { deep: true }
);
