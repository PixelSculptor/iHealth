<template>
    <div
        v-show="message"
        class="error">
        {{ message }}
    </div>
</template>

<script setup>
    defineProps({
        message: {
            type: String,
            default: null,
        },
    });
</script>

<style scoped lang="scss">
    .error {
        text-align: center;
        font-weight: $font-weight-semiBold;
        color: $color-error;
    }
</style>
