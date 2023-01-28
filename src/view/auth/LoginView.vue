<template>
    <div class="wrapper">
        <welcome-info-component />
        <div class="loginPanel">
            <div class="loginLink">
                <h5 class="loginLink__header">Nie masz jeszcze konta?</h5>
                <button-component
                    small
                    soft
                    to="Signup">
                    Zarejestruj się
                </button-component>
            </div>
            <login-form-component />
        </div>
    </div>
</template>

<script setup>
    import LoginFormComponent from '../../components/auth/LoginFormComponent.vue';
    import WelcomeInfoComponent from '../../components/WelcomeInfoComponent.vue';
    import ButtonComponent from '../../components/ButtonComponent.vue';
</script>

<style lang="scss" scoped>
    .wrapper {
        @include wrapper;
        width: 100vw;
        grid-template-columns: 3fr 4fr;
        .loginPanel {
            height: 100vh;
            display: grid;
            grid-template-rows: 1fr 3fr;
            .loginLink {
                @include flex-position(row, wrap, flex-end, center);
                gap: 1rem;
                margin-right: 1rem;

                &__header {
                    @include text-header5($font-weight-semiBold);
                    color: $blue-700;
                }
            }
        }
    }

    //    media queries

    @media screen and (max-width: $tablet-width) {
        .wrapper {
            .loginPanel {
                place-self: center;
                padding: 1rem;

                .loginLink {
                    gap: 0.5rem;
                    margin: 0;
                    padding: 0.5rem;
                    place-self: center;

                    &__header {
                        font-size: $font-heading5--tablets;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
