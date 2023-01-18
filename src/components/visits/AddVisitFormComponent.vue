<template>
    <section class="addVisit">
        <h3 class="addVisit__header">Dodaj wizytę:</h3>
        <form
            action=""
            class="addVisit__form">
            <article class="userPoles">
                <div class="inputBox">
                    <label for="title">Tytuł wizyty: </label>
                    <input
                        id="title"
                        v-model="title"
                        type="text" />
                </div>

                <div class="inputBox">
                    <label for="place">Miejsce: </label>
                    <input
                        id="place"
                        v-model="place"
                        type="text" />
                </div>
                <div class="inputBox">
                    <label for="doctorData">Lekarz: </label>
                    <select
                        id="doctorData"
                        v-model="doctorData">
                        <option
                            disabled
                            value="">
                            Wybierz lekarza
                        </option>
                        <option
                            v-for="research in doctorList"
                            :key="research.registryId">
                            {{ research.doctorName }}
                        </option>
                    </select>
                </div>
                <div class="inputBox">
                    <label for="specialization">Specjalizacja:</label>
                    <select
                        id="specialization"
                        v-model="specialization">
                        <option
                            disabled
                            value="">
                            Wybierz specjalizację:
                        </option>
                        <option
                            v-for="research in specializationArray"
                            :key="research.specKeyName">
                            {{ research.specName }}
                        </option>
                    </select>
                </div>
            </article>
            <article
                id="datePicker"
                class="inputBox">
                <label for="visitDate">Podaj datę: </label>
                <v-date-picker
                    id="visitDate"
                    v-model="date"
                    color="indigo"
                    mode="dateTime" />
            </article>
            <article class="actionsAndInfo">
                <button-component
                    :disabled="!disableAddVisit"
                    wide
                    >Zatwierdź</button-component
                >
                <bouncing-balls-component
                    :visible="isLoading"
                    class="loader" />
                <error-info :message="error" />
                <span
                    v-show="successFlag"
                    aria-label="passwords match"
                    class="dataSend"
                    role="presentation"
                    >Twoje dane zostały zapisane pomyślnie!</span
                >
            </article>
        </form>
    </section>
</template>

<script setup>
    import { computed, ref, watch } from 'vue';
    import getDoctorsArray from '../../composables/getDoctor.js';
    import specializationArray from '../../utils/specializationArray.js';

    import ButtonComponent from '../ButtonComponent.vue';
    import BouncingBallsComponent from '../BouncingBallsComponent.vue';
    import ErrorInfo from '../ErrorInfo.vue';

    // const {error, isLoading, addDoc} = useCollection('visits');
    const doctorData = ref(null);
    const date = ref(null);
    const successFlag = ref(false);
    const place = ref(null);
    const title = ref(null);
    const specialization = ref(null);

    const doctorList = computed(() => getDoctorsArray());

    const formatHour = computed(
        () =>
            `${
                date.value.getHours() < 10
                    ? '0' + date.value.getHours()
                    : date.value.getHours()
            }:${
                date.value.getMinutes() < 10
                    ? '0' + date.value.getMinutes()
                    : date.value.getMinutes()
            }`
    );

    const disableAddVisit = computed(() => false);

    const formatDate = computed(
        () =>
            `${date.value.getFullYear()}-${
                date.value.getMonth() + 1 < 10
                    ? '0' + (date.value.getMonth() + 1)
                    : date.value.getMonth() + 1
            }-${
                date.value.getDate() < 10
                    ? '0' + date.value.getDate()
                    : date.value.getDate()
            }`
    );

    watch(date, () => {
        console.log(formatDate.value, formatHour.value);
    });
</script>

<style lang="scss" scoped>
    .addVisit {
        height: 100%;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
            height: 5%;
        }
        &__form {
            display: grid;
            grid-template-areas:
                'inputs datepicker'
                'action action';
            height: 95%;
            place-items: flex-start;
            gap: 1rem;

            .userPoles {
                @include flex-position(
                    column,
                    nowrap,
                    space-around,
                    flex-start
                );
                grid-area: inputs;
                place-self: flex-start;
                height: 100%;
            }

            #datePicker {
                @include flex-position(column, nowrap, space-evenly, center);
                grid-area: datepicker;
                height: 100%;
                place-self: center;
            }

            .inputBox {
                @include flex-position(row, nowrap, flex-start, center);
                gap: 0.5rem;

                select,
                input {
                    @include text-header6($font-weight-regular);
                }

                label,
                .datePicker label {
                    @include label;
                    color: $blue-900;
                }
            }

            .actionsAndInfo {
                grid-area: action;
                place-self: center;
            }
        }
    }
</style>
