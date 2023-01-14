<template>
    <section
        v-if="getUserInfo.data"
        class="prescription">
        <div prescriptionDashboards>
            <div class="prescription__header">
                <greetings-component />
            </div>
            <div class="prescription__actions">
                <button-component
                    class="prescription__make_visit"
                    @click="openModalPrescription = true">
                    Dodaj receptę
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </button-component>

                <teleport to="body">
                    <transition name="modal">
                        <div
                            v-if="openModalPrescription"
                            class="modal">
                            <modal-component
                                ref="modalPrescription"
                                @close="openModalPrescription = false">
                                <prescription-button-component />
                            </modal-component>
                        </div>
                    </transition>
                </teleport>
            </div>
            <article class="prescription__listOf">
                <prescription-group-component />
            </article>
        </div>
    </section>
</template>

<script setup>
    import ButtonComponent from '../components/ButtonComponent.vue';
    import useUserStore from '../stores/userStore.js';
    import ModalComponent from '../components/dashboard/ModalComponent.vue';
    import PrescriptionGroupComponent from '../components/prescriptions/PrescriptionGroupComponent.vue';
    import GreetingsComponent from '../components/GreetingsComponent.vue';
    import PrescriptionButtonComponent from '../components/prescriptions/PrescriptionButtonComponent.vue';

    import { onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { onClickOutside } from '@vueuse/core';

    const userStore = useUserStore();
    const { getUserInfo } = storeToRefs(userStore);
    const openModalPrescription = ref(false);
    const modalPrescription = ref(null);

    onClickOutside(
        modalPrescription,
        () => (openModalPrescription.value = false)
    );

    onMounted(async () => {
        await userStore.fetchUserData();
        await userStore.fetchPatientPrescriptions();
    });
</script>
<style scoped lang="scss">
    .prescription {
        position: relative;
        width: 100%;
        display: grid;
        place-items: start;
        grid-template-areas:
            'dashboard' 'dashboard' 'dashboard'
            'listOf' 'listOf' 'listOf'
            'listOf' 'listOf' 'listOf';
        margin-inline: 2em;
        &__header {
            grid-area: dashboard;
            @include text-header1($font-weight-semiBold);
            color: $blue-900;
            place-self: center flex-start;
        }
        &__lower {
            grid-area: dashboard;
            @include text-header6($font-weight-medium);
            color: $gray-500;
            place-self: center flex-start;
        }
        &__actions {
            grid-area: actions;
            place-self: centerflex-start;
            width: 100%;
            gap: 50rem;
            @include flex-position(row, nowrap, flex-start, center);
            margin: 20px;
        }
        &__listOf {
            grid-area: listOf;
            width: 100%;
            height: 10vh;
            display: grid;
        }
    }
</style>
