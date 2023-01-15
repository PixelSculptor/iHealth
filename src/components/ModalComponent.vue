<template>
    <div class="box">
        <font-awesome-icon
            icon="fa-solid fa-xmark"
            role="button"
            tabindex="0"
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
        min-height: 60vh;
        min-width: 50vw;
        background-color: $white;
        padding: 2rem;
        border-radius: $border-radius--rounded;
        display: grid;
        grid-template-areas:
            '- - closebtn'
            'custom custom custom';
        grid-template-rows: 1fr 90%;
        &:deep(svg) {
            cursor: pointer;
            height: 3rem;
            transition: all 0.2s ease-in-out;
            grid-area: closebtn;
            place-self: flex-start flex-end;
            &:hover {
                color: $blue-700;
                transform: scale(1.1);
            }
            &:focus-visible {
                border-radius: 50%;
                outline: dashed $blue-300;
                outline-offset: 0.3rem;
                outline-width: 0.15rem;
            }
        }
        &__customContent {
            grid-area: custom;
        }
    }
</style>
