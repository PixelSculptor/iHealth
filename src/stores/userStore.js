import { defineStore } from 'pinia';
import getCollection from '../composables/getCollections.js';

const useUserStore = defineStore('user', {
    state: () => ({
        userId: '',
        userData: {
            data: null,
        },
        patientTests: {
            data: null,
        },
    }),
    getters: {
        getUserId: (state) => state.userId,
        getUserInfo: (state) => state.userData,
        getPatientTests: (state) => state.patientTests.data,
    },
    actions: {
        async fetchUserData() {
            const { documents } = getCollection('userProfile');
            this.userData.data = documents;
        },
        setUserId(uid) {
            this.userId = uid;
        },
        async fetchPatientTests() {
            const { documents } = getCollection('research');
            this.patientTests.data = documents;
        },
    },
});

export default useUserStore;
