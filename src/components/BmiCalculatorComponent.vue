<template>
    <section class="bmi-calculator">
        <h3>Body mass index</h3>
    </section>
</template>

<script setup>
    import useUserStore from '../stores/userStore.js';
    import getUserData from '../composables/getUserData.js';
    const userStore = useUserStore();
    const { documents } = getUserData('userProfile', userStore.getUserId);
    console.log(documents.value);
</script>

<style scoped lang="scss"></style>
