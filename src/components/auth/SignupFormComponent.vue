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
                    role="presentation"
                    aria-label="passwords not match"
                    class="passwordNotMatching"
                    >Hasła nie zgadzają się</span
                >
                <span
                    v-else-if="passwordMatching"
                    role="presentation"
                    aria-label="passwords match"
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
                aria-label="password input matching"
                minlength="8"
                class="formBlock__input"
                placeholder="Hasło"
                v-model="passwordCheck" />
        </div>
        <error-info
            class="error"
            :message="error" />
        <button-component
            soft
            wide
            :disabled="disableCreateAccount"
            class="signupForm__submit"
            >Dołącz przez Email</button-component
        >
        <bouncing-balls-component :visible="isLoading" />
    </form>
</template>

<script setup>
    import ButtonComponent from '../ButtonComponent.vue';
    import ErrorInfo from '../ErrorInfo.vue';

    import useSignup from '../../composables/useSignup.js';
    import { computed, ref } from 'vue';
    import BouncingBallsComponent from '../BouncingBallsComponent.vue';

    const emit = defineEmits(['submitSignUp']);
    const email = ref('');
    const password = ref('');
    const passwordCheck = ref('');
    const { error, signup, isLoading } = useSignup();
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
        isLoading.value = true;
        if (!error.value) {
            email.value = '';
            password.value = '';
            error.value = '';
            passwordCheck.value = '';
            emit('submitSignUp');
        }
    };
</script>

<style scoped lang="scss">
    .signUpForm {
        @include flex-position(column, wrap, flex-start, center);
        gap: 5%;
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
            margin: 0.5rem auto;
            width: $button-width-wide;
        }
    }
</style>
