<template>
    <section class="userInfoContainer">
        <user-info-box-component>
            <info-handler-component />
        </user-info-box-component>

        <user-info-box-component header="Lista osób bliskich">
            <info-contact-component />
        </user-info-box-component>
    </section>
</template>

<script setup>
    import UserInfoBoxComponent from './UserInfoBoxComponent.vue';
    import InfoHandlerComponent from './InfoHandlerComponent.vue';
    import InfoContactComponent from './InfoContactComponent.vue';
</script>

<style lang="scss" scoped>
    .userInfoContainer {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        place-content: flex-start;
        gap: 5%;
        padding: 1rem 0 1rem 0;
    }
</style>
