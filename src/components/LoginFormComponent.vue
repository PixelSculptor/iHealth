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
        <span class="infoLabel error"></span>
        <button-component
            soft
            wide
            >Zaloguj się</button-component
        >
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import ButtonComponent from './ButtonComponent.vue';
    const email = ref('');
    const password = ref('');
    const handleLogin = () => {
        console.log('Logged in');
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
        @include text-paragraph;
        display: inline-block;
        width: $button-width-wide;
        text-align: right;
    }
    .error {
        color: $color-error;
    }
    .sucess {
        color: $color-success;
    }
</style>
