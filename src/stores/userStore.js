import { defineStore } from 'pinia';
import getUser from '../composables/getUser.js';
import getCollection from '../composables/getCollections.js';

const useUserStore = defineStore('user', {
    state: () => ({
        userId: getUser().user.value.uid || '',
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
        fetchUserData() {
            const { documents } = getCollection('userProfile');
            this.userData.data = documents;
        },
    },
});

export default useUserStore;
