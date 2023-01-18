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
                    <div class="dayContainer">
                        <span class="dayContainer__day-label">{{
                            day.day
                        }}</span>
                        <div class="dayContainer__calendarNote">
                            <calendar-note-component
                                v-for="attr in attributes"
                                :key="attr.key"
                                :title="attr.customData.title"
                                @click="seeDetailsFlag = true">
                                <template>
                                    <teleport to="body">
                                        <transition name="modal">
                                            <div
                                                v-if="seeDetailsFlag"
                                                class="modal">
                                                <modal-component
                                                    ref="modalUserContacts"
                                                    @close="
                                                        seeDetailsFlag = false
                                                    ">
                                                    <!--                                        add calendarDetails-->
                                                </modal-component>
                                            </div>
                                        </transition>
                                    </teleport>
                                </template>
                            </calendar-note-component>
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
    import ModalComponent from '../components/ModalComponent.vue';

    const seeDetailsFlag = ref(false);
    const date = ref(new Date());
    const x = ref(new Date());
    const attributes = ref([
        {
            key: 1,
            customData: {
                title: 'Lekarz',
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
            margin-right: 2rem;

            &:deep(.calendar) {
                width: 50vw;
                z-index: 0;
                .dayContainer {
                    @include flex-position(column, wrap, flex-start, center);
                    height: 100%;
                    gap: 0.1rem;

                    &__day-label {
                        @include text-button($font-weight-semiBold);
                        display: inline-block;
                        padding: 0.8rem;
                        align-self: flex-start;
                        //text-align: left;
                        &--today {
                        }
                    }
                    &__calendarNote {
                        width: 100%;
                        padding-inline: 0.5rem;
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
    $day-width: 7rem;
    $day-height: 7rem;
    $weekday-bg: #f8fafc;
    $weekday-border: 1px solid #eaeaea;

    .visitsView {
        &__calendar {
            &:deep(.calendar) {
                .vc-header {
                    background-color: #f1f5f8;
                    padding: 0.7rem 0;
                }
                .vc-weeks {
                    padding: 0;
                }
                .vc-weekday {
                    background-color: $weekday-bg;
                    border-bottom: $weekday-border;
                    border-top: $weekday-border;
                    padding: 0.2rem 0;
                }
                .vc-day {
                    padding: 0 0.2rem 0.125rem 0.2rem;
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
                    margin-bottom: 0.2rem;
                }
            }
        }
    }
</style>
