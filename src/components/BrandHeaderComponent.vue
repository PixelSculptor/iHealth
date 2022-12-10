<template>
    <div class="welcome-banner__brand brand">
        <font-awesome-icon
            class="brand__icon"
            icon="fa-solid fa-heart-pulse" />
        <h1 class="brand__name">iHealth</h1>
    </div>
</template>

<script></script>

<style scoped lang="scss">
    .brand {
        @include flex-position(row, wrap, flex-start, center);
        svg,
        &__name {
            color: $white;
            @include text-header1($font-weight-bold);
        }
        &__name {
            margin-left: 1rem;
        }
    }
</style>
