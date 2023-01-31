<template>
    <section
        v-if="getUserInfo.data"
        class="dashboard">
        <h2 class="dashboard__header">Dashboard</h2>
        <div class="dashboard__actions">
            <button-component
                class="dashboard__make_visit"
                @click="openModalResearch = true">
                Dodaj badanie
                <font-awesome-icon icon="fa-solid fa-droplet" />
            </button-component>

            <teleport to="body">
                <transition name="modal">
                    <div
                        v-if="openModalResearch"
                        class="modal">
                        <modal-component
                            ref="modalResearch"
                            @close="openModalResearch = false">
                            <resource-component />
                        </modal-component>
                    </div>
                </transition>
            </teleport>

            <button-component
                class="dashboard__make_visit"
                @click="openModalVaccination = true">
                Dodaj certyfikat / szczepienie
                <font-awesome-icon icon="fa-solid fa-syringe" />
            </button-component>

            <teleport to="body">
                <transition name="modal">
                    <div
                        v-if="openModalVaccination"
                        class="modal">
                        <modal-component
                            ref="modalVacc"
                            @close="openModalVaccination = false">
                            <vaccination-component />
                        </modal-component>
                    </div>
                </transition>
            </teleport>
        </div>

        <article class="dashboard__bloodResults">
            <h3 class="blood__header">
                Morfologia
                <span class="numOfResearch">{{ bloodResults?.length }}</span>
            </h3>

            <ul
                v-if="bloodResults?.length"
                class="listOfResults">
                <li
                    v-for="bloodResult in bloodResults"
                    :key="bloodResult.id">
                    <blood-result
                        :blood-type="bloodResult.bloodType"
                        :date="bloodResult.date"
                        :link-document="bloodResult.testUrl" />
                </li>
            </ul>
            <div
                v-else
                class="fallback">
                <fallback-info-component :information="bloodInfo" />
            </div>
        </article>

        <article class="dashboard__bmiCalc">
            <bmi-calculator-component />
        </article>

        <article class="dashboard__vaccines">
            <certificates-vaccines-component />
        </article>

        <article class="dashboard__calendar">
            <clock-component />
        </article>
    </section>
</template>

<script async setup>
    import ButtonComponent from '../components/ButtonComponent.vue';
    import BloodResult from '../components/dashboard/tests/BloodResult.vue';
    import BmiCalculatorComponent from '../components/dashboard/BmiCalculatorComponent.vue';
    import CertificatesVaccinesComponent from '../components/dashboard/tests/CertificatesVaccinesGroupComponent.vue';
    import ModalComponent from '../components/ModalComponent.vue';
    import ResourceComponent from '../components/dashboard/ResourceComponent.vue';
    import VaccinationComponent from '../components/dashboard/tests/VaccinationComponent.vue';
    import ClockComponent from '../components/dashboard/ClockComponent.vue';
    import FallbackInfoComponent from '../components/FallbackInfoComponent.vue';

    import useUserStore from '../stores/userStore.js';
    import { computed, onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { onClickOutside } from '@vueuse/core';

    const userStore = useUserStore();
    const { getUserInfo } = storeToRefs(userStore);
    const openModalResearch = ref(false);
    const openModalVaccination = ref(false);
    const modalResearch = ref(null);
    const modalVacc = ref(null);

    const bloodInfo = ref('Brak badań');

    onClickOutside(modalResearch, () => (openModalResearch.value = false));
    onClickOutside(modalVacc, () => (openModalVaccination.value = false));

    onMounted(async () => {
        await userStore.fetchUserData();
        await userStore.fetchPatientTests();
        await userStore.fetchPatientCerts();
    });

    const { getPatientTests } = storeToRefs(userStore);

    const bloodResults = computed(() => {
        return getPatientTests.value?.filter((test) => {
            return test.testType === 'morphology';
        });
    });
</script>

<style lang="scss" scoped>
    .dashboard {
        position: relative;
        display: grid;
        place-items: center;
        grid-template-areas:
            'dashboard calendar calendar'
            'actions calendar calendar'
            'vaccines bmi bmi'
            'vaccines bmi bmi'
            'blood blood blood'
            'blood blood blood';
        margin-inline: 2rem;
        gap: 5%;
        &__header {
            @include text-header1($font-weight-semiBold);
            grid-area: dashboard;
            color: $blue-900;
            place-self: center flex-start;
        }
        &__actions {
            @include flex-position(row, nowrap, space-between, center);
            grid-area: actions;
            place-self: flex-start;
            width: 100%;
            gap: 2rem;
            button {
                width: 100%;
                height: 5rem;
            }
        }
        &__bloodResults {
            grid-area: blood;
            height: 90%;
            width: 100%;

            .blood__header {
                @include text-header3($font-weight-semiBold);
                color: $blue-900;
                .numOfResearch {
                    display: inline-block;
                    height: 2.5rem;
                    width: 2.5rem;
                    @include text-header4();
                    text-align: center;
                    background-color: $white;
                    border: $border-size solid $gray-300;
                    border-radius: 50%;
                }
            }
            .listOfResults {
                width: 100%;
                overflow-y: scroll;
                height: 33vh;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
            }
        }
        &__vaccines {
            grid-area: vaccines;
            place-self: flex-start;
            width: 100%;
            height: 100%;
        }
        &__bmiCalc {
            grid-area: bmi;
            height: 100%;
            width: 100%;
            place-self: center;
        }
        &__calendar {
            grid-area: calendar;
            place-self: center;
        }
    }

    //    media queries

    @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
        .dashboard {
            grid-template-areas:
                'dashboard calendar calendar'
                'actions actions actions'
                'bmi bmi bmi'
                'vaccines vaccines vaccines'
                'blood blood blood'
                'blood blood blood';
            margin-top: 2rem;
            gap: 2%;

            &__header {
                @include text-header2($font-weight-semiBold);
                place-self: center flex-start;
            }

            &__calendar {
                place-self: center flex-end;
            }

            &__actions {
                @include flex-position(row, nowrap, space-between, flex-start);
                gap: 2rem;
                button {
                    width: 50%;
                    height: 5rem;
                }
            }

            &__bmiCalc {
                place-self: flex-start;
            }
        }
    }
</style>

<style lang="scss">
    .modal {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        @include flex-position(column, nowrap, center, center);
    }
    .modal-enter-active,
    .modal-leave-active {
        transition: all 0.25s ease-out;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(1.1);
    }
</style>
