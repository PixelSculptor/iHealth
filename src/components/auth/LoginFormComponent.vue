<template>
    <form
        action=""
        class="loginForm"
        @submit.prevent="handleLogin">
        <h2 class="loginForm__header">Zaloguj się do konta</h2>
        <button-component
            class="logWithSocials__google"
            soft
            wide
            @click="googleLogIn">
            Zaloguj się przez Google
            <font-awesome-icon icon="fa-brands fa-google" />
        </button-component>
        <button-component
            class="logWithSocials__facebook"
            soft
            wide
            @click="facebookLogIn">
            Zaloguj się przez Facebook
            <font-awesome-icon icon="fa-brands fa-facebook" />
        </button-component>
        <div class="formBlock">
            <label
                class="formBlock__label"
                for="email"
                >E-mail</label
            >
            <input
                id="email"
                v-model="email"
                class="formBlock__input"
                placeholder="abc@gmail.com"
                required
                type="email" />
        </div>
        <div class="formBlock">
            <label
                class="formBlock__label"
                for="password"
                >Hasło</label
            >
            <input
                id="password"
                v-model="password"
                class="formBlock__input"
                minlength="8"
                placeholder="Hasło"
                required
                type="password" />
        </div>
        <error-info
            :message="error"
            class="infoLabel" />
        <button-component
            :disabled="disableLogin"
            soft
            wide
            >Zaloguj się</button-component
        >
        <bouncing-balls-component :visible="isLoading" />
    </form>
</template>

<script setup>
    import ButtonComponent from '../ButtonComponent.vue';
    import ErrorInfo from '../ErrorInfo.vue';
    import useLogin from '../../composables/useLogin.js';
    import { computed, ref } from 'vue';
    import router from '../../router/index.js';
    import facebookLogInSite from '../../composables/logInFacebook.js';
    import googleLogInSite from '../../composables/logInGoogle.js';

    import BouncingBallsComponent from '../BouncingBallsComponent.vue';

    const { signIn, error, isLoading } = useLogin();
    const email = ref('');
    const password = ref('');

    const disableLogin = computed(() => {
        return !email.value || password.value.length < 8;
    });

    const facebookLogIn = () => {
        facebookLogInSite();
    };

    const googleLogIn = () => {
        googleLogInSite();
    };

    const handleLogin = async () => {
        await signIn(email.value, password.value);
        if (!error.value) {
            console.log('Logged in', email.value);
            await router.push({ name: 'Home' });
        }
        email.value = '';
        password.value = '';
    };
</script>

<style lang="scss" scoped>
    .loginForm {
        height: 90vh;
        margin: auto;
        @include flex-position(column, nowrap, center, center);
        gap: 5%;
        &__header {
            @include text-header2($font-weight-semiBold);
            color: $blue-700;
        }
        .formBlock {
            width: $button-width-wide;
            height: 10vh;
            @include flex-position(column, wrap, center, flex-start);
            gap: 0.35rem;
            &__input {
                @include input;
                &:active,
                &:focus-visible,
                &:focus {
                    @include input--active;
                }
            }
            &__label {
                @include label;
                color: $blue-700;
            }
        }
    }
    .infoLabel {
        width: $button-width-wide;
    }
</style>
