<template>
    <section class="detailsReferrence">
        <h3
            class="detailsReferrence__header"
            tabindex="0">
            Szczegóły skierowania
        </h3>
        <form class="detailsReferrence__form detailsReferrence">
            <div class="inputBox">
                <h5 class="detailsReferrence__title">Lekarz:</h5>
                <p
                    :aria-label="'Imię i nazwisko lekarza: ' + names"
                    class="detailsReferrence__data"
                    tabindex="0">
                    {{ names }}
                </p>
            </div>

            <div class="inputBox">
                <h5 class="detailsReferrence__title">Specjalizacja:</h5>
                <p
                    :aria-label="'Specjalizacja lekarza: ' + specializations"
                    class="detailsReferrence__data"
                    tabindex="0">
                    {{ specializations }}
                </p>
            </div>

            <div class="inputBox">
                <h5 class="detailsReferrence__title">Typ badania:</h5>
                <p
                    :aria-label="'Typ badania: ' + typeOfTests"
                    class="detailsReferrence__data"
                    tabindex="0">
                    {{ typeOfTests }}
                </p>
            </div>

            <div class="inputBox">
                <h5 class="detailsReferrence__title">
                    Data wystawienia skierowania:
                </h5>
                <p
                    :aria-label="'Data wystawienia skierowania: ' + dates"
                    class="detailsReferrence__data"
                    tabindex="0">
                    {{ dates }}
                </p>
            </div>
        </form>
    </section>
</template>

<script setup>
    defineProps({
        names: {
            type: String,
            default: 'Lekarz',
        },
        dates: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: null,
        },
        specializations: {
            type: String,
            default: '',
        },
        typeOfTests: {
            type: String,
            default: '',
        },
        idDoc: {
            type: Number,
            default: 0,
        },
    });
</script>

<style lang="scss" scoped>
    .detailsReferrence {
        height: 100%;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
            height: 15%;
        }
        &__data {
            @include text-header6($font-weight-regular);
        }
        &__form {
            @include flex-position(column, nowrap, space-evenly, flex-start);
            height: 85%;
            .inputBox {
                @include flex-position(row, nowrap, space-between, center);
                width: 100%;
                h5 {
                    @include label;
                    color: $blue-900;
                }
            }
        }
    }
</style>
