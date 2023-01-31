<template>
    <section class="visitDetails">
        <h3 class="visitDetails__header">Podsumowanie wydarzenia</h3>
        <article class="visitDetails__infoBox infoBox">
            <h5 class="infoBox__label">Tytuł:</h5>
            <p class="infoBox__description">{{ title }}</p>
        </article>

        <article class="visitDetails__infoBox infoBox">
            <h5 class="infoBox__label">Data:</h5>
            <p class="infoBox__description">{{ date }} {{ hour }}</p>
        </article>

        <article class="visitDetails__infoBox infoBox">
            <h5 class="infoBox__label">Miejsce:</h5>
            <p class="infoBox__description">{{ place }}</p>
        </article>

        <article class="visitDetails__infoBox infoBox">
            <h5 class="infoBox__label">Lekarz:</h5>
            <p class="infoBox__description">{{ doctor }}</p>
        </article>
    </section>
</template>

<script setup>
    defineProps({
        title: {
            type: String,
            default: 'Ala',
        },
        date: {
            type: String,
            default: '',
        },
        hour: {
            type: String,
            default: '',
        },
        place: {
            type: String,
            default: '',
        },
        doctor: {
            type: String,
            default: '',
        },
    });
</script>

<style lang="scss" scoped>
    .visitDetails {
        @include flex-position(column, nowrap, flex-start, flex-start);
        height: 100%;
        gap: 10%;

        &__header {
            @include text-header3($font-weight-semiBold);
            align-self: center;
            color: $blue-900;
        }

        &__infoBox {
            @include flex-position(row, wrap, space-between, center);
            width: 100%;

            .infoBox__label {
                @include text-header5($font-weight-medium);
                color: $blue-700;
            }
            .infoBox__description {
                font-size: $font-button;
            }
        }
    }
</style>
