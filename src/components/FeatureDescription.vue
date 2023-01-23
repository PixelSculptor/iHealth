<template>
    <article class="feature-description">
        <slot name="icon"></slot>
        <section class="feature-description__text">
            <slot name="description"></slot>
        </section>
    </article>
</template>

<script></script>

<style lang="scss" scoped>
    .feature-description {
        margin: 0.5rem 0;
        @include flex-position(column, wrap, space-around, flex-start);
        gap: 1rem;
        &:deep(svg) {
            font-size: 2rem;
        }

        &:deep(.feature-description__text) {
            @include flex-position(column, wrap, space-around, flex-start);
            gap: 0.5rem;
            h6 {
                font-weight: $font-weight-semiBold;
                margin-bottom: 0.225rem;
            }
            p {
                color: $gray-300;
            }
        }
    }
</style>
