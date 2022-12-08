<template>
    <div class="welcome container">
        <h1>Hello friend!</h1>
        <SignupForm />
    </div>
</template>

<script>
    import SignupForm from '../components/SignupForm.vue';
    export default {
        name: 'WelcomeView',
        components: { SignupForm },
    };
</script>

<style scoped lang="scss"></style>
