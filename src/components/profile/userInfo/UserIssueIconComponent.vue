<template>
    <div :class="'icon ' + iconBackground">
        <font-awesome-icon :icon="iconName" />
    </div>
</template>

<script setup>
    defineProps({
        iconName: {
            type: String,
            default: 'fa-solid fa-stethoscope',
        },
        iconBackground: {
            type: String,
            default: 'others',
        },
    });
</script>

<style lang="scss" scoped>
    .icon {
        @include flex-position(row, nowrap, center, center);
        width: 3rem;
        height: 3rem;
        border: none;
        border-radius: 50%;
        padding: 1.8rem;
        &:deep(svg) {
            width: 2rem;
            height: 2rem;
        }
    }

    .others {
        background-color: rgba(208, 161, 240, 0.94);
        &:deep(svg) {
            color: rgba(148, 4, 244, 0.94);
        }
    }

    .blood {
        background-color: $color-blood-icon-background;
        &:deep(svg) {
            color: $color-blood-icon-color;
        }
    }

    .allergies {
        background-color: $color-allergies-icon-background;
        &:deep(svg) {
            color: $color-allergies-icon-color;
        }
    }

    .diabetes {
        background-color: $color-diabetes-icon-background;
        &:deep(svg) {
            color: $color-diabetes-icon-color;
        }
    }
</style>
