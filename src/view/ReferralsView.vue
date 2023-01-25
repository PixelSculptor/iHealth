<template>
    <section class="referrals">
        <div class="referrals__header">
            <greetings-component />
        </div>
        <div class="referrals__actions">
            <button-component
                class="referrals__make_visit"
                @click="openModalReferrals = true">
                Dodaj skierowanie
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button-component>

            <teleport to="body">
                <transition name="modal">
                    <div
                        v-if="openModalReferrals"
                        class="modal">
                        <modal-component
                            ref="modalReferrals"
                            @close="openModalReferrals = false">
                            <referrals-component />
                        </modal-component>
                    </div>
                </transition>
            </teleport>

            <button-component
                class="referrals__make_visit"
                @click="openModalImportReferrals = true">
                Importuj skierowanie
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button-component>

            <teleport to="body">
                <transition name="modal">
                    <div
                        v-if="openModalImportReferrals"
                        class="modal">
                        <modal-component
                            ref="modalImportReferrals"
                            @close="openModalImportReferrals = false">
                            <import-referrals-component />
                        </modal-component>
                    </div>
                </transition>
            </teleport>
        </div>
        <article class="referrals__listOf">
            <referrals-group-component />
        </article>
        <article class="referrals__import">
            <import-referrals-group-component />
        </article>
        <aside class="referrals__userInfo">
            <user-sidebar-component />
        </aside>
    </section>
</template>

<script setup>
    import ButtonComponent from '../components/ButtonComponent.vue';
    import useUserStore from '../stores/userStore.js';
    import ModalComponent from '../components/ModalComponent.vue';
    import GreetingsComponent from '../components/GreetingsComponent.vue';
    import UserSidebarComponent from '../components/profile/userSidebar/UserSidebarComponent.vue';
    import ImportReferralsComponent from '../components/referrals/ImportReferralsComponent.vue';
    import ReferralsComponent from '../components/referrals/ReferralsComponent.vue';
    import ReferralsGroupComponent from '../components/referrals/ReferralsGroupComponent.vue';
    import ImportReferralsGroupComponent from '../components/referrals/ImportReferralsGroupComponent.vue';

    import { onMounted, ref } from 'vue';
    import { onClickOutside } from '@vueuse/core';

    const userStore = useUserStore();
    const openModalReferrals = ref(false);
    const openModalImportReferrals = ref(false);
    const modalReferrals = ref(null);
    const modalImportReferrals = ref(null);

    onClickOutside(modalReferrals, () => (openModalReferrals.value = false));

    onClickOutside(
        modalImportReferrals,
        () => (openModalImportReferrals.value = false)
    );

    onMounted(async () => {
        await userStore.fetchUserData();
        await userStore.fetchPatientReferrals();
        await userStore.fetchPatientImportReferrals();
    });
</script>
<style scoped lang="scss">
    .referrals {
        display: grid;
        place-items: flex-start;
        height: 100vh;
        width: 100%;
        gap: 2%;
        margin-inline: 2rem;
        grid-template-areas:
            'dashboard dashboard dashboard dashboard dashboard dashboard dashboard sidebar'
            'actions actions actions actions actions actions actions sidebar'
            'listof listof listof listof listof listof listof sidebar'
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
            place-self: space-between;
            width: 50%;
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
        //TODO: Kacper will make changes in component UserInfo so he need to in the future change styles here.

        @media (max-width: $tablet-width) {
            &__header {
                height: 50%;
                width: 70%;
                grid-area: dashboard;
                @include text-header1($font-weight-semiBold);
                color: $blue-900;
                display: flex;
                align-content: center;
                justify-content: flex-start;
                margin-left: 5rem;
            }
            &__actions {
                grid-area: actions;
                place-self: space-between;
                width: 70%;
                gap: 2rem;
                margin-left: 5rem;
                @include flex-position(row, nowrap, flex-start, center);
            }
            &__userInfo {
                display: none;
            }
        }

        @media (max-width: $laptop-width) {
            &__header {
                height: 50%;
                width: 70%;
                grid-area: dashboard;
                @include text-header1($font-weight-semiBold);
                color: $blue-900;
                display: flex;
                align-content: center;
                justify-content: flex-start;
            }
            &__actions {
                grid-area: actions;
                place-self: space-between;
                width: 70%;
                gap: 2rem;
                @include flex-position(row, nowrap, flex-start, center);
            }
            &__userInfo {
                display: none;
            }
        }
    }
</style>
