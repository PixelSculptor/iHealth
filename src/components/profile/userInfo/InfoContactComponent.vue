<template>
    <ul
        v-if="getUserContacts"
        class="dataList">
        <user-info-label-component
            v-for="contact in getUserContacts"
            :key="contact.phoneNumber"
            class="contact">
            <contact-avatar-component />
            <h6>{{ contact.nameAndSurname }}</h6>
            <p>{{ contact.phoneNumber }}</p>
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
