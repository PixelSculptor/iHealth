<template>
    <section class="referralsContainer">
        <h3 class="referralsContainer__header">
            Dodane skierowania
            <span class="numOfPres">{{ getPatientRefferals?.length }}</span>
        </h3>
        <ul
            v-if="getPatientRefferals?.length"
            class="referralsContainer__list">
            <referrals-component-labels
                v-for="(referral, idElement) in getPatientRefferals"
                :key="referral.id"
                :name="referral.doctorData"
                :date="referral.date"
                :typeofdoc="referral.typeOfDoc"
                :specialization="referral.specializationType"
                :typeOfTest="referral.testType"
                :index="idElement" />
        </ul>
        <div
            v-else
            class="fallback">
            <fallback-info-component :information="testInfo" />
        </div>
    </section>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import useUserStore from '../../stores/userStore';
    import { onMounted, ref } from 'vue';
    import FallbackInfoComponent from '../FallbackInfoComponent.vue';
    import ReferralsComponentLabels from './ReferralsComponentLabels.vue';
    const userStore = useUserStore();

    onMounted(async () => {
        await userStore.fetchPatientReferrals();
    });

    const { getPatientRefferals } = storeToRefs(userStore);

    const testInfo = ref('Nie dodano żadnego skierowania');
</script>

<style lang="scss" scoped>
    .referralsContainer {
        width: 100%;
        height: 25vh;

        @include flex-position(column, nowrap, flex-start, flex-start);
        gap: 1rem;
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
