<template>
    <div
        aria-label="Awatar kontaktu alarmowego"
        class="icon"
        tabindex="0">
        <div
            v-if="!avatarUrl"
            class="fallbackAvatar">
            <font-awesome-icon :icon="iconName" />
        </div>

        <div
            ref="contact"
            class="contact__img"></div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const props = defineProps({
        iconName: {
            type: String,
            default: 'fa-solid fa-user-astronaut',
        },
        avatarUrl: {
            type: String,
            default: null,
        },
    });

    const contact = ref();

    onMounted(async () => {
        if (props.avatarUrl) {
            contact.value.style.background = `url(${props.avatarUrl})`;
            contact.value.style.backgroundPosition = `50% 50%`;
            contact.value.style.backgroundSize = `cover`;
        }
    });
</script>

<style lang="scss" scoped>
    .icon {
        @include flex-position(row, nowrap, center, center);
        width: 3rem;
        height: 3rem;
        border: none;
        border-radius: 50%;
        padding: 1.8rem;
        background-color: rgba(244, 236, 88, 0.62);
        &:deep(svg) {
            width: 2rem;
            height: 2rem;
            color: rgba(204, 198, 4, 0.95);
        }

        .contact__img {
            width: 1.5vmin;
            height: 1.5vmin;
            border-radius: 50%;
        }
    }
</style>
