import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
    state: () => ({
        expandedMenu: false,
    }),
    actions: {
        toggleExpandMenu() {
            this.expandedMenu = !this.expandedMenu;
        },
    },
    getters: {
        getExpandMenu: (state) => state.expandedMenu,
    },
});
