<template>
    <article class="dateNoteContainer">
        <slot />
        <div class="dateNoteContainer__info info">
            <h6 class="info__title">{{ title }}</h6>
            <p class="info__date">{{ hour }}</p>
        </div>
    </article>
</template>

<script setup>
    defineProps({
        title: {
            type: String,
            default: '',
        },
        hour: {
            type: String,
            default: '',
        },
    });
</script>

<style lang="scss" scoped>
    .dateNoteContainer {
        &__info {
            @include flex-position(row, wrap, flex-start, flex-start);
            height: 6vh;
            padding: 0.5rem;
            border-radius: $border-radius--normal;
            flex-wrap: wrap;
            word-wrap: break-word;
            overflow-y: scroll;
            overflow-x: hidden;
            background-color: $blue-500;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;

            &:hover {
                background-color: $blue-700;
            }

            .info {
                &__title {
                    @include text-paragraph($font-weight-semiBold);
                    color: $white;
                    height: auto;
                    width: 100%;
                }
                &__date {
                    color: $white;
                }
            }
        }
    }

    @media (max-width: 900px) {
        .dateNoteContainer {
            @include flex-position(row, nowrap, center, center);
            width: 100%;
            &__info {
                height: 1.5rem;
                width: 1.5rem;
                border-radius: 50%;
                .info__title,
                .info__date {
                    color: $blue-500;
                }
            }
        }
    }
</style>
