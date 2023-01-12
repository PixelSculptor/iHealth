<template>
    <div class="greeting">
        <h3>Cześć {{ name }}!</h3>
        <date-component />
    </div>
</template>

<script setup>
    import useUserStore from '../stores/userStore.js';
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue';
    import DateComponent from './DateComponent.vue';

    const userStore = useUserStore(); // eslint-disable-line no-unused-vars
    const { getUserInfo } = storeToRefs(userStore);
    const name = ref(getUserInfo.value.data[0].name);
</script>

<style lang="scss" scoped></style>
