<template>
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

<script setup>
    import { RouterView, useRouter } from 'vue-router';
    import { watchEffect } from 'vue';
    import getUser from './composables/getUser.js';
    import SidebarComponent from './components/SidebarComponent.vue';

    const { user } = getUser();
    const router = useRouter();
    watchEffect(user, () => {
        if (!user.value) router.push({ name: 'Login' });
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
</style>
