<template>
    <section class="referralsContainer">
        <h3
            class="referralsContainer__header"
            tabindex="0">
            Dodane skierowania
            <span class="numOfRefs">{{ getPatientRefferals?.length }}</span>
        </h3>
        <ul
            v-if="getPatientRefferals?.length"
            class="referralsContainer__list">
            <referrals-component-label
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
            <fallback-info-component :information="referralInfo" />
        </div>
    </section>
</template>

<script setup>
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';

    import useUserStore from '../../stores/userStore';
    import FallbackInfoComponent from '../FallbackInfoComponent.vue';
    import ReferralsComponentLabel from './ReferralsComponentLabel.vue';

    const referralInfo = ref('Nie dodano żadnego skierowania');

    const userStore = useUserStore();
    const { getPatientRefferals } = storeToRefs(userStore);
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
            @include flex-position(column, nowrap, space-around, flex-start);
            gap: 1rem;
        }

        @media (min-width: $zero-width) and (max-width: $tablet-width) {
            &__header {
                @include text-header3($font-weight-semiBold);
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
                padding-top: 10%;
                overflow-y: scroll;
                gap: 1rem;
                margin-left: 5rem;
            }
        }

        @media (min-width: $tablet-above-width) and (max-width: $laptop-width) {
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

        @media (min-width: $laptop-above-width) and (max-width: $pc-width) {
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
