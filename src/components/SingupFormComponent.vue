<template>
    <form
        action=""
        class="signUpForm">
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
