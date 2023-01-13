<template>
    <div class="greeting">
        <h2>Cześć {{ name }}!</h2>
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

<style lang="scss" scoped>
    .greeting {
        h2 {
            @include text-header2($font-weight-bold);
            color: $blue-900;
        }
    }
</style>
