<template>
    <form
        action=""
        class="signUpForm"
        @submit.prevent="handleSignUp">
        <div class="signupForm__formBlock formBlock">
            <label
                for="email"
                class="formBlock__label"
                >Email</label
            >
            <input
                id="email"
                type="email"
                class="formBlock__input"
                placeholder="Adres E-mail"
                v-model="email" />
        </div>

        <div class="signupForm__formBlock formBlock">
            <label
                for="password"
                class="formBlock__label"
                >Hasło</label
            >
            <input
                id="password"
                type="password"
                required
                class="formBlock__input"
                placeholder="Hasło"
                v-model="password" />
        </div>
        <div
            v-show="error"
            class="error">
            {{ error }}
        </div>
        <button-component
            soft
            wide
            class="signupForm__submit"
            >Dołącz przez Email</button-component
        >
    </form>
</template>

<script setup>
    import ButtonComponent from './ButtonComponent.vue';
    import useSignup from '../composables/useSignup.js';
    import { ref } from 'vue';

    const emit = defineEmits(['submitSignUp']);

    const email = ref('');
    const password = ref('');
    const { error, signup } = useSignup();

    const handleSignUp = async () => {
        if (!email.value || !password.value || error.value) {
            email.value = '';
            password.value = '';
            error.value = '';
        }
        await signup(email.value, password.value);
        if (!error.value) {
            emit('submitSignUp');
        }
    };
</script>

<style scoped lang="scss">
    .signUpForm {
        @include flex-position(column, wrap, flex-start, center);
        gap: 15%;
        .formBlock {
            width: $button-width-wide;
            height: 6rem;
            @include flex-position(column, wrap, space-around, flex-start);
            gap: 0.25rem;
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
</style>
