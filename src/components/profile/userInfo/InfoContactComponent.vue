<template>
    <ul
        v-if="getUserContacts"
        class="dataList">
        <user-info-label-component
            v-for="contact in getUserContacts"
            :key="contact.phoneNumber"
            class="contact">
            <contact-avatar-component />
            <h6
                :aria-label="'Imię i nazwisko: ' + contact.nameAndSurname"
                tabindex="0">
                {{ contact.nameAndSurname }}
            </h6>
            <p
                :aria-label="'Telefon kontaktowy: ' + contact.phoneNumber"
                tabindex="0">
                {{ contact.phoneNumber }}
            </p>
            <relation-tag-pill-component :rel-type="contact.relationshipType" />
        </user-info-label-component>
    </ul>
</template>

<script setup>
    import UserInfoLabelComponent from './UserInfoLabelComponent.vue';
    import useUserStore from '../../../stores/userStore.js';
    import { storeToRefs } from 'pinia';
    import ContactAvatarComponent from './ContactAvatarComponent.vue';
    import RelationTagPillComponent from './RelationTagPillComponent.vue';

    const userStore = useUserStore();
    const { getUserContacts } = storeToRefs(userStore);
</script>

<style lang="scss" scoped>
    .dataList {
        height: 100%;
        gap: 1rem;
        .contact {
            gap: 0.5rem;
            padding-inline: 0.5rem;
            &:deep(h6) {
                text-align: center;
            }
        }
    }
</style>
