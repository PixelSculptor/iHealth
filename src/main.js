import { createApp, watch } from 'vue';
import '../src/styles/model/reset.scss';
import './style.scss';
import App from './App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
    faArrowRightFromBracket,
    faBars,
    faCalendarCheck,
    faCalendarPlus,
    faCapsules,
    faCircleInfo,
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
    faPills,
    faPlus,
    faRepeat,
    faStethoscope,
    faSyringe,
    faTablets,
    faUser,
    faUserAstronaut,
    faUserDoctor,
    faVirusCovid,
    faXmark,
    faClipboard,
    faFile,
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
    faUserAstronaut,
    faTablets,
    faRepeat,
    faCalendarPlus,
    faCircleInfo,
    faClipboard,
    faFile
);

let app;
const pinia = createPinia();
projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App)
            .component('font-awesome-icon', FontAwesomeIcon)
            .use(VCalendar, {})
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
