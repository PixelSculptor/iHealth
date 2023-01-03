<template>
    <div class="certificatesContainer">
        <h3 class="certificatesContainer__header">
            Certyfikaty i testy <span class="numOfCerts">(liczba)</span>
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
    * {
        margin: 0;
    }
</style>
