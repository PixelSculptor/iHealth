<template>
    <section class="metricValue">
        <slot />
    </section>
</template>

<style lang="scss" scoped>
    .metricValue {
        border: $border-size solid $gray-100;
        border-radius: $border-radius--normal;
        width: 100%;
        padding: 0.5rem;
        @include flex-position(column, nowrap, space-around, center);
        &:deep(input[type='number']) {
            border: none;
            @include text-header6($font-weight-medium);
            text-align: right;
        }
        &:deep(input#height) {
            transform: translateX(10%);
        }
        &:deep(label) {
            text-align: center;
            color: $gray-900;
            @include text-paragraph($font-weight-light);
        }
    }
</style>
