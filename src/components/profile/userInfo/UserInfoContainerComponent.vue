<template>
    <section class="userInfoContainer">
        <user-info-box-component>
            <template v-slot:importIssues>
                <button-component
                    aria-label="Dodaj informację"
                    class="importBtn"
                    minor
                    @click="importUserIssueInfo = true">
                    <font-awesome-icon
                        alt="add item icon"
                        aria-label="add item icon"
                        icon="fa-solid fa-plus" />
                </button-component>
                <teleport to="body">
                    <transition name="modal">
                        <div
                            v-if="importUserIssueInfo"
                            class="modal">
                            <modal-component
                                ref="modalUserIssue"
                                @close="importUserIssueInfo = false">
                                <user-issues-form-component />
                            </modal-component>
                        </div>
                    </transition>
                </teleport>
            </template>

            <template v-slot:userIssueList>
                <info-handler-component />
            </template>
        </user-info-box-component>

        <user-info-box-component header="Lista osób bliskich">
            <template v-slot:importIssues>
                <button-component
                    aria-label="Dodaj kontakt"
                    class="importBtn"
                    minor
                    @click="importContact = true">
                    <font-awesome-icon
                        alt="add item icon"
                        aria-label="add item icon"
                        icon="fa-solid fa-plus" />
                </button-component>

                <teleport to="body">
                    <transition name="modal">
                        <div
                            v-if="importContact"
                            class="modal">
                            <modal-component
                                ref="modalUserContacts"
                                @close="importContact = false">
                                <user-contact-form-component />
                            </modal-component>
                        </div>
                    </transition>
                </teleport>
            </template>

            <template v-slot:userIssueList>
                <info-contact-component />
            </template>
        </user-info-box-component>
    </section>
</template>

<script setup>
    import UserInfoBoxComponent from './UserInfoBoxComponent.vue';
    import InfoHandlerComponent from './InfoHandlerComponent.vue';
    import InfoContactComponent from './InfoContactComponent.vue';
    import ButtonComponent from '../../ButtonComponent.vue';
    import ModalComponent from '../../ModalComponent.vue';
    import UserIssuesFormComponent from './UserIssuesFormComponent.vue';

    import { ref } from 'vue';
    import { onClickOutside } from '@vueuse/core';
    import UserContactFormComponent from './UserContactFormComponent.vue';

    const importUserIssueInfo = ref(false);
    const modalUserIssue = ref(null);
    const importContact = ref(false);
    const modalUserContacts = ref(null);

    onClickOutside(modalUserIssue, () => (importUserIssueInfo.value = false));
    onClickOutside(modalUserContacts, () => (importContact.value = false));
</script>

<style lang="scss" scoped>
    .userInfoContainer {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        place-content: flex-start;
        gap: 2%;
        padding: 1rem 0 1rem 0;
    }

    //    Media queries
    @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
        .userInfoContainer {
            grid-template-columns: 1fr;
            place-items: flex-start;
            height: 90vh;
        }
    }
</style>
