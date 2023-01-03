<template>
    <div class="box">
        <font-awesome-icon
            icon="fa-solid fa-xmark"
            role="button"
            @click="closeModal" />
        <div class="box__customContent">
            <slot />
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(['close']);
    const closeModal = () => {
        emit('close');
    };
</script>

<style lang="scss" scoped>
    .box {
        min-height: 50%;
        min-width: 50vw;
        background-color: $white;
        padding: 3rem;
        border-radius: $border-radius--rounded;
        display: grid;
        grid-template-areas:
            '- - closebtn'
            'custom custom custom';
        &:deep(svg) {
            cursor: pointer;
            height: 3rem;
            transition: all 0.2s ease-in-out;
            grid-area: closebtn;
            place-self: flex-start flex-end;
            &:hover {
                color: $blue-500;
                transform: scale(1.1);
            }
        }
        &__customContent {
            grid-area: custom;
        }
    }
</style>
