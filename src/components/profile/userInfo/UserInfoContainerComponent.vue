<template>
    <section class="userInfoContainer">
        <user-info-box-component>
            <template v-slot:importIssues>
                <button-component
                    class="importBtn"
                    minor
                    @click="importInfo = true">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </button-component>
                <teleport to="body">
                    <transition name="modal">
                        <div
                            v-if="importInfo"
                            class="modal">
                            <modal-component
                                ref="modalResearch"
                                @close="importInfo = false">
                                <resource-component />
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
                    class="importBtn"
                    minor>
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </button-component>
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
    import ResourceComponent from '../../dashboard/ResourceComponent.vue';
    import ModalComponent from '../../ModalComponent.vue';
    import { ref } from 'vue';

    const importInfo = ref(false);
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
</style>
