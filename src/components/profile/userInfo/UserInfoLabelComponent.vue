<template>
    <div class="userInfoLabel">
        <slot />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
    .userInfoLabel {
        width: 100%;
        min-height: 8vh;
        background-color: $white;
        padding: 1rem;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;
        @include flex-position(row, nowrap, space-between, center);

        &:deep(h6) {
            @include text-header6($font-weight-semiBold);
            @include flex-position(row, wrap, center, center);
            color: $blue-900;
            width: 40%;
        }
    }
</style>
