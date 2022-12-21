<template>
    <section class="completeRegistration">
        <h2>Skompletuj swój profil</h2>
        <complete-registration-form @completeProfile="handleComplete" />
    </section>
</template>

<script setup>
    import CompleteRegistrationForm from '../../components/auth/CompleteRegistrationFormComponent.vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const handleComplete = () => {
        router.push({ name: 'Home' });
    };
</script>

<style scoped lang="scss">
    .completeRegistration {
        height: 100vh;
        background-color: $white;
        h2 {
            @include text-header2($font-weight-semiBold);
            color: $blue-700;
        }
        @include flex-position(column, nowrap, space-evenly, center);
    }
</style>
