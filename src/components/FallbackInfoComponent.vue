<template>
    <div class="alert">
        <h5>{{ information }}</h5>
    </div>
</template>

<script setup>
    defineProps({
        information: {
            type: String,
            default: '',
        },
    });
</script>

<style lang="scss" scoped>
    .alert {
        h5 {
            @include text-header5($font-weight-medium);
            color: $blue-500;
        }
    }
</style>
