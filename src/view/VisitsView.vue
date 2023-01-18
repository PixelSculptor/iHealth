<template>
    <section class="visitsView">
        <article class="visitsView__header">
            <greetings-component />
        </article>

        <article class="visitsView__calendar">
            <v-date-picker
                v-model="date"
                class="calendar"
                color="indigo"
                is-expanded
                is-range />
        </article>

        <aside class="visitsView__userInfo">
            <user-sidebar-component />
        </aside>
    </section>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import GreetingsComponent from '../components/GreetingsComponent.vue';
    import UserSidebarComponent from '../components/profile/userSidebar/UserSidebarComponent.vue';

    const date = ref(new Date());

    watch(date, () => {
        console.log(date.value.start);
    });
</script>

<style lang="scss" scoped>
    .visitsView {
        display: grid;
        place-items: center;
        grid-template-areas:
            'header header header header header header header header header header header header header header sidebar'
            'calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar sidebar'
            'calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar sidebar'
            'calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar sidebar'
            'calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar calendar sidebar';

        &__header {
            grid-area: header;
            place-self: center flex-start;
        }

        &__calendar {
            width: 100%;
            height: 100%;
            grid-area: calendar;
            place-self: center center;

            &:deep(.calendar) {
            }
        }

        &__userInfo {
            grid-area: sidebar;
            place-self: center flex-end;
        }
    }
</style>
