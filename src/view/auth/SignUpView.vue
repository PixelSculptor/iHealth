<template>
    <div class="wrapper">
        <section class="welcome">
            <section class="welcome-banner">
                <brand-header-component />
            </section>
        </section>
        <singup-form-component />
    </div>
</template>

<script setup>
    import SingupFormComponent from '../../components/SingupFormComponent.vue';
    import BrandHeaderComponent from '../../components/BrandHeaderComponent.vue';
</script>

<style scoped></style>
