<template>
    <div class="detailsPres">
        <h3 class="detailsPres__header">Szczegóły recepty</h3>
        <form class="detailsPres__form detailsForm">
            <div class="inputBox">
                <h5 class="detailsPres__title">Lekarz:</h5>
                <p class="detailsPres__data">{{ names }}</p>
            </div>

            <div class="inputBox">
                <h5 class="detailsPres__title">Nazwa leku:</h5>
                <p class="detailsPres__data">{{ medicines }}</p>
            </div>

            <div class="inputBox">
                <h5 class="detailsPres__title">Częstotliwość przyjmowania:</h5>
                <p class="detailsPres__data">{{ frequencys }}</p>
            </div>

            <div class="inputBox">
                <h5 class="detailsPres__title">Data wystawienia recepty:</h5>
                <p class="detailsPres__data">{{ dates }}</p>
            </div>
        </form>
    </div>
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
        frequencys: {
            type: String,
            default: '',
        },
        medicines: {
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
    .detailsPres {
        height: 100%;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
            height: 15%;
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
            data {
                @include text-paragraph($font-weight-light);
            }
        }
    }
</style>
