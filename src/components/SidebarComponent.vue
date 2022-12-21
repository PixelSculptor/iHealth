<template>
    <aside
        class="menu"
        :class="{ isExpanded: isExpanded }">
        <brand-header-component :hide-brand="isExpanded" />
        <div class="menu__toggle--wrap">
            <button
                class="toggleMenu"
                @click="toggleMenu">
                <font-awesome-icon
                    v-if="!isExpanded"
                    icon="fa-solid fa-bars" />
                <font-awesome-icon
                    v-else
                    icon="fa-solid fa-xmark" />
            </button>
        </div>
    </aside>
</template>

<script setup>
    import BrandHeaderComponent from './BrandHeaderComponent.vue';
    import { ref } from 'vue';

    const isExpanded = ref(false);

    const toggleMenu = () => {
        isExpanded.value = !isExpanded.value;
    };
</script>

<style scoped lang="scss">
    .menu {
        @include flex-position(column, nowrap, flex-start, center);
        border-radius: 0 $border-radius--normal $border-radius--normal 0;
        background-color: $blue-500;
        color: $white;
        height: 100vh;
        width: calc(6vw + 2rem);
        overflow: hidden;

        gap: 3%;
        padding: 2rem;
        transition: all 0.3s ease-out;

        .menu__toggle--wrap {
            width: 100%;
            @include flex-position(column, nowrap, center, center);
            position: relative;
            top: 0;

            transition: 0.3s ease-in-out;

            .toggleMenu {
                @include flex-position(row, nowrap, flex-end, center);
                width: inherit;
                height: inherit;
                box-sizing: border-box;
                background: none;
                color: $white;
                border: none;
                cursor: pointer;
                &:focus-visible {
                    @include focus;
                    color: $white;
                    border: none;
                    background: none;
                }
                &:deep(svg) {
                    height: 3rem;
                    &:hover {
                        animation: rotation 0.3s 1;
                    }
                }
            }
        }

        &.isExpanded {
            width: 35vw;
            @include flex-position(column, nowrap, flex-start, flex-start);
            .menu__toggle--wrap {
                transform: translateY(-200%);
            }
        }

        @media (max-width: 768px) {
            position: fixed;
            z-index: 99;
        }
    }

    @keyframes rotation {
        from {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
