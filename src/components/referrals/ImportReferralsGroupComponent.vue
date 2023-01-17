<template>
    <section class="referralsContainer">
        <h3 class="referralsContainer__header">
            Zaimportowane skierowania
            <span class="numOfPres">{{
                getPatientImportReferrals?.length
            }}</span>
        </h3>
        <ul
            v-if="getPatientImportReferrals?.length"
            class="referralsContainer__list">
            <import-referrals-labels
                v-for="referrals in getPatientImportReferrals"
                :key="referrals.id"
                :name="referrals.doctorReferralsDataImport"
                :testUrl="referrals.testUrl"
                :date="referrals.dateImport"
                :typeofdoc="referrals.typeOfDoc" />
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
    import FallbackInfoComponent from '../FallbackInfoComponent.vue';
    import ImportReferralsLabels from './ImportReferralsLabels.vue';

    const userStore = useUserStore();

    const { getPatientImportReferrals } = storeToRefs(userStore);

    const importInfo = ref('Nie zaimportowano żadnych skierowań');
</script>

<style lang="scss" scoped>
    .referralsContainer {
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
