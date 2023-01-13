<template>
    <section class="visits">
        <div prescriptionDashboards>
            <h1 class="visits__header">Cześć, {{ name }}!</h1>
        </div>
        <article class="visits__clock">
            <clock-component />
        </article>
        <article class="visits__listOf">
            <visits-calendar />
        </article>
    </section>
</template>
<script setup>
    import useUserStore from '../stores/userStore.js';
    import { ref } from 'vue';
    import visitsCalendar from '../components/visits/visitsCalendar.vue';
    import ClockComponent from '../components/dashboard/ClockComponent.vue';

    const userStore = useUserStore();
    const name = ref(userStore.getUserInfo.data[0].name);
</script>

<style scoped lang="scss">
    .visits {
        position: relative;
        width: 100%;
        display: grid;
        place-items: start;
        grid-template-areas:
            'dashboard clock '
            'listOf listOf '
            'listOf listOf'
            'listOf listOf';
        margin-inline: 2em;
        &__header {
            grid-area: dashboard;
            @include text-header1($font-weight-semiBold);
            color: $blue-900;
            place-self: center flex-start;
        }
        &__clock {
            grid-area: clock;
            place-self: center;
        }
    }
</style>
