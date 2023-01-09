<template>
    <div class="researchBox">
        <h3 class="researchBox__header">Wybierz typ badania:</h3>
        <form class="researchBox__form researchForm">
            <select
                id="researches"
                v-model="researchType"
                class="researchForm__typeOfResearch">
                <option
                    disabled
                    value="">
                    Wybierz jeden typ
                </option>
                <option
                    v-for="research in typeOfResources"
                    :key="research.id"
                    :value="research.keyName">
                    {{ research.typeName }}
                </option>
            </select>
            <div
                v-if="researchType === 'morphology'"
                class="researchForm__bloodSection">
                <label for="typeOfBlood">Grupa krwi:</label>
                <select
                    id="typeOfBlood"
                    v-model="bloodType"
                    class="bloodSection__bloodType">
                    <option
                        disabled
                        value="">
                        Wybierz jeden typ
                    </option>
                    <option
                        v-for="(bloodType, index) in typeOfBlood"
                        :key="index"
                        :value="bloodType"
                        class="bloodOption">
                        {{ bloodType }}
                    </option>
                </select>
                <label for="antigen">Antygen R</label>
                <input
                    id="antigen"
                    v-model="antigenFlag"
                    class="bloodSection__antigenRflag"
                    type="checkbox" />
                <h3 v-show="bloodType">{{ bloodGroup }}</h3>
            </div>
            <label for="dateOfResource"
                >Wybierz dzień badania {{ dateFormat }}</label
            >
            <input
                id="dateOfResource"
                v-model="researchDate"
                type="date" />
            <label for="uploadTest">Dodaj wyniki:</label>
            <input
                id="uploadTest"
                class=""
                type="file"
                @change="handleChange" />
            <button-component>Zapisz badanie</button-component>
        </form>
    </div>
</template>

<script setup>
    import { typeOfBlood, typeOfResources } from '../utils/typeOfResources.js';
    import { computed, ref } from 'vue';
    import ALLOWED_TYPES from '../utils/allowedTypes.js';
    import ButtonComponent from './ButtonComponent.vue';

    // const {filePath, url, uploadImage} = useStorage()
    const antigenFlag = ref(false);
    const researchType = ref(null);
    const bloodType = ref(null);
    const testFile = ref(null);
    const testFileError = ref(null);
    const researchDate = ref(null);

    const bloodGroup = computed(() =>
        antigenFlag.value ? bloodType.value + '+' : bloodType.value + '-'
    );
    const dateFormat = computed(() => {
        return (
            researchDate.value &&
            researchDate.value.split('-').reverse().join('-')
        );
    });

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && ALLOWED_TYPES.includes(selectedFile.type)) {
            testFile.value = selectedFile;
            testFileError.value = null;
        } else {
            testFile.value = null;
            testFileError.value =
                'Please select an image file (jpeg, jpg, png, webp or pdf).';
        }
    };
</script>

<style lang="scss" scoped>
    .researchBox {
        display: grid;
    }
</style>
