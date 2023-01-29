<template>
    <router-link
        v-if="to && !disabled && !href"
        :class="itemClasses"
        :to="{ name: to, params: params, hash }"
        aria-label="navigation link"
        role="link">
        <slot />
    </router-link>
    <a
        v-else-if="href && !disabled"
        :class="itemClasses"
        :href="href"
        aria-label="link"
        role="link">
        <slot />
    </a>

    <button
        v-else
        :aria-disabled="disabled"
        :class="itemClasses"
        aria-live="polite"
        role="button">
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
        minor: {
            type: Boolean,
            default: false,
        },
        menu: {
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
        let classes = props.soft ? 'soft' : props.menu ? 'menuLink' : 'main';
        classes += props.wide ? ' wide ' : '';
        classes += props.small ? ' small ' : '';
        classes += props.minor ? ' minor ' : '';
        return classes;
    });
</script>

<style lang="scss" scoped>
    button,
    a,
    router-link {
        @include button-basic;
        :deep(.child) {
            letter-spacing: $letter-spacing-button;
            font-size: $font-heading6;
            @include flex-position(row, nowrap, center, center);
            gap: 0.5rem;
        }
        :deep(svg) {
            height: 1.5rem;
        }
        @include button--regular;
    }

    .minor {
        @include button--minor;
        &:deep(svg) {
            height: 1.2rem;
        }
    }

    .small {
        @include button--small;
        @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
            & {
                padding: 0.35rem;
                font-size: $font-button--tablet;
            }
        }
    }
    .wide {
        @include button--wide;
        :deep(.child) {
            letter-spacing: $letter-spacing-button--wide;
            @include flex-position(row, nowrap, center, center);
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
    .menuLink {
        @include flex-position(row, nowrap, flex-start, center);
        @include text-header4($font-weight-semiBold);
        color: $white;
        letter-spacing: 0.2rem;
        padding: 2.5rem;
        gap: 1rem;
        width: 100%;
        transition: all 0.2s ease-out;
        &:deep(svg) {
            width: 3rem;
            height: 3rem;
        }
        &:hover,
        &.router-link-exact-active {
            background-color: $white;
            color: $blue-700;
        }
    }
    @media (max-width: $tablet-width) {
        button,
        a,
        router-link {
            @include button-basic;
            :deep(.child) {
                letter-spacing: $letter-spacing-button;
                font-size: $font-heading6--tablets;
                @include flex-position(row, nowrap, center, center);
                gap: 0.5rem;
            }
            :deep(svg) {
                height: 1.5rem;
            }
            @include button--regular;
        }

        .small {
            @include button--small--tablet;
        }
    }
</style>
