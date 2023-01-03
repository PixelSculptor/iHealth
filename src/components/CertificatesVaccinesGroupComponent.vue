<template>
    <div class="certificatesContainer">
        <h3 class="certificatesContainer__header">
            Certyfikaty i testy
            <span class="numOfCerts">{{ certsList.length }}</span>
        </h3>
        <ul class="certificatesContainer__list">
            <certs-component
                v-for="cert in certsList"
                :key="cert.id"
                :document-link="cert.documentLink"
                :name="cert.name"
                :type-of-doc="cert.typeOfDoc" />
        </ul>
    </div>
</template>

<script setup>
    import CertsComponent from './CertsComponent.vue';
    import { ref } from 'vue';

    const certsList = ref([
        {
            name: 'Szczepienie przeciwko COVID-19',
            documentLink: 'https://google.com',
            typeOfDoc: 'vacc',
            id: 1,
        },

        {
            name: 'Szczepienie przeciwko COVID-19',
            documentLink: 'https://google.com',
            typeOfDoc: 'vacc',
            id: 2,
        },

        {
            name: 'Szczepienie przeciwko COVID-19',
            documentLink: 'https://google.com',
            typeOfDoc: 'medicForm',
            id: 3,
        },
        {
            name: 'Szczepienie przeciwko COVID-19',
            documentLink: 'https://google.com',
            typeOfDoc: 'vacc',
            id: 29,
        },
    ]);
</script>

<style lang="scss" scoped>
    .certificatesContainer {
        width: 100%;
        height: 20vh;
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
