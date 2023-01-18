<template>
    <article class="dateNoteContainer">
        <div class="dateNoteContainer__info info">
            <h6 class="info__title">{{ title }}</h6>
            <p>{{ date }}</p>
        </div>
    </article>
</template>

<script setup>
    defineProps({
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
</script>

<style lang="scss" scoped></style>
