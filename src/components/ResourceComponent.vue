<template>
    <div class="researchBox">
        <h3 class="researchBox__header">Dodaj badanie:</h3>
        <form class="researchBox__form researchForm">
            <div class="inputBox">
                <label for="researches">Wybierz typ badania:</label>
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
            </div>

            <div
                v-if="researchType === 'morphology'"
                class="researchForm__bloodSection">
                <div class="inputBox">
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
                </div>

                <div class="inputBox">
                    <label for="antigen">Antygen R</label>
                    <input
                        id="antigen"
                        v-model="antigenFlag"
                        class="bloodSection__antigenRflag"
                        type="checkbox" />
                    <p v-show="bloodType">Twoja grupa krwi: {{ bloodGroup }}</p>
                </div>
            </div>
            <div class="inputBox">
                <label for="dateOfResource">Wybierz dzień badania:</label>
                <input
                    id="dateOfResource"
                    v-model="researchDate"
                    type="date" />
            </div>
            <div class="inputBox">
                <label for="uploadTest">Dodaj wyniki:</label>
                <div
                    class="icon"
                    tabindex="0">
                    <font-awesome-icon icon="fa-solid fa-file-import" />
                </div>
                <input
                    id="uploadTest"
                    class=""
                    type="file"
                    @change="handleChange" />
                <!--            <error-info :message="testFileError" />-->
            </div>

            <button-component wide>Zapisz badanie</button-component>
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
    console.log(dateFormat.value);

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
        @include flex-position(column, nowrap, space-bewteen, flex-start);
        height: 100%;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
        }
        &__form {
            height: 100%;
            select,
            input {
                @include text-header6($font-weight-regular);
            }
            label {
                @include label;
                color: $blue-900;
            }
            button {
                align-self: center;
            }
        }
        .researchForm {
            width: 100%;
            @include flex-position(column, nowrap, center, flex-start);
            gap: 1rem;
            &__bloodSection {
                @include flex-position(column, nowrap, flex-start, flex-start);
                width: 100%;
                gap: 1rem;
            }

            .inputBox {
                @include flex-position(row, nowrap, flex-start, center);
                gap: 0.5rem;

                input[type='file'] {
                    background-color: $white;

                    &::-webkit-file-upload-button {
                        cursor: pointer;
                        border: none;
                        padding: 0.5rem;
                        width: 45%;
                        text-align: left;
                        border-radius: $border-radius--normal;
                        @include button-soft;
                        @include text-button($font-weight-semiBold);
                    }
                }

                .icon {
                    cursor: pointer;
                    position: relative;
                    &:deep(svg) {
                        width: 1.2rem;
                        height: 1.2rem;
                        top: -0.6rem;
                        left: 8rem;
                        position: absolute;
                        color: $blue-700;
                    }
                }
            }
        }
    }
</style>
