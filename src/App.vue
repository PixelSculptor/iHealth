<template>
    <router-view />
</template>

<script setup>
    import { RouterView, useRouter } from 'vue-router';
    import { watch } from 'vue';
    import getUser from './composables/getUser.js';

    const { user } = getUser();
    const router = useRouter();
    watch(user, () => {
        if (!user.value) router.push({ name: 'Login' });
    });
</script>

<style scoped lang="scss"></style>
