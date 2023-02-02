<template>
    <div class="greeting">
        <h2 tabindex="0">Cześć {{ name }}!</h2>
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

    @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
        .greeting {
            padding: 1rem 0 0 1rem;
            h2 {
                font-size: $font-heading2--tablets;
            }
        }
    }
</style>
