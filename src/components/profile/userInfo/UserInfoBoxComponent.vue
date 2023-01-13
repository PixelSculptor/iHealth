<template>
    <article class="userBox">
        <h5 class="userBox__header">{{ header }}</h5>
        <slot />
    </article>
</template>

<script setup>
    defineProps({
        header: {
            type: String,
            default: 'Twoje informacje',
        },
    });
    // TODO: think about add button to boxes to open modal and edit or add new contact
    // TODO: to investigate height of userBox container
</script>

<style lang="scss" scoped>
    .userBox {
        @include flex-position(column, nowrap, space-evenly, center);
        height: 50vh;
        width: 100%;
        background-color: $gray-100;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--rounded;
        padding: 2rem;
        margin: auto;
        gap: 1rem;
        &__header {
            @include text-header5($font-weight-bold);
            width: 100%;
            color: $blue-700;
            text-align: left;
        }
        &:deep(ul) {
            @include flex-position(column, nowrap, space-evenly, center);
            height: 90%;
            width: 100%;
            overflow-y: scroll;
        }
    }
</style>
