<template>
    <li class="documentBox">
        <font-awesome-icon :icon="classOfIcon" />
        <h5
            class="documentBox__title"
            tabindex="0">
            {{ name }}
        </h5>
        <button-component
            id="documentPath"
            aria-label="Pobierz certyfikat / test"
            small
            @click="seeMore">
            Pobierz
        </button-component>
    </li>
</template>

<script setup>
    import { computed } from 'vue';
    import ButtonComponent from '../../ButtonComponent.vue';
    import { openNewCard } from '../../../utils/openNewCard.js';

    const props = defineProps({
        name: {
            type: String,
            default: '',
        },
        documentLink: {
            type: String,
            default: '',
        },
        typeOfDoc: {
            type: String,
            default: 'medicForm',
        },
        id: {
            type: Number,
            default: null,
        },
    });
    const classOfIcon = computed(() => {
        return (
            'fa-solid ' +
            (props.typeOfDoc === 'vacc' ? 'fa-virus-covid' : 'fa-notes-medical')
        );
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
            height: 2rem;
        }
        &__title {
            @include text-header5($font-weight-light);
            color: $gray-900;
        }
    }
</style>
