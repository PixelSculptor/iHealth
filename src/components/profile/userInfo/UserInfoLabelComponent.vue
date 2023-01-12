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
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;
        @include flex-position(row, nowrap, space-between, center);
    }
</style>
