<template>
    <section class="completeRegistration">
        <h3>Skompletuj swój profil</h3>
        <complete-registration-form />
    </section>
</template>

<script setup>
    import CompleteRegistrationForm from '../../components/auth/CompleteRegistrationFormComponent.vue';
</script>

<style scoped lang="scss">
    .completeRegistration {
        height: 100vh;
        @include flex-position(column, nowrap, space-evenly, center);
    }
</style>
