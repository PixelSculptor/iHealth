<template>
    <div class="app">
        <sidebar-component v-if="user?.uid" />
        <router-view v-slot="{ Component }">
            <transition
                mode="out-in"
                name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
    import SidebarComponent from './components/SidebarComponent.vue';

    import { RouterView, useRouter } from 'vue-router';
    import { watch } from 'vue';
    import useLogout from './composables/useLogout.js';
    import getUser from './composables/getUser.js';

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

<style lang="scss" scoped>
    .app {
        @include wrapper(1fr, 10fr);
        background-color: $white;
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
