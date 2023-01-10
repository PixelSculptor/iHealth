<template>
    <li class="documentBox">
        <font-awesome-icon :icon="classOfIcon" />
        <h5 class="documentBox__title">{{ name }}</h5>
        <button-component
            small
            id="documentPath"
            @click="handleChange">
            Pobierz
        </button-component>
    </li>
</template>

<script setup>
    import { computed } from 'vue';
    import ButtonComponent from './ButtonComponent.vue';
    import getCollections from '../composables/getCollections.js';
    const { error } = getCollections('certifications');

    const props = defineProps({
        name: {
            type: String,
            default: '',
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
    });

    const classOfIcon = computed(() => {
        return (
            'fa-solid ' +
            (props.typeOfDoc === 'vacc' ? 'fa-virus-covid' : 'fa-notes-medical')
        );
    });

    const handleChange = async () => {
        await window.open(props.documentLink, '_blank').focus();
        if (error.value) {
            throw new Error();
        }
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
            color: $gray-700;
        }
    }
</style>
