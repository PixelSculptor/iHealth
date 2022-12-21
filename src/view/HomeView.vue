<template>
    <div class="wrapper">
        <sidebar-component />
        <h1>Home view</h1>
        <router-view />
    </div>
</template>

<script setup>
    import SidebarComponent from '../components/SidebarComponent.vue';
</script>

<style scoped lang="scss">
    .wrapper {
        @include wrapper(1fr, 10fr);
    }
</style>
