<template>
    <li class="documentBox">
        <font-awesome-icon :icon="classOfIcon" />
    </li>
</template>

<script setup>
    import { computed } from 'vue';

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
            default: '',
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
</script>

<style scoped>
  * {
    margin: 0;
  }
</style>
