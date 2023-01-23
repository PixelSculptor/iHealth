<template>
    <div
        class="avatar"
        tabindex="0">
        <div
            ref="avatar"
            aria-label="Awatar profilu"
            class="avatar__img"></div>
    </div>
</template>

<script setup>
    import useUserStore from '../../../stores/userStore.js';
    import { onMounted, ref } from 'vue';

    const userStore = useUserStore();
    const avatarUrl = ref(null);
    const avatar = ref();

    onMounted(async () => {
        avatarUrl.value = await userStore.getUserInfo.data[0]?.avatarUrl;
        if (avatar.value) {
            avatar.value.style.background = `url(${avatarUrl.value})`;
            avatar.value.style.backgroundPosition = `50% 50%`;
            avatar.value.style.backgroundSize = `cover`;
        }
    });
</script>

<style lang="scss" scoped>
    .avatar {
        border: 0.3rem solid $blue-100;
        width: 20vmin;
        height: 20vmin;
        border-radius: 50%;
        background-color: $blue-500;
        @include flex-position(row, nowrap, center, center);

        &__img {
            width: 18vmin;
            height: 18vmin;
            border-radius: 50%;
        }
    }
</style>
