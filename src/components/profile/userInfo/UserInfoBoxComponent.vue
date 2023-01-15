<template>
    <article class="userBox">
        <div class="userBox__header">
            <h5>{{ header }}</h5>
            <slot name="importIssues" />
        </div>
        <slot name="userIssueList" />
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
</script>

<style lang="scss" scoped>
    .userBox {
        @include flex-position(column, nowrap, space-between, center);
        height: 100%;
        width: 100%;
        background-color: $gray-100;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--rounded;
        padding: 2rem;
        margin: auto;
        gap: 1rem;
        &__header {
            @include flex-position(row, nowrap, space-between, center);
            width: 100%;
            color: $blue-700;
            text-align: left;
            h5 {
                @include text-header5($font-weight-bold);
            }
        }
        &:deep(ul) {
            @include flex-position(column, nowrap, flex-start, center);
            min-height: 50vh;
            width: 100%;
            overflow-y: scroll;
            gap: 1rem;
        }
    }
</style>
