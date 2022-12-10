<template>
    <div class="wrapper">
        <section class="welcome">
            <section class="welcome-banner">
                <brand-header-component />
                <h3 class="welcome-banner__subtitle">
                    Elektroniczna kartoteka zawsze przy Tobie
                </h3>
            </section>
            <section class="welcome-description">
                <feature-description>
                    <template v-slot:icon>
                        <font-awesome-icon icon="fa-solid fa-database" />
                    </template>
                    <template v-slot:description>
                        <h6>
                            Dostęp do najpotrzebniejszych informacji kiedy tylko
                            potrzebujesz
                        </h6>
                        <p>
                            Architektura kartoteki oparta o przechowywanie
                            danych w spersonalizowanej chmurze.
                        </p>
                    </template>
                </feature-description>
            </section>
            <section class="welcome-description">
                <feature-description>
                    <template v-slot:icon>
                        <font-awesome-icon icon="fa-solid fa-file-medical" />
                    </template>
                    <template v-slot:description>
                        <h6>
                            Karta medyczna daje Ci dostęp do Twoich kuracji,
                            grupy krwi, uczuleń, a także certyfikatów i
                            informacji o krwiodawstwie
                        </h6>
                        <p>
                            iHealth to innowacyjny sposób śledzenia Twoich
                            procesów leczenia oraz informacji niezbędnych do
                            udzielenia Tobie pomocy przez ratowników podczas
                            wypadków.
                        </p>
                    </template>
                </feature-description>
            </section>
            <section class="welcome-description">
                <feature-description>
                    <template v-slot:icon>
                        <font-awesome-icon icon="fa-solid fa-file-waveform" />
                    </template>
                    <template v-slot:description>
                        <h6>Możliwość wgrywania badań, recept i skierowań</h6>
                        <p>
                            Z iHealth Twój lekarz zawsze będzie miał pełny obraz
                            Twojego stanu zdrowia.
                        </p>
                    </template>
                </feature-description>
            </section>
        </section>
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
            <singup-form-component />
        </section>
    </div>
</template>

<script setup>
    import SingupFormComponent from '../../components/SingupFormComponent.vue';
    import BrandHeaderComponent from '../../components/BrandHeaderComponent.vue';
    import FeatureDescription from '../../components/FeatureDescription.vue';
    import ButtonComponent from '../../components/ButtonComponent.vue';
</script>

<style scoped lang="scss">
    .wrapper {
        display: grid;
        grid-template-columns: 2fr 3fr;
        height: 100vh;
    }

    .welcome {
        color: $white;
        background-color: $blue-500;
        padding: 1rem 2rem 1rem 2rem;
        height: 100%;
        display: grid;
        border-radius: 0 $border-radius--normal $border-radius--normal 0;

        &-banner {
            @include flex-position(column, wrap, space-around, flex-start);
        }

        &-description {
            @include flex-position(column, wrap, space-around center);
            gap: 2rem;
        }
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
