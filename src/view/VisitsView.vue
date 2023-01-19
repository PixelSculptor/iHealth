<template>
    <section class="visitsView">
        <article class="visitsView__header">
            <greetings-component />
        </article>

        <article class="visitsView__calendar">
            <button-component
                regular
                @click="addVisitModal = true">
                Dodaj wpis
                <font-awesome-icon icon="fa-solid fa-calendar-plus" />
            </button-component>
            <template>
                <teleport to="body">
                    <transition name="modal">
                        <div
                            v-if="addVisitModal"
                            class="modal">
                            <modal-component
                                ref="modalAddVisit"
                                @close="addVisitModal = false">
                                <add-visit-form-component />
                            </modal-component>
                        </div>
                    </transition>
                </teleport>
            </template>

            <v-calendar
                :attributes="data"
                class="calendar"
                color="indigo"
                is-expanded
                is-range>
                <template v-slot:day-content="{ day }">
                    <div class="dayContainer">
                        <span class="dayContainer__day-label">{{
                            day.day
                        }}</span>
                        <div
                            v-if="filterDates(day)"
                            class="dayContainer__calendarNote">
                            <calendar-note-component
                                :hour="filterDates(day)?.customData.hour"
                                :title="filterDates(day)?.customData.title"
                                @click="seeDetailsFlag = true">
                                <template>
                                    <teleport to="body">
                                        <transition name="modal">
                                            <div
                                                v-if="seeDetailsFlag"
                                                class="modal">
                                                <modal-component
                                                    ref="modalVisitDetails"
                                                    @close="
                                                        seeDetailsFlag = false
                                                    ">
                                                    <visits-details-component
                                                        :date="
                                                            filterDates(day)
                                                                ?.customData
                                                                .date
                                                        "
                                                        :doctor="
                                                            filterDates(day)
                                                                ?.customData
                                                                .doctor
                                                        "
                                                        :hour="
                                                            filterDates(day)
                                                                ?.customData
                                                                .hour
                                                        "
                                                        :place="
                                                            filterDates(day)
                                                                ?.customData
                                                                .place
                                                        "
                                                        :title="
                                                            filterDates(day)
                                                                ?.customData
                                                                .title
                                                        " />
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
        </article>

        <aside class="visitsView__userInfo">
            <user-sidebar-component />
        </aside>
    </section>
</template>

<script async setup>
    import { computed, onMounted, ref } from 'vue';
    import { onClickOutside } from '@vueuse/core';
    import useUserStore from '../stores/userStore.js';

    import GreetingsComponent from '../components/GreetingsComponent.vue';
    import UserSidebarComponent from '../components/profile/userSidebar/UserSidebarComponent.vue';
    import ButtonComponent from '../components/ButtonComponent.vue';
    import CalendarNoteComponent from '../components/visits/CalendarNoteComponent.vue';
    import ModalComponent from '../components/ModalComponent.vue';
    import AddVisitFormComponent from '../components/visits/AddVisitFormComponent.vue';
    import VisitsDetailsComponent from '../components/visits/VisitsDetailsComponent.vue';

    const userStore = useUserStore();

    const seeDetailsFlag = ref(true);
    const addVisitModal = ref(false);
    const modalVisitDetails = ref(null);
    const modalAddVisit = ref(null);

    onClickOutside(modalVisitDetails, () => (seeDetailsFlag.value = false));
    onClickOutside(modalAddVisit, () => (addVisitModal.value = false));

    onMounted(async () => await userStore.fetchPatientVisits());

    // vue/no-unused-vars
    const data = computed(() => {
        if (userStore.getPatientVisits) {
            return userStore.getPatientVisits.map((element, index) => {
                return {
                    key: ++index,
                    customData: {
                        title: element.visitTitle,
                        doctor: element.doctor,
                        specialization: element.specialization,
                        hour: element.hour,
                        place: element.place,
                        date: element.date,
                    },
                    dates: new Date(
                        element.date.split('-')[0],
                        element.date.split('-')[1],
                        element.date.split('-')[2]
                    ),
                };
            });
        }
        return [];
    });
    const filterDates = ({ month, day }) =>
        data.value.find(
            ({ dates }) => dates.getMonth() === month && dates.getDate() === day
        );
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
            place-self: flex-end flex-start;
        }

        &__calendar {
            @include flex-position(column, nowrap, center, center);
            width: 100%;
            height: 100%;
            grid-area: calendar;
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
                        padding: 0.5rem;
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
    $day-width: 3rem;
    $day-height: 4rem;
    $weekday-bg: #f8fafc;
    $weekday-border: 1px solid #eaeaea;

    .visitsView {
        &__calendar {
            @include flex-position(column, nowrap, flex-start, center);
            margin-top: 10%;
            gap: 1rem;
            &:deep(button) {
                align-self: flex-start;
            }
            &:deep(.calendar) {
                .vc-header {
                    background-color: #f1f5f8;
                    padding: 0.5rem 0;
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
                    min-height: $day-height;
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
