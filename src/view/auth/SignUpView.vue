<template>
    <div class="wrapper">
        <welcome-info-component />
        <section class="account-creation">
            <div class="loginLink">
                <h5 class="loginLink__header">Masz już konto?</h5>
                <button-component
                    soft
                    small
                    to="Login">
                    Zaloguj się
                </button-component>
            </div>
            <h2 class="account-creation__header">Stwórz darmowe konto</h2>
            <div class="logWithSocials">
                <button-component
                    class="logWithSocials__google"
                    soft
                    wide>
                    Zaloguj się przez Google
                    <font-awesome-icon icon="fa-brands fa-google" />
                </button-component>
                <button-component
                    class="logWithSocials__facebook"
                    soft
                    wide>
                    Zaloguj się przez Facebook
                    <font-awesome-icon icon="fa-brands fa-facebook" />
                </button-component>
            </div>
            <span class="divider">lub</span>
            <singup-form-component @submitSignUp="handleSignUp" />
        </section>
    </div>
</template>

<script setup>
    import SingupFormComponent from '../../components/SingupFormComponent.vue';
    import WelcomeInfoComponent from '../../components/WelcomeInfoComponent.vue';
    import ButtonComponent from '../../components/ButtonComponent.vue';
    import router from '../../router/index.js';

    const handleSignUp = () => {
        router.push({ name: 'Welcome' });
    };
</script>

<style scoped lang="scss">
    .wrapper {
        @include wrapper;
    }

    .account-creation {
        height: 100vh;
        display: grid;
        grid-template-rows: repeat(2, 1fr) 2fr 1fr 4fr;

        &__header {
            @include text-header2($font-weight-semiBold);
            @include flex-position(row, wrap, center, center);
            color: $blue-700;
        }
    }
    .loginLink {
        @include flex-position(row, wrap, flex-end, center);
        gap: 1rem;
        margin-right: 1rem;
        &__header {
            @include text-header5($font-weight-semiBold);
            color: $blue-700;
        }
    }
    .logWithSocials {
        @include flex-position(column, nowrap, space-around, center);
    }
    .divider {
        display: inline-block;
        margin: auto;
        position: relative;
        @include text-header6;
        color: $gray-500;
        padding-inline: 1rem;

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 8rem;
            border: 0.125rem solid $gray-300;
            border-radius: $border-radius--rounded;
            top: 50%;
        }

        &::before {
            transform: translateX(-110%);
        }
        &::after {
            transform: translateX(10%);
        }
    }
</style>
