<template>
    <li
        v-bind:key="props.id"
        class="documentBox">
        <font-awesome-icon :icon="classOfIcon" />
        <h5 class="documentBoxtitle">{{ name }}</h5>
        <h5 class="documentBoxtitle">{{ date }}</h5>
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
                            v-bind:key="detailsList[index].id"
                            :names="detailsList[index].doctorData"
                            :dates="detailsList[index].date"
                            :medicines="detailsList[index].medicineName"
                            :frequencys="
                                detailsList[index].frequencyMedicine
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

    const openModalDetails = ref(null);
    const modalDetils = ref(null);
    onClickOutside(modalDetils, () => (openModalDetails.value = false));
    const userStore = useUserStore();
    const { getPatientPrescriptions } = storeToRefs(userStore);

    const detailsList = computed(() => {
        return getPatientPrescriptions?.value;
    });

    const props = defineProps({
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
        gap: 3rem;
        &:deep(svg) {
            color: $blue-700;
            height: 3rem;
        }
        &__title {
            @include text-header5($font-weight-light);
            color: $gray-700;
        }
    }
</style>
