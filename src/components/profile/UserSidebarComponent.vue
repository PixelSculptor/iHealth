<template>
    <div class="userInfoWrapper">
        <div class="userAvatar">
            <user-avatar-component />
            <h6>{{ name }} {{ surname }}</h6>
        </div>
    </div>
</template>

<script setup>
    import UserAvatarComponent from './UserAvatarComponent.vue';
    import useUserStore from '../../stores/userStore.js';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';

    const userStore = useUserStore();
    const { getUserInfo } = storeToRefs(userStore);

    const name = ref(getUserInfo.value.data[0].name);
    const surname = ref(getUserInfo.value.data[0].surname);
</script>

<style lang="scss" scoped>
    .userInfoWrapper {
        height: 100vh;
        width: 100%;
        .userAvatar {
        }
    }
</style>
