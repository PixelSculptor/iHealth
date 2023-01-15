<template>
    <section class="prescription-container">
        <div class="prescriptionContainer">
            <h3 class="prescriptionContainer__header">
                Dodane recepty
                <span class="numOfPres">{{ prescriptionsList?.length }}</span>
            </h3>
            <ul
                v-if="prescriptionsList?.length"
                class="prescriptionContainer__list">
                <prescription-component
                    v-for="presc in prescriptionsList"
                    :key="presc.uid"
                    :name="presc.doctorData"
                    :date="presc.date"
                    :typeofdoc="presc.typeOfDoc"
                    :medicine="presc.medicineName"
                    :frequency="presc.frequencyMedicine" />
            </ul>
            <div
                v-else
                class="fallback">
                <fallback-info-component :information="testInfo" />
            </div>
        </div>
    </section>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import useUserStore from '../../stores/userStore';
    import { onMounted, computed, ref } from 'vue';
    import PrescriptionComponent from './PrescriptionComponent.vue';
    import FallbackInfoComponent from '../FallbackInfoComponent.vue';

    const userStore = useUserStore();

    onMounted(async () => {
        await userStore.fetchPatientPrescriptions();
        await userStore.fetchPatientImportPrescriptions();
    });

    const { getPatientPrescriptions } = storeToRefs(userStore);

    const testInfo = ref('Nie dodano żadnej recepty');

    const prescriptionsList = computed(() => {
        return getPatientPrescriptions?.value;
    });
</script>

<style lang="scss" scoped>
    .prescriptionContainer {
        width: 100%;
        height: 25vh;
        @include flex-position(column, nowrap, flex-start, flex-start);
        gap: 1rem;
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
