<template>
    <div class="welcome-banner__brand brand">
        <font-awesome-icon
            alt="iHealth logo"
            aria-label="iHealth logo"
            class="brand__icon"
            icon="fa-solid fa-heart-pulse"
            tabindex="0" />
        <h1
            v-show="hideBrand"
            class="brand__name"
            tabindex="0">
            iHealth
        </h1>
    </div>
</template>

<script setup>
    defineProps({
        hideBrand: {
            type: Boolean,
            default: true,
        },
    });
</script>

<style lang="scss" scoped>
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
