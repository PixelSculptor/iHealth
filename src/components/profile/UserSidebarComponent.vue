<template>
    <div class="userInfoWrapper">
        <div class="userAvatar">
            <user-avatar-component />
            <h5>{{ name }} {{ surname }}</h5>
        </div>
        <div class="userData">
            <user-info-list-component />
        </div>
    </div>
</template>

<script setup>
    import UserAvatarComponent from './UserAvatarComponent.vue';
    import useUserStore from '../../stores/userStore.js';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    import UserInfoListComponent from './UserInfoListComponent.vue';

    const userStore = useUserStore();
    const { getUserInfo } = storeToRefs(userStore);
    const name = ref(getUserInfo.value.data[0].name);
    const surname = ref(getUserInfo.value.data[0].surname);
    // TODO: change further flex-start -> space-evenly
</script>

<style lang="scss" scoped>
    .userInfoWrapper {
        @include flex-position(column, nowrap, flex-start, center);
        height: 100vh;
        width: 100%;
        padding: 1rem;

        .userAvatar {
            @include flex-position(column, nowrap, space-evenly, center);
            height: 30%;
            width: 100%;

            h5 {
                @include text-header5();
                color: $white;
            }
        }

        .userData {
            width: 100%;
            height: 70%;
        }
    }
</style>
