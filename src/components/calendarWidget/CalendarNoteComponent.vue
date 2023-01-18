<template>
    <article class="dateNoteContainer">
        <slot />
        <div class="dateNoteContainer__info info">
            <h6 class="info__title">{{ title }}</h6>
            <p class="info__date">{{ formatData }}</p>
        </div>
    </article>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
        doctor: {
            type: String,
            default: '',
        },
        date: {
            type: Date,
            default: new Date(),
        },
        place: {
            type: String,
            default: '',
        },
        specInfo: {
            type: String,
            default: '',
        },
    });
    const formatData = computed(
        () =>
            `${
                props.date.getHours() < 10
                    ? '0' + props.date.getHours()
                    : props.date.getHours()
            }:${
                props.date.getMinutes() < 10
                    ? '0' + props.date.getMinutes()
                    : props.date.getMinutes()
            }`
    );
    console.log(props.date.getHours(), formatData.value);
</script>

<style lang="scss" scoped>
    .dateNoteContainer {
        &__info {
            @include flex-position(row, wrap, flex-start, flex-start);
            height: 5vh;
            padding: 0.5rem;
            border-radius: $border-radius--normal;
            flex-wrap: wrap;
            word-wrap: break-word;
            overflow-y: scroll;
            overflow-x: hidden;
            background-color: $blue-500;
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
</style>
