<template>
    <section class="prescription-container">
        <div class="prescriptionContainer">
            <h3 class="prescriptionContainer__header">
                Recepty
                <span class="numOfPres">{{ prescriptionsList?.length }}</span>
            </h3>
            <ul class="prescriptionContainer__list">
                <prescription-component
                    v-for="presc in prescriptionsList"
                    :key="presc.id"
                    :document-link="presc.documentLink"
                    :name="presc.name"
                    :date="presc.date"
                    :type-of-doc="presc.typeOfDoc"
                    :specialization="presc.specialization" />
            </ul>
        </div>
    </section>
</template>

<script setup>
    import PrescriptionComponent from '../components/PrescriptionComponent.vue';
    import { storeToRefs } from 'pinia';
    import useUserStore from '../stores/userStore.js';
    import { onMounted, computed } from 'vue';

    const userStore = useUserStore();

    onMounted(async () => {
        await userStore.fetchListOfRecipies();
    });

    const { getListOfRecipies } = storeToRefs(userStore);

    const prescriptionsList = computed(() => {
        return getListOfRecipies?.value;
    });
</script>

<style lang="scss" scoped>
    .prescriptionContainer {
        width: 100%;
        height: 20vh;
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
