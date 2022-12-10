<template>
    <div class="wrapper">
        <welcome-info-component />
        <login-form-component />
    </div>
</template>

<script setup>
    import LoginFormComponent from '../../components/LoginFormComponent.vue';
    import WelcomeInfoComponent from '../../components/WelcomeInfoComponent.vue';
</script>

<style scoped lang="scss">
    .wrapper {
        @include wrapper;
        grid-template-columns: 3fr 4fr;
    }
</style>
