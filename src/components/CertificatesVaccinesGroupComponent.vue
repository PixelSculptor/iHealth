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
    ]);
</script>

<style lang="scss" scoped>
    .certificatesContainer {
        border: 2px solid green;
        width: 100%;
        height: 100%;
        @include flex-position(column, nowrap, flex-start, flex-start);
        gap: 1rem;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
            @include flex-position(row, nowrap, flex-start, center);
            gap: 1rem;
            .numOfCerts {
                display: inline-block;
                width: 2.5rem;
                height: 2.5rem;
                @include text-header4();
                text-align: center;
                background-color: $white;
                border: $border-size solid $gray-300;
                border-radius: 50%;
            }
        }
        &__list {
            overflow-y: scroll;
        }
    }
</style>
