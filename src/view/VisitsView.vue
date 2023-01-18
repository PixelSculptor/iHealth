<template>
    <section class="visitsView">
        <article class="visitsView__header">
            <greetings-component />
        </article>

        <article class="visitsView__calendar">
            <button-component regular>
                Dodaj wpis
                <font-awesome-icon icon="fa-solid fa-calendar-plus" />
            </button-component>
            <v-calendar
                v-model="date"
                :attributes="attributes"
                class="calendar"
                color="indigo"
                is-expanded
                is-range>
                <template v-slot:day-content="{ day, attributes }">
                    <div class="box">
                        <span class="">{{ day.day }}</span>
                        <div class="">
                            <p
                                v-for="attr in attributes"
                                :key="attr.key"
                                class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1">
                                <calendar-note-component
                                    :title="attr.customData.title" />
                            </p>
                        </div>
                    </div>
                </template>
            </v-calendar>
            <v-date-picker
                v-model="date"
                :timezone="timezone"
                color="indigo"
                is-expanded
                mode="dateTime" />
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
    import ButtonComponent from '../components/ButtonComponent.vue';
    import CalendarNoteComponent from '../components/calendarWidget/CalendarNoteComponent.vue';

    const date = ref(new Date());
    const x = ref(new Date());
    const timezone = ref('');
    const attributes = ref([
        {
            key: 1,
            customData: {
                title: 'Hello.',
                place: '',
                doctor: '',
                specInfo: '',
            },
            dates: new Date(
                date.value.getFullYear(),
                date.value.getMonth(),
                23
            ),
        },
    ]);

    console.log(date.value.getHours());

    watch(date, () => {
        console.log(date.value, x.value.getHours(), x.value.getMinutes());
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
            @include flex-position(column, nowrap, center, center);
            place-self: center center;

            &:deep(.calendar) {
                width: 50vw;
                .box {
                    @include flex-position(column, nowrap, flex-start, center);
                    margin-inline: 20px;
                }
            }
        }

        &__userInfo {
            grid-area: sidebar;
            place-self: center flex-end;
        }
    }
</style>
