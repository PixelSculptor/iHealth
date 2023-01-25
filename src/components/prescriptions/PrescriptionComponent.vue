<template>
    <li class="documentBox">
        <font-awesome-icon
            alt="add result icon"
            aria-label="add result icon"
            :icon="classOfIcon" />
        <h5
            :aria-label="'Imię i nazwisko lekarza: ' + name"
            class="documentBox__title"
            tabindex="0">
            {{ name }}
        </h5>
        <p
            :aria-label="'Data wystawienia recepty: ' + date"
            class="documentBox__data"
            tabindex="0">
            {{ date }}
        </p>
        <button-component
            small
            @click="openModalDetails = true">
            Szczegóły
        </button-component>
        <teleport to="body">
            <transition name="modal">
                <div
                    v-if="openModalDetails"
                    class="modal">
                    <modal-component
                        ref="modalDetils"
                        @close="openModalDetails = false">
                        <prescription-details
                            v-bind:key="getPatientPrescriptions[index].id"
                            :names="getPatientPrescriptions[index].doctorData"
                            :dates="getPatientPrescriptions[index].date"
                            :medicines="
                                getPatientPrescriptions[index].medicineName
                            "
                            :frequencys="
                                getPatientPrescriptions[index].frequencyMedicine
                            " />
                    </modal-component>
                </div>
            </transition>
        </teleport>
    </li>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import ButtonComponent from '../ButtonComponent.vue';
    import { onClickOutside } from '@vueuse/core';
    import PrescriptionDetails from '../prescriptions/PrescriptionDetails.vue';
    import ModalComponent from '../ModalComponent.vue';
    import { storeToRefs } from 'pinia';
    import useUserStore from '../../stores/userStore';

    defineProps({
        name: {
            type: String,
            default: 'Lekarz',
        },
        date: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: null,
        },
        typeOfDoc: {
            type: String,
            default: 'prescriptionView',
        },
        frequency: {
            type: String,
            default: '',
        },
        medicine: {
            type: String,
            default: '',
        },
        index: {
            type: Number,
            default: 0,
        },
    });

    const openModalDetails = ref(null);
    const modalDetils = ref(null);
    const userStore = useUserStore();
    const { getPatientPrescriptions } = storeToRefs(userStore);

    onClickOutside(modalDetils, () => (openModalDetails.value = false));

    const classOfIcon = computed(() => {
        return 'fa-solid ' + 'fa-pills';
    });
</script>

<style lang="scss" scoped>
    .documentBox {
        width: 100%;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;
        padding: 1rem;
        background-color: $white;
        @include flex-position(row, nowrap, space-between, center);
        gap: 5rem;
        &:deep(svg) {
            color: $blue-700;
            height: 3rem;
        }
        &__title {
            @include text-header5($font-weight-light);
            color: $gray-900;
        }
        &__data {
            @include text-header6($font-weight-regular);
        }
    }

    @media (max-width: $tablet-width) {
        .documentBox {
            @include flex-position(row, nowrap, space-between, center);
            width: 100%;
            border: $border-size solid $gray-300;
            border-radius: $border-radius--normal;
            padding: 0.5rem;
            background-color: $white;
            gap: 2.5rem;
            &:deep(svg) {
                color: $blue-700;
                height: 2rem;
            }
            &__title {
                @include text-header6--tablets($font-weight-medium);
                color: $gray-900;
                text-align: center;
            }
            &__data {
                @include text-header6--tablets($font-weight-medium);
                text-align: center;
            }
        }
    }

    @media (max-width: $laptop-width) {
        .documentBox {
            @include flex-position(row, nowrap, space-between, center);
            width: 100%;
            border: $border-size solid $gray-300;
            border-radius: $border-radius--normal;
            padding: 1rem;
            background-color: $white;
            gap: 3.75rem;
            &:deep(svg) {
                color: $blue-700;
                height: 2.5rem;
            }
            &__title {
                @include text-header6--laptop($font-weight-medium);
                color: $gray-900;
                text-align: center;
            }
            &__data {
                @include text-header5--laptops($font-weight-medium);
                text-align: center;
            }
        }
    }
</style>
