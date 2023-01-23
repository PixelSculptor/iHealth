<template>
    <article class="date">
        <section
            class="date__clock"
            tabindex="0">
            <h2
                :aria-label="dateTime.hours + ':' + dateTime.minutes"
                aria-live="polite"
                class="digitalClock">
                {{ dateTime.hours }} : {{ dateTime.minutes }} :
                {{ dateTime.seconds }}
            </h2>
        </section>
        <date-component />
    </article>
</template>

<script async setup>
    import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
    import DateComponent from '../DateComponent.vue';

    const dateTime = ref({
        hours: null,
        minutes: null,
        seconds: null,
    });
    const timer = ref(undefined);

    const setTime = () => {
        const date = new Date();
        dateTime.value.hours =
            date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        dateTime.value.minutes =
            date.getMinutes() < 10
                ? `0${date.getMinutes()}`
                : date.getMinutes();
        dateTime.value.seconds =
            date.getSeconds() < 10
                ? `0${date.getSeconds()}`
                : date.getSeconds();
    };

    onBeforeMount(async () => {
        timer.value = setInterval(setTime, 1000);
    });

    onBeforeUnmount(() => {
        clearInterval(timer.value);
    });
</script>

<style lang="scss" scoped>
    .date {
        @include flex-position(column, nowrap, space-evenly, center);

        &__clock {
            .digitalClock {
                @include text-header2($font-weight-semiBold);
                color: $blue-900;
            }
        }
    }
</style>
