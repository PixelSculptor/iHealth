<template>
    <section class="profileView">
        <article class="profileView__header">
            <greetings-component />
        </article>

        <article class="profileView__userDescription">
            <user-info-container-component />
        </article>
        <aside class="profileView__userInfo">
            <user-sidebar-component />
        </aside>
    </section>
</template>

<script setup>
    import UserSidebarComponent from '../components/profile/userSidebar/UserSidebarComponent.vue';
    import GreetingsComponent from '../components/GreetingsComponent.vue';
    import UserInfoContainerComponent from '../components/profile/userInfo/UserInfoContainerComponent.vue';

    import useUserStore from '../stores/userStore.js';
    import { onBeforeMount } from 'vue';

    const userStore = useUserStore(); // eslint-disable-line no-unused-vars
    onBeforeMount(async () => {
        await userStore.fetchUserIssues();
        await userStore.fetchUserContacts();
    });
</script>

<style lang="scss" scoped>
    .profileView {
        background-color: $white;
        display: grid;
        grid-template-areas:
            'header header header header header header header sidebar'
            'info info info info  info info info sidebar'
            'info info info info info info info sidebar'
            'info info info info info info info sidebar'
            'info info info info info info info sidebar';
        margin-left: 1rem;
        &__header {
            height: 50%;
            grid-area: header;
            place-self: center flex-start;
            @include flex-position(column, nowrap, space-evenly, flex-start);
        }
        &__userDescription {
            grid-area: info;
            height: 100%;
            margin-right: 2rem;
        }
        &__userInfo {
            grid-area: sidebar;
            height: 100vh;
            place-self: center flex-end;
        }
    }

    @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
        .profileView {
            grid-template-areas:
                'header header header sidebar'
                'info info info sidebar'
                'info info info sidebar'
                'info info info sidebar'
                'info info info sidebar';
            &__userInfo {
                place-self: flex-start;
            }
        }
    }
</style>
