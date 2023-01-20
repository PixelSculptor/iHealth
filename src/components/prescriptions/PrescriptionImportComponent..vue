<template>
    <li class="documentBox">
        <font-awesome-icon :icon="classOfIcon" />
        <h5 class="documentBox__title">{{ name }}</h5>
        <p class="documentBox__data">{{ name }}</p>
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
            color: $gray-700;
        }
        &__data {
            @include text-header6($font-weight-regular);
        }
    }
</style>
