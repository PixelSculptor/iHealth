<template>
    <router-link
        v-if="to && !disabled && !href"
        :to="{ name: to, params: params, hash }"
        :class="itemClasses">
        <slot />
    </router-link>
    <a
        v-else-if="href && !disabled"
        :href="href"
        :class="itemClasses">
        <slot />
    </a>

    <button
        v-else
        :aria-disabled="disabled"
        :class="itemClasses">
        <span class="child">
            <slot />
        </span>
    </button>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        main: {
            type: Boolean,
            default: true,
        },
        soft: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
        wide: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        to: {
            type: String,
            default: null,
        },
        hash: {
            type: String,
            default: null,
        },
        params: {
            type: Object,
            default: null,
        },
        href: {
            type: String,
            default: null,
        },
    });

    const itemClasses = computed(() => {
        let classes = props.soft ? 'soft' : 'main';
        classes += props.wide ? ' wide ' : '';
        classes += props.small ? ' small ' : '';
        return classes;
    });
</script>

<style scoped lang="scss">
    button,
    a,
    router-link {
        @include button-basic;
        :deep(.child) {
            letter-spacing: $letter-spacing-button;
        }
        @include button--regular;
    }
    .small {
        @include button--small;
    }
    .wide {
        @include button--wide;
        :deep(.child) {
            letter-spacing: $letter-spacing-button--wide;
        }
    }
    .main {
        @include button-main;

        &:hover {
            @include button-main--hover;
        }

        &:active {
            @include button-main--active;
        }
        &:focus,
        &:focus-visible {
            @include focus;
        }
        &[aria-disabled='true'],
        &:disabled {
            @include button-main--disabled;
            cursor: not-allowed;
        }
    }

    .soft {
        @include button-soft;

        &:hover {
            @include button-soft--hover;
        }

        &:active {
            @include button-soft--active;
        }
        &:focus,
        &:focus-visible {
            @include focus;
        }
        &[aria-disabled='true'],
        &:disabled {
            @include button-soft--disabled;
            cursor: not-allowed;
        }
    }
</style>
