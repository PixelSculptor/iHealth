<template>
    <section class="dashboard">
        <h2 class="dashboard__header">Dashboard</h2>
        <div class="dashboard__actions">
            <button-component
                class="dashboard__make_visit"
                @click="openModal = true">
                Umów wizytę
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button-component>
            <teleport to="body">
                <transition name="modal">
                    <div
                        v-if="openModal"
                        class="modal">
                        <modal-component
                            ref="modal"
                            @close="openModal = false" />
                    </div>
                </transition>
            </teleport>
            <button-component
                class="dashboard__make_visit"
                @click="openModal = true">
                Dodaj badanie
                <font-awesome-icon icon="fa-solid fa-droplet" />
            </button-component>
            <button-component
                class="dashboard__make_visit"
                @click="openModal = true">
                Dodaj certyfikat / szczepienie
                <font-awesome-icon icon="fa-solid fa-syringe" />
            </button-component>
        </div>

        <article class="dashboard__bloodResults">
            <h3 class="blood__header">Morfologia</h3>
            <ul class="listOfResults">
                <li
                    v-for="bloodResult in bloodResults"
                    :key="bloodResult.researchID">
                    <blood-result
                        :blood-type="bloodResult.bloodType"
                        :date="bloodResult.date" />
                </li>
            </ul>
        </article>
        <article class="dashboard__bmiCalc">
            <bmi-calculator-component />
        </article>
        <article class="dashboard__vaccines">
            <certificates-vaccines-component />
        </article>
        <article class="dashboard__calendar">
            <h3>Kalendarz</h3>
        </article>
    </section>
</template>

<script setup>
    import ButtonComponent from '../components/ButtonComponent.vue';
    import BloodResult from '../components/BloodResult.vue';
    import BmiCalculatorComponent from '../components/BmiCalculatorComponent.vue';
    import { ref } from 'vue';
    import ModalComponent from '../components/ModalComponent.vue';
    import { onClickOutside } from '@vueuse/core';
    import CertificatesVaccinesComponent from '../components/CertificatesVaccinesGroupComponent.vue';

    const openModal = ref(false);
    const modal = ref(null);
    onClickOutside(modal, () => (openModal.value = false));

    const bloodResults = [
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 12,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 13,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 14,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 15,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 16,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 17,
        },
    ];
</script>

<style lang="scss" scoped>
    .dashboard {
        position: relative;
        display: grid;
        place-items: center;
        grid-template-areas:
            'dashboard dashboard bmi'
            'actions actions bmi'
            'blood blood calendar'
            'blood blood calendar'
            'vaccines vaccines vaccines'
            'vaccines vaccines vaccines';
        margin-inline: 2rem;
        &__header {
            grid-area: dashboard;
            @include text-header1($font-weight-semiBold);
            color: $blue-900;
            place-self: flex-start stretch;
        }
        &__actions {
            grid-area: actions;
            place-self: flex-start;
            width: 100%;
            gap: 1rem;
            @include flex-position(row, nowrap, space-around, center);
        }
        &__bloodResults {
            grid-area: blood;
            height: 90%;
            width: 100%;
            place-self: flex-start;

            .blood__header {
                @include text-header3($font-weight-semiBold);
                color: $blue-900;
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
        }
        &__bmiCalc {
            grid-area: bmi;
            height: 100%;
            width: 100%;
        }
        &__calendar {
            grid-area: calendar;
            place-self: center;
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
