import { defineStore } from 'pinia';
import getUserData from '../composables/getUserData.js';

const useUserStore = defineStore('user', {
    state: () => ({
        userId: '',
        userData: {
            isLoading: false,
            data: null,
        },
    }),
    getters: {
        getUserId: (state) => state.userId,
        getUserInfo: (state) => state.userData,
    },
    actions: {
        async fetchUserData() {
            const { documents } = getUserData('userProfile', this.userId);
            this.userData.data = await documents;
        },
        setUid(uid) {
            this.userId = uid;
        },
    },
});

export default useUserStore;
