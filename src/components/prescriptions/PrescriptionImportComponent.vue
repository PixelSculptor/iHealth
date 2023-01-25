<template>
    <li class="documentBox">
        <font-awesome-icon
            alt="add result icon"
            aria-label="add result icon"
            :icon="classOfIcon" />
        <h5 class="documentBox__title">{{ name }}</h5>
        <p
            :aria-label="'Zaimportowano dnia: ' + date"
            class="documentBox__data"
            tabindex="0">
            {{ date }}
        </p>
        <button-component
            small
            id="testUrl"
            @click="seeMore">
            Pobierz receptę
        </button-component>
    </li>
</template>

<script setup>
    import { computed } from 'vue';
    import ButtonComponent from '../ButtonComponent.vue';
    import { openNewCard } from '../../utils/openNewCard';

    const props = defineProps({
        name: {
            type: String,
            default: 'Lekarz',
        },
        date: {
            type: String,
            default: '',
        },
        testUrl: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: null,
        },
        typeOfDoc: {
            type: String,
            default: 'prescriptionView',
        },
        frequency: {
            type: String,
            default: '',
        },
        medicine: {
            type: String,
            default: '',
        },
    });
    const classOfIcon = computed(() => {
        return 'fa-solid ' + 'fa-pills';
    });
    const seeMore = () => {
        openNewCard(props.testUrl);
    };
</script>

<style lang="scss" scoped>
    .documentBox {
        width: 100%;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;
        padding: 1rem;
        background-color: $white;
        @include flex-position(row, nowrap, space-around, center);
        gap: 5rem;
        &:deep(svg) {
            color: $blue-700;
            height: 3rem;
        }
        &__title {
            @include text-header5($font-weight-light);
            color: $gray-900;
        }
        &__data {
            @include text-header6($font-weight-regular);
        }
    }

    @media (max-width: $tablet-width) {
        .documentBox {
            @include flex-position(row, nowrap, space-between, center);
            width: 100%;
            border: $border-size solid $gray-300;
            border-radius: $border-radius--normal;
            padding: 0.5rem;
            background-color: $white;
            gap: 4.75rem;
            &:deep(svg) {
                color: $blue-700;
                height: 2rem;
            }
            &__title {
                @include text-header6--tablets($font-weight-medium);
                color: $gray-900;
                text-align: center;
            }
            &__data {
                @include text-header6--tablets($font-weight-medium);
                color: $gray-900;
                text-align: center;
            }
        }
    }

    @media (max-width: $laptop-width) {
        .documentBox {
            @include flex-position(row, nowrap, space-between, center);
            width: 100%;
            border: $border-size solid $gray-300;
            border-radius: $border-radius--normal;
            padding: 1rem;
            background-color: $white;
            gap: 4.18rem;
            &:deep(svg) {
                color: $blue-700;
                height: 2.5rem;
            }
            &__title {
                @include text-header6--laptop($font-weight-medium);
                color: $gray-900;
                text-align: center;
            }
            &__data {
                @include text-header5--laptops($font-weight-medium);
                text-align: center;
            }
        }
    }

    @media (max-width: $pc-width) {
        .documentBox {
            @include flex-position(row, nowrap, space-between, center);
            width: 100%;
            border: $border-size solid $gray-300;
            border-radius: $border-radius--normal;
            padding: 1rem;
            background-color: $white;
            gap: 4.18rem;
            &:deep(svg) {
                color: $blue-700;
                height: 2.75rem;
            }
            &__title {
                @include text-header5--pc($font-weight-medium);
                color: $gray-900;
                text-align: center;
            }
            &__data {
                @include text-header6--pc($font-weight-medium);
                text-align: center;
            }
        }
    }
</style>
