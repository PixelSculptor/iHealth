<template>
    <suspense>
        <template #default>
            <div class="app">
                <sidebar-component v-if="user" />
                <router-view v-slot="{ Component }">
                    <transition
                        name="fade"
                        mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </template>
        <template #fallback>
            <div class="loader">
                <bouncing-balls-component />
            </div>
        </template>
    </suspense>
</template>

<script setup>
    import { RouterView, useRouter } from 'vue-router';
    import { watch } from 'vue';
    import getUser from './composables/getUser.js';
    import useLogout from './composables/useLogout.js';

    import SidebarComponent from './components/SidebarComponent.vue';
    import BouncingBallsComponent from './components/BouncingBallsComponent.vue';

    const { logout } = useLogout();
    const { user } = getUser();
    const router = useRouter();
    watch(user, async () => {
        if (!user.value) {
            await logout();
            await router.push({ name: 'Login' });
        }
    });
</script>

<style scoped lang="scss">
    .app {
        @include wrapper(1fr, 10fr);
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-enter-leave {
        transition: opacity 1s ease-out;
    }
    .loader {
        width: 100vw;
        height: 100vh;
    }
</style>
