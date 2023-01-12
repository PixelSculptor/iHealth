<template>
    <section class="today">
        <h4 class="today__date">{{ currentDate }}</h4>
    </section>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { getDate } from '../utils/dateOption.js';

    const currentDate = ref(null);

    onMounted(() => {
        currentDate.value = getDate();
    });
</script>

<style lang="scss" scoped>
    .today {
        &__date {
            @include text-header4($font-weight-regular);
            color: $gray-700;
        }
    }
</style>
