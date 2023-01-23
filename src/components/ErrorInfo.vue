<template>
    <p
        v-show="message"
        :aria-label="message"
        aria-live="polite"
        class="error"
        tabindex="0">
        {{ message }}
    </p>
</template>

<script setup>
    defineProps({
        message: {
            type: String,
            default: null,
        },
    });
</script>

<style lang="scss" scoped>
    .error {
        text-align: center;
        font-weight: $font-weight-semiBold;
        color: $color-error;
    }
</style>
