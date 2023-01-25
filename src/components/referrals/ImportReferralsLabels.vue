<template>
    <li class="documentBox">
        <font-awesome-icon
            alt="add icon"
            aria-label="add icon"
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
    import { openNewCard } from '../../utils/openNewCard';
    import ButtonComponent from '../ButtonComponent.vue';

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
    });
    const classOfIcon = computed(() => {
        return 'fa-solid ' + 'fa-file';
    });
    const seeMore = () => {
        openNewCard(props.testUrl);
    };
</script>

<style lang="scss" scoped>
    .documentBox {
        @include flex-position(row, nowrap, space-around, center);
        width: 100%;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;
        padding: 1rem;
        background-color: $white;
        gap: 5rem;

        &__title {
            @include text-header5($font-weight-light);
            color: $gray-900;
        }

        &__data {
            @include text-paragraph($font-weight-light);
            color: $gray-900;
        }

        &:deep(svg) {
            color: $blue-700;
            height: 3rem;
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
            gap: 4rem;
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
</style>
