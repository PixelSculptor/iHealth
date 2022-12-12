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
                aria-label="email input"
                required
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
                aria-label="password input"
                minlength="8"
                class="formBlock__input"
                placeholder="Hasło"
                v-model="password" />
            <div
                v-show="password"
                class="errorInfo">
                <span
                    v-if="!passwordMatching && password && passwordCheck"
                    class="passwordNotMatching"
                    >Hasła nie zgadzają się</span
                >
                <span
                    v-else-if="passwordMatching"
                    class="passwordMatching"
                    >Hasła zgadzają się</span
                >
            </div>
        </div>
        <div class="signupForm__formBlock formBlock">
            <label
                for="passwordCheck"
                class="formBlock__label"
                >Powtórz hasło</label
            >
            <input
                id="passwordCheck"
                type="password"
                required
                aria-label="password input"
                minlength="8"
                class="formBlock__input"
                placeholder="Hasło"
                v-model="passwordCheck" />
        </div>
        <div
            v-show="error"
            class="error">
            {{ error }}
        </div>
        <button-component
            soft
            wide
            :disabled="disableCreateAccount"
            class="signupForm__submit"
            >Dołącz przez Email</button-component
        >
    </form>
</template>

<script setup>
    import ButtonComponent from './ButtonComponent.vue';
    import useSignup from '../composables/useSignup.js';
    import { computed, ref } from 'vue';

    const emit = defineEmits(['submitSignUp']);

    const email = ref('');
    const password = ref('');
    const passwordCheck = ref('');
    const { error, signup } = useSignup();
    const passwordMatching = computed(() => {
        return password.value === passwordCheck.value;
    });
    const disableCreateAccount = computed(() => {
        return (
            !email.value ||
            password.value.length < 8 ||
            !passwordCheck.value.length
        );
    });

    const handleSignUp = async () => {
        await signup(email.value, password.value);
        if (!error.value) {
            email.value = '';
            password.value = '';
            error.value = '';
            emit('submitSignUp');
        }
    };
</script>

<style scoped lang="scss">
    .signUpForm {
        @include flex-position(column, wrap, flex-start, center);
        gap: 0.5rem;
        .formBlock {
            width: $button-width-wide;
            height: 6rem;
            @include flex-position(column, wrap, space-around, flex-start);
            gap: 0.1rem;
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
            .errorInfo {
                margin-left: auto;
            }
            .passwordNotMatching {
                color: $color-error;
            }
            .passwordMatching {
                color: $color-success;
            }
        }
        .error {
            margin: 0.5rem 0;
            width: $button-width-wide;
            display: inline-block;
            color: $color-error;
            text-align: center;
            font-weight: $font-weight-semiBold;
        }
    }
</style>
