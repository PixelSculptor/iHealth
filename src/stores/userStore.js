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
            data: null,
        },
        userIssues: {
            data: null,
        },
        userContacts: {
            data: null,
        },
        patientReferrals: {
            data: null,
        },
        patientImportReferrals: {
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
        getPatientPrescriptions: (state) => state.patientPrescriptions.data,
        getPatientImportPrescriptions: (state) =>
            state.patientImportPrescriptions.data,
        getUserIssues: (state) => state.userIssues.data,
        getUserContacts: (state) => state.userContacts.data,
        getPatientRefferals: (state) => state.patientReferrals.data,
        getPatientImportReferrals: (state) => state.patientImportReferrals.data,
        getPatientVisits: (state) => state.patientVisits.data,
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
        async fetchPatientPrescriptions() {
            const { documents } = getCollection('listOfRecipies');
            this.patientPrescriptions.data = documents;
        },
        async fetchPatientImportPrescriptions() {
            const { documents } = getCollection('listOfImportRecipies');
            this.patientImportPrescriptions.data = documents;
        },
        async fetchPatientReferrals() {
            const { documents } = getCollection('listOfReferrals');
            this.patientReferrals.data = documents;
        },
        async fetchPatientImportReferrals() {
            const { documents } = getCollection('listOfImportReferrals');
            this.patientImportReferrals.data = documents;
        },
        async fetchUserIssues() {
            const { documents } = getCollection('userIssues');
            this.userIssues.data = documents;
        },
        async fetchUserContacts() {
            const { documents } = getCollection('userContacts');
            this.userContacts.data = documents;
        },
        async fetchPatientVisits() {
            const { documents } = await getCollection('visits');
            this.patientVisits.data = documents;
        },
    },
});

export default useUserStore;
