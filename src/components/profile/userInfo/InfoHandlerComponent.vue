<template>
    <ul class="dataList">
        <user-info-label-component
            v-for="userIssue in userIssues"
            :key="userIssue.label">
            <user-issue-icon-component
                :icon-background="userIssue.type"
                :icon-name="userIssue.class" />
            <h6>{{ userIssue.label }}</h6>
            <span>{{ userIssue.userData }}</span>
        </user-info-label-component>
    </ul>
</template>

<script setup>
    import UserInfoLabelComponent from './UserInfoLabelComponent.vue';
    import UserIssueIconComponent from './UserIssueIconComponent.vue';

    import { userIssues } from '../../../utils/userIssues.js';
    import useUserStore from '../../../stores/userStore.js';
    import { onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    const userStore = useUserStore();
    const { getUserIssues } = storeToRefs(userStore);

    onMounted(() => {
        if (getUserIssues.value[0]) {
            for (const [key, value] of Object.entries(getUserIssues.value[0])) {
                const userIssue = ref(
                    userIssues.value.find(({ issueKey }) => issueKey === key)
                );
                if (userIssue.value && value) {
                    userIssue.value.userData = value;
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
    .dataList {
        height: 100%;
    }
</style>
