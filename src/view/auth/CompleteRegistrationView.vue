<template>
    <section class="completeRegistration">
        <h2>Skompletuj swój profil</h2>
        <complete-registration-form />
    </section>
</template>

<script setup>
    import CompleteRegistrationForm from '../../components/auth/CompleteRegistrationFormComponent.vue';
</script>

<style scoped lang="scss">
    .completeRegistration {
        height: 100vh;
        h2 {
            @include text-header2($font-weight-semiBold);
            color: $blue-700;
        }
        @include flex-position(column, nowrap, space-evenly, center);
    }
</style>
