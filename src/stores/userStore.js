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
        patientVisits: {
            data: null,
        },
    }),
    getters: {
        getUserId: (state) => state.userId,
        getUserInfo: (state) => state.userData,
        getPatientCerts: (state) => state.patientCerts.data,
        getPatientTests: (state) => state.patientTests.data,
        getPatientVisits: (state) => state.patientVisits.data,
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
        async fetchPatientVisits() {
            const { documents } = getCollection('visits');
            this.patientVisits = documents;
        },
    },
});

export default useUserStore;
