<template>
    <section class="prescription-container">
        <div class="prescriptionContainer">
            <h3 class="prescriptionContainer__header">
                Zaimportowane recepty
                <span class="numOfPres">{{
                    prescriptionImportList?.length
                }}</span>
            </h3>
            <ul
                v-if="prescriptionImportList?.length"
                class="prescriptionContainer__list">
                <prescription-import-component
                    v-for="presc in prescriptionImportList"
                    :key="presc.uid"
                    :testUrl="presc.testUrl"
                    :name="presc.doctorDataImport"
                    :date="presc.dateImport"
                    :typeofdoc="presc.typeOfDoc"
                    :medicine="presc.medicineNameImport"
                    :frequency="presc.frequencyMedicineImport" />
            </ul>
            <div
                v-else
                class="fallback">
                <fallback-info-component :information="importInfo" />
            </div>
        </div>
    </section>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import useUserStore from '../../stores/userStore';
    import { onMounted, computed, ref } from 'vue';
    import PrescriptionImportComponent from './PrescriptionImportComponent..vue';
    import FallbackInfoComponent from '../FallbackInfoComponent.vue';

    const userStore = useUserStore();

    onMounted(async () => {
        await userStore.fetchPatientPrescriptions();
        await userStore.fetchPatientImportPrescriptions();
    });

    const { getPatientImportPrescriptions } = storeToRefs(userStore);

    const importInfo = ref('Nie zaimportowano żadnych recept');

    const prescriptionImportList = computed(() => {
        return getPatientImportPrescriptions?.value;
    });
</script>

<style lang="scss" scoped>
    .prescriptionContainer {
        width: 100%;
        height: 25vh;
        padding-top: 10vh;
        @include flex-position(column, nowrap, flex-start, flex-start);
        gap: 0.1rem;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
            @include flex-position(row, nowrap, center, center);
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
