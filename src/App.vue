<template>
    <div class="app">
        <sidebar-component v-if="user" />
        <router-view />
    </div>
</template>

<script setup>
    import { RouterView, useRouter } from 'vue-router';
    import { watch } from 'vue';
    import getUser from './composables/getUser.js';
    import SidebarComponent from './components/SidebarComponent.vue';

    const { user } = getUser();
    const router = useRouter();
    watch(user, () => {
        if (!user.value) router.push({ name: 'Login' });
    });
</script>

<style scoped lang="scss">
    .app {
        @include wrapper(1fr, 10fr);
    }
</style>
