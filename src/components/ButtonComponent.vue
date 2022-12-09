<template>
    <section>
        <button @click="changeText">
            {{ mainTxt }}
        </button>
    </section>
</template>

<script>
    import { ref } from 'vue';
    export default {
        name: 'ButtonComponent',
        setup() {
            const mainTxt = ref('Przycisk');
            const changeText = () => {
                mainTxt.value = 'Wyszkole cie w jeden księżyc!';
            };
            return { mainTxt, changeText };
        },
    };
</script>

<style scoped lang="scss">
    section button {
        color: $blue-700;
        background-color: $blue-100;
        @include text-paragraph($font-weight-bold, true);
        border-radius: $border-radius;
    }
</style>
