<template>
    <article class="userBox">
        <h5 class="userBox__header">{{ header }}</h5>
        <ul class="userBox__dataList"></ul>
    </article>
</template>

<script setup>
    defineProps({
        header: {
            type: String,
            default: 'Twoje informacje',
        },
    });

    // TODO: to investigate height of userBox container
</script>

<style lang="scss" scoped>
    .userBox {
        height: 30vh;
        width: 100%;
        background-color: $gray-100;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;
        padding: 2rem;
        margin: auto;
        @include flex-position(column, nowrap, space-evenly, center);
        gap: 1rem;
        &__header {
            @include text-header5($font-weight-bold);
            color: $blue-700;
            text-align: center;
        }
        &__dataList {
            height: 90%;
            width: 100%;
            overflow-y: scroll;
            @include flex-position(column, nowrap, space-evenly, center);
        }
    }
</style>
