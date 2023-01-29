<template>
    <section class="welcome">
        <section class="welcome-banner">
            <brand-header-component />
            <h3
                class="welcome-banner__subtitle"
                tabindex="0">
                Elektroniczna kartoteka zawsze przy Tobie
            </h3>
        </section>
        <section class="welcome-description">
            <feature-description>
                <template v-slot:icon>
                    <font-awesome-icon
                        alt="database icon"
                        aria-label="database icon"
                        icon="fa-solid fa-database" />
                </template>
                <template v-slot:description>
                    <h6 tabindex="0">
                        Dostęp do najpotrzebniejszych informacji kiedy tylko
                        potrzebujesz
                    </h6>
                    <p tabindex="0">
                        Architektura kartoteki oparta o przechowywanie danych w
                        spersonalizowanej chmurze.
                    </p>
                </template>
            </feature-description>
        </section>
        <section class="welcome-description">
            <feature-description>
                <template v-slot:icon>
                    <font-awesome-icon
                        alt="medical icon"
                        aria-label="mediacl icon"
                        icon="fa-solid fa-file-medical" />
                </template>
                <template v-slot:description>
                    <h6 tabindex="0">
                        Karta medyczna daje Ci dostęp do Twoich kuracji, grupy
                        krwi, uczuleń, a także certyfikatów i informacji o
                        krwiodawstwie
                    </h6>
                    <p tabindex="0">
                        iHealth to innowacyjny sposób śledzenia Twoich procesów
                        leczenia oraz informacji niezbędnych do udzielenia Tobie
                        pomocy przez ratowników podczas wypadków.
                    </p>
                </template>
            </feature-description>
        </section>
        <section class="welcome-description">
            <feature-description>
                <template v-slot:icon>
                    <font-awesome-icon
                        alt="waveform icon"
                        aria-label="waveform icon"
                        icon="fa-solid fa-file-waveform" />
                </template>
                <template v-slot:description>
                    <h6 tabindex="0">
                        Możliwość wgrywania badań, recept i skierowań
                    </h6>
                    <p tabindex="0">
                        Z iHealth Twój lekarz zawsze będzie miał pełny obraz
                        Twojego stanu zdrowia.
                    </p>
                </template>
            </feature-description>
        </section>
    </section>
</template>

<script setup>
    import BrandHeaderComponent from './BrandHeaderComponent.vue';
    import FeatureDescription from './FeatureDescription.vue';
</script>

<style lang="scss" scoped>
    .welcome {
        color: $white;
        background-color: $blue-500;
        padding: 1rem 2rem 1rem 2rem;
        height: 100%;
        display: grid;
        border-radius: 0 $border-radius--normal $border-radius--normal 0;

        &-banner,
        &-description {
            padding-inline: 1.5rem;
        }
        &-banner {
            @include flex-position(column, wrap, space-evenly, flex-start);
        }

        &-description {
            @include flex-position(column, wrap, space-around, flex-start);
        }
    }

    //media queries

    @media screen and (max-width: $tablet-width) {
        .welcome {
            padding: 0.5rem;
        }
    }
</style>
