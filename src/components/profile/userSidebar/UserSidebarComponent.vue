<template>
    <div class="userInfoWrapper">
        <div class="userAvatar">
            <user-avatar-component />
            <h4
                :aria-label="'Imię i nazwisko: ' + name + ' ' + surname"
                tabindex="0">
                {{ name }} {{ surname }}
            </h4>
        </div>
        <div class="userData">
            <user-info-list-component />
        </div>
    </div>
</template>

<script setup>
    import UserAvatarComponent from './UserAvatarComponent.vue';
    import useUserStore from '../../../stores/userStore.js';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    import UserInfoListComponent from './UserInfoListComponent.vue';

    const userStore = useUserStore();
    const { getUserInfo } = storeToRefs(userStore);
    const name = ref(getUserInfo.value.data[0].name);
    const surname = ref(getUserInfo.value.data[0].surname);
</script>

<style lang="scss" scoped>
    .userInfoWrapper {
        @include flex-position(column, nowrap, space-evenly, center);
        height: 100vh;
        background-color: $blue-700;
        padding: 1rem;
        width: 35vh;
        box-sizing: border-box;
        border-top-left-radius: $border-radius--rounded;
        border-bottom-left-radius: $border-radius--rounded;

        .userAvatar {
            @include flex-position(column, nowrap, space-between, center);
            height: 30%;
            width: 100%;

            h4 {
                @include text-header4();
                color: $white;
                text-align: center;
            }
        }

        .userData {
            width: 100%;
            height: 70%;
        }
    }

    //    Media queries
    @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
        .userInfoWrapper {
            padding: 1rem;

            .userAvatar {
                width: 50%;
                height: 25%;
                align-self: flex-start;
                margin-left: 1rem;
            }
        }
    }
</style>
