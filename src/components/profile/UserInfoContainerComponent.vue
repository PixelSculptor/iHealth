<template>
    <section class="userInfoContainer">
        <user-info-box-component />
    </section>
</template>

<script setup>
    import UserInfoBoxComponent from './UserInfoBoxComponent.vue';
</script>

<style lang="scss" scoped>
    .userInfoContainer {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5%;
        padding: 1rem 0 1rem 0;
    }
</style>
