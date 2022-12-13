import { defineStore } from 'pinia/dist/pinia.js';

const useUserStore = defineStore('user', {
    state: () => ({
        userEmail: '',
        userName: '',
    }),
    getters: {
        getName: (state) => state.userName,
        getEmail: (state) => state.userEmail,
    },
    actions: {},
});

export default useUserStore;
