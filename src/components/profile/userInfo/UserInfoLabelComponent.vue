<template>
    <div class="userInfoLabel">
        <slot />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
    .userInfoLabel {
        @include flex-position(row, nowrap, space-between, center);
        width: 100%;
        min-height: 8vh;
        background-color: $white;
        padding: 1rem 1.2rem;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;

        &:deep(h6) {
            @include text-header6($font-weight-semiBold);
            color: $blue-900;
            text-align: left;
        }

        &:deep(p),
        &:deep(h6) {
            width: 35%;
        }
        &:deep(p) {
            @include text-paragraph($font-weight-medium);
            color: $blue-700;
            text-align: center;
        }
    }
</style>
