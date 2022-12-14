import { defineStore } from 'pinia';

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
