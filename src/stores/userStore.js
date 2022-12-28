import { defineStore } from 'pinia';
import getUser from '../composables/getUser.js';

const useUserStore = defineStore('user', {
    state: () => ({
        userId: getUser().user.value.uid || '',
    }),
    getters: {
        getUserId: (state) => state.userId,
    },
    actions: {},
});

export default useUserStore;
