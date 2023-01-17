<template>
    <div class="">
        <h1>Visits view</h1>
        <v-date-picker
            v-model="date"
            color="indigo"
            is-expanded
            is-range />
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';

    const date = ref(new Date());
    watch(date, () => {
        console.log(date.value);
    });
</script>

<style lang="scss" scoped>
    * {
    }
</style>
