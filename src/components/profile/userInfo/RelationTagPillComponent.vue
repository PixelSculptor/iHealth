<template>
    <span
        :class="relType"
        class="relationPill"
        >{{ relationName }}</span
    >
</template>

<script setup>
    import { computed } from 'vue';
    import { relationshipData } from '../../../utils/relationship.js';

    const props = defineProps({
        relType: {
            type: String,
            default: 'others',
        },
    });

    const relationName = computed(() => {
        return relationshipData.find(({ relType }) => {
            return relType === props.relType;
        }).name;
    });
</script>

<style lang="scss" scoped>
    .relationPill {
        display: inline-block;
        width: 25%;
        padding: 0.5rem;
        margin-inline: 0.5rem;
        border-radius: $border-radius--rounded;
        text-align: center;
        font-weight: $font-weight-semiBold;
    }
    .mother {
        background-color: $color-blood-icon-background;
        color: $color-blood-icon-color;
    }

    .dad {
        background-color: $color-diabetes-icon-background;
        color: $color-diabetes-icon-color;
    }

    .couple {
        background-color: $color-allergies-icon-background;
        color: $color-allergies-icon-color;
    }

    .others {
        background-color: $color-other-icon-background;
        color: $color-other-icon-color;
    }
</style>
