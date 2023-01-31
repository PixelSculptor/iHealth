<template>
    <div class="certificatesContainer">
        <h3 class="certificatesContainer__header">
            Certyfikaty i testy
            <span class="numOfCerts">{{ certsList?.length }}</span>
        </h3>
        <ul
            v-if="certsList?.length"
            class="certificatesContainer__list">
            <certs-component
                v-for="cert in certsList"
                :key="cert.id"
                :date="cert.date"
                :document-link="cert.documentUrl"
                :name="cert.documentTitle"
                :type-of-doc="cert.testType" />
        </ul>
        <div
            v-else
            class="fallback">
            <fallback-info-component :information="testInfo" />
        </div>
    </div>
</template>

<script setup>
    import CertsComponent from './CertsComponent.vue';
    import { storeToRefs } from 'pinia';
    import useUserStore from '../../../stores/userStore.js';
    import { computed, ref } from 'vue';
    import FallbackInfoComponent from '../../FallbackInfoComponent.vue';

    const userStore = useUserStore();

    const { getPatientCerts } = storeToRefs(userStore);
    const testInfo = ref('Brak testów i certyfikatów');

    const certsList = computed(() => {
        return getPatientCerts?.value;
    });
</script>

<style lang="scss" scoped>
    .certificatesContainer {
        width: 100%;
        height: 23vh;
        @include flex-position(column, nowrap, flex-start, flex-start);
        gap: 1rem;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
            @include flex-position(row, nowrap, flex-start, center);
            gap: 1rem;
            .numOfCerts {
                display: inline-block;
                height: 2.5rem;
                width: 2.5rem;
                @include text-header4();
                text-align: center;
                background-color: $white;
                border: $border-size solid $gray-300;
                border-radius: 50%;
            }
        }
        &__list {
            height: 14vh;
            width: 100%;
            padding-top: 20vh;
            overflow-y: scroll;
            @include flex-position(column, nowrap, space-around, flex-start);
            gap: 1rem;
        }
    }

    //    media queries

    @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
        .certificatesContainer {
            &__list {
                padding-top: 17vh;
            }
        }
    }
</style>
