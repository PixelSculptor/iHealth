<template>
    <section class="prescriptionContainer">
        <h3 class="prescriptionContainer__header">
            Zaimportowane recepty
            <span class="numOfPres">{{
                getPatientImportPrescriptions?.length
            }}</span>
        </h3>
        <ul
            v-if="getPatientImportPrescriptions?.length"
            class="prescriptionContainer__list">
            <prescription-import-component
                v-for="prescription in getPatientImportPrescriptions"
                :key="prescription.id"
                :testUrl="prescription.testUrl"
                :name="prescription.doctorDataImport"
                :date="prescription.dateImport"
                :typeofdoc="prescription.typeOfDoc"
                :medicine="prescription.medicineNameImport"
                :frequency="prescription.frequencyMedicineImport" />
        </ul>
        <div
            v-else
            class="fallback">
            <fallback-info-component :information="importInfo" />
        </div>
    </section>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import useUserStore from '../../stores/userStore';
    import { ref } from 'vue';
    import PrescriptionImportComponent from './PrescriptionImportComponent..vue';
    import FallbackInfoComponent from '../FallbackInfoComponent.vue';

    const userStore = useUserStore();

    const { getPatientImportPrescriptions } = storeToRefs(userStore);

    const importInfo = ref('Nie zaimportowano żadnych recept');
</script>

<style lang="scss" scoped>
    .prescriptionContainer {
        width: 100%;
        height: 25vh;
        @include flex-position(column, nowrap, flex-start, flex-start);
        gap: 0.1rem;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
            @include flex-position(row, nowrap, flex-start, center);
            gap: 1rem;
            .numOfPres {
                display: inline-block;
                height: 2.5rem;
                width: 2.5rem;
                @include flex-position(column, nowrap, center, center);
                @include text-header4();
                text-align: center;
                background-color: $white;
                border: $border-size solid $gray-300;
                border-radius: 50%;
            }
        }
        &__list {
            height: 70%;
            padding-top: 10%;
            overflow-y: scroll;
            @include flex-position(column, nowrap, space-around, flex-start);
            gap: 1rem;
        }
    }
</style>
