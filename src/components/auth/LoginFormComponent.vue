<template>
    <form
        class="loginForm"
        action=""
        @submit.prevent="handleLogin">
        <h2 class="loginForm__header">Zaloguj się do konta</h2>
        <div class="formBlock">
            <label
                class="formBlock__label"
                for="email"
                >E-mail</label
            >
            <input
                class="formBlock__input"
                id="email"
                type="email"
                required
                placeholder="abc@gmail.com"
                v-model="email" />
        </div>
        <div class="formBlock">
            <label
                class="formBlock__label"
                for="password"
                >Hasło</label
            >
            <input
                class="formBlock__input"
                id="password"
                type="password"
                minlength="8"
                required
                placeholder="Hasło"
                v-model="password" />
        </div>
        <error-info
            class="infoLabel"
            :message="error" />
        <button-component
            soft
            wide
            :disabled="disableLogin"
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
    import { useRouter } from 'vue-router';
    import BouncingBallsComponent from '../BouncingBallsComponent.vue';

    const { signIn, error } = useLogin();
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const isLoading = ref(false);

    const disableLogin = computed(() => {
        return !email.value || password.value.length < 8;
    });

    const handleLogin = async () => {
        await signIn(email.value, password.value);
        isLoading.value = true;
        if (!error.value) {
            console.log('Logged in', isLoading.value);
            await router.push({ name: 'Home' });
        }
        email.value = '';
        password.value = '';
    };
</script>

<style scoped lang="scss">
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
