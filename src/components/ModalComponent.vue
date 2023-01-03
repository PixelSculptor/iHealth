<template>
    <div class="box">
        <font-awesome-icon
            @click="closeModal"
            icon="fa-solid fa-xmark" />
        <h1>Modal</h1>
    </div>
</template>

<script setup>
    const emit = defineEmits(['close']);
    const closeModal = () => {
        emit('close');
    };
</script>

<style scoped lang="scss">
    .box {
        min-height: auto;
        min-width: 50vw;
        background-color: $white;
        padding: 3rem;
        border-radius: $border-radius--rounded;
        &:deep(svg) {
            cursor: pointer;
            height: 3rem;
            transition: color 0.3s ease-out;
            &:hover {
                color: $blue-500;
            }
        }
    }
</style>
