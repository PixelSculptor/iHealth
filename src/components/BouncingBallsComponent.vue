<template>
    <div
        v-show="visible"
        class="bouncer">
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
    </div>
</template>

<script setup>
    defineProps({
        visible: {
            type: Boolean,
            default: false,
        },
    });
</script>

<style scoped lang="scss">
    .bouncer {
        width: 6.25rem;
        height: 6.25rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        & > div {
            background-color: $blue-700;
            width: 1.25rem;
            height: 1.2rem;
            border-radius: 50%;
            animation: bouncing 0.5s cubic-bezier(0.19, 0.57, 0.3, 0.98)
                infinite alternate;
        }
        & div:nth-child(2) {
            animation-delay: 0.1s;
            background-color: $blue-500;
        }
        & div:nth-child(3) {
            animation-delay: 0.2s;
            background-color: $blue-300;
        }
        & div:nth-child(4) {
            animation-delay: 0.3s;
            background-color: $blue-100;
        }
    }

    @keyframes bouncing {
        from {
            transform: translateY(0rem);
        }
        to {
            transform: translateY(-3.25rem);
        }
    }
</style>
