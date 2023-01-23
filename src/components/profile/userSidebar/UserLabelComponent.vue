<template>
    <div
        class="userDataElement"
        tabindex="0">
        <h6
            :aria-label="label"
            class="userDataElement__label">
            {{ label }}
        </h6>
        <p
            :aria-label="personValue"
            class="userDataElement__value">
            {{ personValue }}
        </p>
    </div>
</template>

<script setup>
    defineProps({
        label: {
            type: String,
            default: '',
        },
        personValue: {
            type: String,
            default: '',
        },
    });
</script>

<style lang="scss" scoped>
    .userDataElement {
        margin-inline: 1rem;
        @include flex-position(column, nowrap, space-between, flex-start);
        gap: 0.5rem;

        &__label {
            @include text-header6($font-weight-light);
            color: $gray-300;
        }

        &__value {
            @include text-header6($font-weight-medium);
            color: $white;
        }
    }
</style>
