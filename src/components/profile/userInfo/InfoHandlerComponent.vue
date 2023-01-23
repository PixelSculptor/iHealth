<template>
    <ul class="dataList">
        <user-info-label-component
            v-for="userIssue in userIssues"
            :key="userIssue.label"
            :aria-label="userIssue.label">
            <user-issue-icon-component
                :aria-labelledby="userIssue.label"
                :icon-background="userIssue.type"
                :icon-name="userIssue.class" />
            <h6>{{ userIssue.label }}</h6>
            <p
                :aria-label="userIssue.userData"
                tabindex="0">
                {{ userIssue.userData }}
            </p>
        </user-info-label-component>
    </ul>
</template>

<script async setup>
    import UserInfoLabelComponent from './UserInfoLabelComponent.vue';
    import UserIssueIconComponent from './UserIssueIconComponent.vue';

    import useUserStore from '../../../stores/userStore.js';
    import { ref, watchEffect } from 'vue';
    import { storeToRefs } from 'pinia';
    import userIssues from '../../../utils/userIssues.js';

    const userStore = useUserStore();
    const { getUserIssues } = storeToRefs(userStore);
    const bloodType = ref(null);
    const diabetes = ref(null);
    const allergies = ref(null);
    const isOrganDonor = ref(false);
    const isBloodDonor = ref(false);

    // TODO: to investigate this algorithm
    // if (!!getUserIssues.value[0]){
    //   // console.log(getUserIssues.value[0])
    //   console.log('perpare');
    //   for (const [key, value] of Object.entries(getUserIssues[0])) {
    //     console.log(key, value);
    //     const userIssue = ref(
    //         userIssues.value.find(({ issueKey }) => issueKey === key)
    //     );
    //     if (userIssue.value && value) {
    //       userIssue.value.userData = value;
    //     }
    //   }
    // }

    watchEffect(getUserIssues, () => {
        bloodType.value = getUserIssues.value[0].bloodType;
        allergies.value = getUserIssues.value[0].allergies;
        diabetes.value = getUserIssues.value[0].diabetes;
        isOrganDonor.value = getUserIssues.value[0].isOrganDonor;
        isBloodDonor.value = getUserIssues.value[0].isBloodDonor;

        userIssues.value[0].userData = bloodType.value;
        userIssues.value[1].userData = allergies.value || 'Brak';
        userIssues.value[2].userData = diabetes.value || 'Brak';
        userIssues.value[3].userData = isOrganDonor.value || 'Nie';
        userIssues.value[4].userData = isBloodDonor.value || 'Nie';
    });
</script>

<style lang="scss" scoped>
    .dataList {
        height: 100%;
    }
</style>
