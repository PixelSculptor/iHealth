import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
    state: () => ({
        expandedMenu:
            JSON.parse(sessionStorage.getItem('expandedMenu')) || false,
    }),
    actions: {
        toggleExpandMenu() {
            this.expandedMenu = !this.expandedMenu;
            sessionStorage.setItem(
                'expandedMenu',
                JSON.stringify(this.expandedMenu)
            );
        },
    },
    getters: {
        getExpandMenu: (state) => state.expandedMenu,
    },
});
