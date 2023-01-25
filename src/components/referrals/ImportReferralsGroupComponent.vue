<template>
    <section class="referralsContainer">
        <h3
            class="referralsContainer__header"
            tabindex="0">
            Zaimportowane skierowania
            <span class="numOfImport">{{
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
                :date="referrals.dateImport" />
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
    import { ref } from 'vue';
    import useUserStore from '../../stores/userStore';
    import FallbackInfoComponent from '../FallbackInfoComponent.vue';
    import ImportReferralsLabels from './ImportReferralsLabels.vue';

    const userStore = useUserStore();

    const { getPatientImportReferrals } = storeToRefs(userStore);

    const importInfo = ref('Nie zaimportowano żadnych skierowań');
</script>

<style lang="scss" scoped>
    .referralsContainer {
        @include flex-position(column, nowrap, flex-start, flex-start);
        width: 100%;
        height: 25vh;
        gap: 0.1rem;
        &__header {
            @include text-header3($font-weight-semiBold);
            @include flex-position(row, nowrap, flex-start, center);
            color: $blue-900;
            gap: 1rem;
            .numOfImport {
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
            @include flex-position(column, nowrap, space-around, flex-start);
            height: 70%;
            padding-top: 10%;
            overflow-y: scroll;
            gap: 1rem;
        }

        @media (max-width: $tablet-width) {
            &__header {
                @include text-header3--tablet($font-weight-semiBold);
                @include flex-position(row, nowrap, flex-start, center);
                color: $blue-900;
                gap: 1rem;
                width: 70%;
                margin-left: 5rem;
            }
            &__list {
                @include flex-position(
                    column,
                    nowrap,
                    space-around,
                    flex-start
                );
                height: 70%;
                width: 82%;
                margin-left: 5rem;
                padding-top: 10%;
                overflow-y: scroll;
                gap: 1rem;
            }
        }

        @media (max-width: $laptop-width) {
            &__header {
                @include text-header3($font-weight-semiBold);
                color: $blue-900;
                @include flex-position(row, nowrap, flex-start, center);
                gap: 1rem;
                .numOfRefs {
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
                @include flex-position(
                    column,
                    nowrap,
                    space-around,
                    flex-start
                );
                gap: 1rem;
            }
        }
    }
</style>
