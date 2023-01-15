<template>
    <section class="prescription">
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
                            <prescription-add-component />
                        </modal-component>
                    </div>
                </transition>
            </teleport>

            <button-component
                class="prescription__make_visit"
                @click="openModalImport = true">
                Importuj receptę
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button-component>

            <teleport to="body">
                <transition name="modal">
                    <div
                        v-if="openModalImport"
                        class="modal">
                        <modal-component
                            ref="modalImport"
                            @close="openModalImport = false">
                            <prescrition-import />
                        </modal-component>
                    </div>
                </transition>
            </teleport>
        </div>
        <article class="prescription__listOf">
            <prescription-group-component />
        </article>
        <article class="prescription__import">
            <import-group-component />
        </article>
        <aside class="prescription__userInfo">
            <user-sidebar-component />
        </aside>
    </section>
</template>

<script setup>
    import ButtonComponent from '../components/ButtonComponent.vue';
    import useUserStore from '../stores/userStore.js';
    import ModalComponent from '../components/ModalComponent.vue';
    import PrescriptionGroupComponent from '../components/prescriptions/PrescriptionGroupComponent.vue';
    import GreetingsComponent from '../components/GreetingsComponent.vue';
    import PrescriptionAddComponent from '../components/prescriptions/PrescriptionAddComponent.vue';
    import PrescritionImport from '../components/prescriptions/PrescritionImport.vue';
    import ImportGroupComponent from '../components/prescriptions/ImportGroupComponent.vue';
    import UserSidebarComponent from '../components/profile/userSidebar/UserSidebarComponent.vue';

    import { onMounted, ref } from 'vue';
    import { onClickOutside } from '@vueuse/core';

    const userStore = useUserStore();
    const openModalPrescription = ref(false);
    const openModalImport = ref(false);
    const modalPrescription = ref(null);
    const modalImport = ref(null);

    onClickOutside(
        modalPrescription,
        () => (openModalPrescription.value = false)
    );
    onClickOutside(modalImport, () => (openModalImport.value = false));

    onMounted(async () => {
        await userStore.fetchUserData();
        await userStore.fetchPatientPrescriptions();
        await userStore.fetchPatientImportPrescriptions();
    });
</script>
<style scoped lang="scss">
    .prescription {
        display: grid;
        place-items: flex-start;
        height: 100vh;
        width: 100%;
        grid-template-areas:
            'dashboard dashboard dashboard dashboard dashboard dashboard dashboard sidebar'
            'actions actions actions actions actions actions actions sidebar'
            'listof listof listof listof listof listof listof sidebar'
            'import import import import import import import sidebar'
            'import import import import import import import sidebar';
        &__header {
            height: 50%;
            grid-area: dashboard;
            @include text-header1($font-weight-semiBold);
            color: $blue-900;
            place-self: center flex-start;
        }
        &__actions {
            grid-area: actions;
            place-self: flex-start;
            gap: 2rem;
            @include flex-position(row, nowrap, flex-start, center);
        }
        &__listOf {
            grid-area: listof;
            place-self: flex-start;
        }
        &__import {
            grid-area: import;
            place-self: flex-start;
        }
        &__userInfo {
            grid-area: sidebar;
            background-color: $blue-700;
            height: 100vh;
            width: 35vh;
            place-self: flex-end;
            box-sizing: border-box;
            border-top-left-radius: $border-radius--rounded;
            border-bottom-left-radius: $border-radius--rounded;
        }
    }
</style>
