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
        userIssues: {
            data: null,
        },
        userContacts: {
            data: null,
        },
    }),
    getters: {
        getUserId: (state) => state.userId,
        getUserInfo: (state) => state.userData,
        getPatientCerts: (state) => state.patientCerts.data,
        getPatientTests: (state) => state.patientTests.data,
        getUserIssues: (state) => state.userIssues.data,
        getUserContacts: (state) => state.userContacts.data,
    },
    actions: {
        setUserId(uid) {
            this.userId = uid;
        },
        async fetchUserData() {
            const { documents } = getCollection('userProfile');
            this.userData.data = documents;
        },
        async fetchPatientCerts() {
            const { documents } = getCollection('certificates');
            this.patientCerts.data = documents;
        },
        async fetchPatientTests() {
            const { documents } = getCollection('research');
            this.patientTests.data = documents;
        },
        async fetchUserIssues() {
            const { documents } = getCollection('userIssues');
            this.userIssues.data = documents;
        },

        async fetchUserContacts() {
            const { documents } = getCollection('userContacts');
            this.userContacts.data = documents;
        },
    },
});

export default useUserStore;
