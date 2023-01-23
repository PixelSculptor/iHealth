<template>
    <form
        action=""
        class="signUpForm"
        @submit.prevent="handleSignUp">
        <div class="signupForm__formBlock formBlock">
            <label
                class="formBlock__label"
                for="email"
                >Email</label
            >
            <input
                id="email"
                v-model="email"
                aria-label="email input"
                class="formBlock__input"
                placeholder="Adres E-mail"
                required
                type="email" />
        </div>

        <div class="signupForm__formBlock formBlock">
            <label
                class="formBlock__label"
                for="password"
                >Hasło</label
            >
            <input
                id="password"
                v-model="password"
                aria-label="password input"
                class="formBlock__input"
                minlength="8"
                placeholder="Hasło"
                required
                type="password" />
            <div
                v-show="password"
                class="errorInfo">
                <span
                    v-if="!passwordMatching && password && passwordCheck"
                    aria-label="passwords not match"
                    aria-live="polite"
                    class="passwordNotMatching"
                    role="presentation"
                    >Hasła nie zgadzają się</span
                >
                <span
                    v-else-if="passwordMatching"
                    aria-label="passwords match"
                    aria-live="polite"
                    class="passwordMatching"
                    role="presentation"
                    >Hasła zgadzają się</span
                >
            </div>
        </div>
        <div class="signupForm__formBlock formBlock">
            <label
                class="formBlock__label"
                for="passwordCheck"
                >Powtórz hasło</label
            >
            <input
                id="passwordCheck"
                v-model="passwordCheck"
                aria-label="password input matching"
                class="formBlock__input"
                minlength="8"
                placeholder="Hasło"
                required
                type="password" />
        </div>
        <error-info
            :aria-label="error"
            :message="error"
            aria-live="polite"
            class="error" />
        <button-component
            :disabled="disableCreateAccount"
            class="signupForm__submit"
            soft
            wide
            >Dołącz przez Email</button-component
        >
        <bouncing-balls-component
            :visible="isLoading"
            aria-label="loader"
            aria-live="polite" />
    </form>
</template>

<script setup>
    import ButtonComponent from '../ButtonComponent.vue';
    import ErrorInfo from '../ErrorInfo.vue';
    import BouncingBallsComponent from '../BouncingBallsComponent.vue';

    import useSignup from '../../composables/useSignup.js';
    import useUserStore from '../../stores/userStore.js';
    import { computed, ref } from 'vue';
    import getUser from '../../composables/getUser.js';

    const userStore = useUserStore();
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
        const { user } = getUser();
        userStore.setUserId(user.value.uid);
        isLoading.value = true;
        if (!error.value) {
            email.value = '';
            password.value = '';
            error.value = '';
            passwordCheck.value = '';
            emit('submitSignUp');
        }
        isLoading.value = false;
    };
</script>

<style lang="scss" scoped>
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
