<template>
    <ul class="dataList">
        <user-info-label-component
            v-for="userIssue in userIssues"
            :key="userIssue.label">
            <user-issue-icon-component
                :icon-background="userIssue.type"
                :icon-name="userIssue.class" />
            <h6>{{ userIssue.label }}</h6>
            <span></span>
        </user-info-label-component>
    </ul>
</template>

<script setup>
    import UserInfoLabelComponent from './UserInfoLabelComponent.vue';
    import UserIssueIconComponent from './UserIssueIconComponent.vue';

    import { userIssues } from '../../../utils/userIssues.js';
</script>

<style lang="scss" scoped>
    .dataList {
        height: 100%;
    }
</style>
