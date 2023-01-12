<template>
    <section
        v-if="getUserInfo.data"
        class="prescription">
        <div prescriptionDashboards>
            <h1 class="prescription__header">Cześć, {{ name }}!</h1>
            <h6 class="prescription__lower">{{ currentData }}</h6>
            <div class="prescription__actions">
                <teleport to="body">
                    <transition name="modal">
                        <div
                            v-if="openModal"
                            class="modal">
                            <modal-component
                                ref="modal"
                                @close="openModal = false" />
                        </div>
                    </transition>
                </teleport>
                <button-component
                    class="prescription__make_visit"
                    @click="openModal = true">
                    Dodaj recznie recepte
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </button-component>
            </div>
            <article class="prescription__listOf">
                <prescription-group-component />
            </article>
        </div>
    </section>
</template>

<script setup>
    import ButtonComponent from '../components/ButtonComponent.vue';
    import PrescriptionGroupComponent from '../components/PrescriptionGroupComponent.vue';
    import useUserStore from '../stores/userStore.js';
    import ModalComponent from '../components/ModalComponent.vue';

    import { onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { currentDate } from '../utils/currentData.js';
    import { onClickOutside } from '@vueuse/core';

    const userStore = useUserStore();
    const { getUserInfo } = storeToRefs(userStore);
    const name = ref(userStore.getUserInfo.data[0].name);
    const openModal = ref(false);
    const modal = ref(null);
    const currentData = currentDate();

    onClickOutside(modal, () => (openModal.value = false));

    onMounted(async () => {
        await userStore.fetchUserData();
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
            height: 50vh;
            display: grid;
            grid-template-columns: repeat(1, 1fr);
        }
    }
</style>
