<template>
    <aside
        class="menu"
        :class="{ isExpanded: appStore.getExpandMenu }">
        <brand-header-component :hide-brand="appStore.getExpandMenu" />
        <section class="menu__toggle--wrap">
            <button
                class="toggleMenu"
                @click="toggleMenu">
                <font-awesome-icon
                    v-if="!appStore.getExpandMenu"
                    icon="fa-solid fa-bars" />
                <font-awesome-icon
                    v-else
                    icon="fa-solid fa-xmark" />
            </button>
        </section>

        <section class="menuLinks">
            <button-component
                v-for="view in menuViews"
                :key="view"
                :to="view.name"
                menu
                main
                wide>
                <font-awesome-icon :icon="view.classIcon" />
                <span>{{ view.title }}</span>
            </button-component>
            <button-component
                @click="handleLogout"
                class="logoutBtn"
                main
                wide>
                <font-awesome-icon
                    icon="fa-solid fa-arrow-right-from-bracket" />
                <span class="text">Wyloguj się</span>
            </button-component>
        </section>
        <section class="otherLink"></section>
    </aside>
</template>

<script setup>
    import BrandHeaderComponent from './BrandHeaderComponent.vue';
    import ButtonComponent from './ButtonComponent.vue';
    import { ref } from 'vue';
    import useLogout from '../composables/useLogout.js';
    import { useRouter } from 'vue-router';
    import { useAppStore } from '../stores/appStore.js';

    const appStore = useAppStore();
    const { error, logout } = useLogout();
    const menuViews = ref([
        { name: 'Home', title: 'Dashboard', classIcon: 'fa-solid fa-gauge' },
        { name: 'Profile', title: 'Profil', classIcon: 'fa-solid fa-id-card' },
        {
            name: 'Prescriptions',
            title: 'Recepty',
            classIcon: 'fa-solid fa-capsules',
        },
        {
            name: 'Referrals',
            title: 'Skierowania',
            classIcon: 'fa-solid fa-file-prescription',
        },
        {
            name: 'Visits',
            title: 'Wizyty',
            classIcon: 'fa-solid fa-calendar-check',
        },
    ]);
    const router = useRouter();

    const toggleMenu = () => {
        appStore.toggleExpandMenu();
    };

    const handleLogout = async () => {
        await logout();
        await router.push({ name: 'Login' });
        console.log(`Wylogowano Cię!`);
        if (error.value) console.log(error.value);
    };
</script>

<style scoped lang="scss">
    .menu {
        @include flex-position(column, nowrap, flex-start, center);
        border-radius: 0 $border-radius--normal $border-radius--normal 0;
        background-color: $blue-500;
        color: $white;
        height: 100vh;
        width: calc(6vw + 2rem);
        overflow: hidden;

        gap: 3%;
        padding: 2rem;
        transition: all 0.3s ease-out;

        .menu__toggle--wrap {
            width: 100%;
            @include flex-position(column, nowrap, center, center);
            position: relative;
            top: 0;

            transition: 0.3s ease-in-out;

            .toggleMenu {
                @include flex-position(row, nowrap, center, center);
                width: inherit;
                height: inherit;
                box-sizing: border-box;
                background: none;
                color: $white;
                border: none;
                cursor: pointer;
                &:focus-visible {
                    @include focus;
                    color: $white;
                    border: none;
                    background: none;
                }
                &:deep(svg) {
                    height: 3rem;
                    &:hover {
                        animation: rotation 0.4s 1;
                    }
                }
            }
        }

        .menuLinks {
            height: 70vh;
            @include flex-position(column, wrap, space-around, flex-end);
            position: relative;
            transform: translateX(30%);
            span {
                opacity: 0;
                transition: 0.3s ease-out;
            }
            .logoutBtn {
                @include flex-position(row, nowrap, flex-start, center);
                @include text-header4($font-weight-semiBold);
                width: 100%;
                letter-spacing: 0.2rem;
                padding: 2.5rem;
                &:deep(svg) {
                    width: 3rem;
                    height: 3rem;
                    margin-right: 0.5rem;
                }
                &:deep(.text) {
                    opacity: 0;
                    transition: 0.3s ease-out;
                }
                &:hover {
                    background-color: $gray-100;
                    color: $blue-700;
                }
            }
        }

        &.isExpanded {
            width: 30rem;
            @include flex-position(column, nowrap, flex-start, flex-start);
            .toggleMenu {
                justify-content: flex-end;
            }
            .menu__toggle--wrap {
                transform: translateY(-200%);
            }

            .menuLinks {
                transform: translateX(0);
                span {
                    opacity: 1;
                }
                .logoutBtn {
                    &:deep(.text) {
                        opacity: 1;
                    }
                }
            }
        }

        @media (max-width: 768px) {
            position: fixed;
            z-index: 99;
        }
    }

    @keyframes rotation {
        from {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
