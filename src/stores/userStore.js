import { defineStore } from 'pinia';
import getCollection from '../composables/getCollections.js';

const useUserStore = defineStore('user', {
    state: () => ({
        userId: '',
        userData: {
            data: null,
        },
    }),
    getters: {
        getUserId: (state) => state.userId,
        getUserInfo: (state) => state.userData,
    },
    actions: {
        fetchUserData() {
            const { documents } = getCollection('userProfile');
            this.userData.data = documents;
        },
        setUserId(uid) {
            this.userId = uid;
        },
    },
});

export default useUserStore;
