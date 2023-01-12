<template>
    <section class="profileView">
        <div class="profileView__header">
            <greetings-component />
        </div>

        <article class="profileView__userDescription">
            <!--        TODO: add components your info, close people specific information -->
        </article>
        <aside class="profileView__userInfo">
            <user-sidebar-component />
        </aside>
    </section>
</template>

<script setup>
    import UserSidebarComponent from '../components/profile/UserSidebarComponent.vue';
    import useUserStore from '../stores/userStore.js';
    import GreetingsComponent from '../components/GreetingsComponent.vue';

    const userStore = useUserStore(); // eslint-disable-line no-unused-vars
</script>

<style lang="scss" scoped>
    .profileView {
        display: grid;
        grid-template: repeat(11, 1fr) / repeat(11, 1fr);
        &__header {
            grid-column: 1 / span 11;
            grid-row: 1/2;
            height: 30%;
        }
        &__userDescription {
            grid-column: 1 / span 11;
            grid-row: 2 / span -1;
            height: 70%;
        }
        &__userInfo {
            grid-column: 10 / span 2;
            grid-row: 1 / span 11;
            background-color: $blue-700;
            height: 100vh;
            width: 35vh;
            place-self: flex-end;
            box-sizing: border-box;
            border-top-left-radius: $border-radius--rounded;
            border-bottom-left-radius: $border-radius--rounded;
        }
    }
</style>
