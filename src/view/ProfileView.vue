<template>
    <section class="profileView">
        <div class="profileView__header">
            <h3>Cześć Jan!</h3>
            <date-component />
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
    import DateComponent from '../components/DateComponent.vue';
    import UserSidebarComponent from '../components/profile/UserSidebarComponent.vue';
</script>

<style lang="scss" scoped>
    .profileView {
        display: grid;
        grid-template-areas:
            'header header user'
            'user-data user-data user'
            'user-data user-data user'
            'user-data user-data user'
            'user-data user-data user'
            'user-data user-data user'
            'user-data user-data user'
            'user-data user-data user'
            'user-data user-data user'
            'user-data user-data user'
            'user-data user-data user';
        &__header {
            grid-area: header;
            height: 30%;
        }
        &__userDescription {
            grid-area: user-data;
            height: 70%;
        }
        &__userInfo {
            grid-area: user;
            background-color: $blue-700;
            height: 100vh;
            border-top-left-radius: $border-radius--rounded;
            border-bottom-left-radius: $border-radius--rounded;
        }
    }
</style>
