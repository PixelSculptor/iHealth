import { defineStore } from 'pinia';
import getCollection from '../composables/getCollections.js';

const useUserStore = defineStore('user', {
    state: () => ({
        userId: '',
        userData: {
            data: null,
        },
        patientCerts: {
            data: null,
        },
        patientTests: {
            data: null,
        },
        patientPrescriptions: {
            data: null,
        },
        patientImportPrescriptions: {
            date: null,
        },
    }),
    getters: {
        getUserId: (state) => state.userId,
        getUserInfo: (state) => state.userData,
        getPatientCerts: (state) => state.patientCerts.data,
        getPatientTests: (state) => state.patientTests.data,
        getPatientPrescriptions: (state) => state.patientPrescriptions.data,
        getPatientImportPrescriptions: (state) =>
            state.patientImportPrescriptions.data,
    },
    actions: {
        async fetchUserData() {
            const { documents } = getCollection('userProfile');
            this.userData.data = documents;
        },
        setUserId(uid) {
            this.userId = uid;
        },
        async fetchPatientCerts() {
            const { documents } = getCollection('certificates');
            this.patientCerts.data = documents;
        },
        async fetchPatientTests() {
            const { documents } = getCollection('research');
            this.patientTests.data = documents;
        },
        async fetchPatientPrescriptions() {
            const { documents } = getCollection('listOfRecipies');
            this.patientPrescriptions.data = documents;
        },
        async fetchPatientImportPrescriptions() {
            const { documents } = getCollection('listOfImportRecipies');
            this.patientImportPrescriptions.data = documents;
        },
    },
});

export default useUserStore;
