<template>
    <li class="documentBox">
        <font-awesome-icon :icon="classOfIcon" />
        <h5 class="documentBox__title">{{ name }}</h5>
        <h5 class="documentBox__title">{{ specialization }}</h5>
        <button-component
            small
            id="documentPath"
            @click="seeMore">
            Pobierz receptę
        </button-component>
    </li>
</template>

<script setup>
    import { computed } from 'vue';
    import ButtonComponent from './ButtonComponent.vue';
    import { openNewCard } from '../utils/openNewCard.js';
    const props = defineProps({
        name: {
            type: String,
            default: 'Lekarz',
        },
        documentLink: {
            type: String,
            default: '',
        },
        documentPath: {
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
        specialization: {
            type: String,
            default: 'alergolog',
        },
    });
    const classOfIcon = computed(() => {
        return 'fa-solid ' + 'fa-pills';
    });
    const seeMore = () => {
        openNewCard(props.documentLink);
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
        gap: 1rem;
        &:deep(svg) {
            color: $blue-700;
            height: 3rem;
        }
        &__title {
            @include text-header5($font-weight-light);
            color: $gray-700;
        }
    }
</style>
