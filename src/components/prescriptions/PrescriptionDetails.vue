<template>
    <div
        v-bind:key="props.id"
        class="detailsPres">
        <h3 class="detailsPres__header">Szczegóły recepty</h3>
        <form class="detailsPres__form">
            <div class="inputBox">
                <h5 class="detailsPres__title">
                    <label> Imię i nazwisko lekarza: </label>
                </h5>
                <p class="detailsPres__data">{{ names }}</p>
            </div>

            <div class="inputBox">
                <h5 class="detailsPres__title">
                    <label> Nazwa leku: </label>
                </h5>
                <p class="detailsPres__data">{{ medicines }}</p>
            </div>

            <div class="inputBox">
                <h5 class="detailsPres__title">
                    <label> Częstotliwość leku: </label>
                </h5>
                <p class="detailsPres__data">{{ frequencys }}</p>
            </div>

            <div class="inputBox">
                <h5 class="detailsPres__title">
                    <label>Data wystawienia leku:</label>
                </h5>
                <h6 class="detailsPres__data">{{ dates }}</h6>
            </div>
        </form>
    </div>
</template>

<script setup>
    const props = defineProps({
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
                @include flex-position(row, nowrap, flex-start, center);
                gap: 1rem;

                label {
                    @include label;
                    color: $blue-900;
                }

                h5 {
                    @include text-header6($font-weight-regular);
                }
            }
            data {
                @include text-header6($font-weight-regular);
            }
        }
    }
</style>
