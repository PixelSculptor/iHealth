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
                        <span class="day-label">{{ day.day }}</span>
                        <div class="calendarNote">
                            <calendar-note-component
                                v-for="attr in attributes"
                                :key="attr.key"
                                :title="attr.customData.title" />
                        </div>
                    </div>
                </template>
            </v-calendar>
            <!--            <v-date-picker-->
            <!--                v-model="date"-->
            <!--                :timezone="timezone"-->
            <!--                color="indigo"-->
            <!--                is-expanded-->
            <!--                mode="dateTime" />-->
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
    const attributes = ref([
        {
            key: 1,
            customData: {
                title: 'Hello.',
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
        margin-left: 2rem;

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
                    height: 100%;

                    .day-label {
                        display: inline-block;
                        width: 100%;
                        padding: 0.5rem;
                        text-align: left;
                    }
                }
            }
        }

        &__userInfo {
            grid-area: sidebar;
            place-self: center flex-end;
        }
    }
</style>
<style lang="scss" scoped>
    $day-border: 1px solid #b8c2cc;
    $day-border-highlight: 1px solid #b8c2cc;
    $day-width: 90px;
    $day-height: 90px;
    $weekday-bg: #f8fafc;
    $weekday-border: 1px solid #eaeaea;

    .visitsView {
        &__calendar {
            &:deep(.calendar) {
                .vc-header {
                    background-color: #f1f5f8;
                    padding: 10px 0;
                }
                .vc-weeks {
                    padding: 0;
                }
                .vc-weekday {
                    background-color: $weekday-bg;
                    border-bottom: $weekday-border;
                    border-top: $weekday-border;
                    padding: 5px 0;
                }
                .vc-day {
                    padding: 0 5px 3px 5px;
                    text-align: left;
                    height: $day-height;
                    min-width: $day-width;
                    background-color: white;
                    &.weekday-1,
                    &.weekday-7 {
                        background-color: #eff8ff;
                    }
                    &:not(.on-bottom) {
                        border-bottom: $day-border;
                        &.weekday-1 {
                            border-bottom: $day-border-highlight;
                        }
                    }
                    &:not(.on-right) {
                        border-right: $day-border;
                    }
                }
                .vc-day-dots {
                    margin-bottom: 5px;
                }
            }
        }
    }
</style>
