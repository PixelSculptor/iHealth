<template>
    <div class="box">
        <font-awesome-icon
            icon="fa-solid fa-xmark"
            role="button"
            tabindex="0"
            @click="closeModal"
            @keyup.enter="clickEnter" />
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
    const clickEnter = () => {
        emit('close');
    };
</script>

<style lang="scss" scoped>
    .box {
        min-height: 60vh;
        width: 60vw;
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
            &:focus-visible,
            &:focus {
                border-radius: 50%;
                outline: dashed $blue-900;
                outline-offset: 0.5rem;
                outline-width: 0.15rem;
            }
        }
        &__customContent {
            grid-area: custom;
        }
    }
    //    Media queries
    @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
        .box {
            height: 70vh;
            width: 95vw;
        }
    }
</style>
