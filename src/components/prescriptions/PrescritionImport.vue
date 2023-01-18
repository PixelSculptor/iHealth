<template>
    <div
        class="prescriptionBox"
        @submit.prevent="addTest">
        <h3 class="prescriptionBox__header">Dodaj receptę:</h3>
        <form class="prescriptionBox__form prescriptionForm">
            <div class="inputBox">
                <label for="doctorDataImport">Lekarz: </label>
                <select
                    id="doctorDataImport"
                    v-model="nameAndSurnameDoctor">
                    <option
                        disabled
                        value="">
                        Wybierz lekarza
                    </option>
                    <option>Zaimportowane z dnia:</option>
                </select>
            </div>

            <div class="inputBox">
                <label for="medicine">Lek: </label>
                <select
                    id="medicine"
                    v-model="medicine">
                    <option
                        disabled
                        value="">
                        Wybierz lek
                    </option>
                    <option>Widoczne na zdjeciu</option>
                </select>
            </div>

            <div class="inputBox">
                <label for="frequencys">Częstotliwość: </label>
                <select
                    id="frequencys"
                    v-model="frequency">
                    <option
                        disabled
                        value="">
                        Wybierz lek
                    </option>
                    <option>Widoczne na zdjeciu</option>
                </select>
            </div>

            <div class="inputBox">
                <label for="researchDate"
                    >Wybierz dzień wystawienia recepty:</label
                >
                <input
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
                    type="file"
                    @change="handleChange" />
                <error-info :message="testFileError" />
            </div>

            <div class="actionsAndInfo">
                <button-component
                    :disabled="disableAddTest"
                    wide
                    >Zapisz receptę</button-component
                >
                <bouncing-balls-component :visible="isLoading" />
                <error-info :message="error" />
                <span
                    v-show="successFlag"
                    class="dataSend"
                    >Recepta została przesłana pomyślnie</span
                >
            </div>
        </form>
    </div>
</template>

<script setup>
    import ButtonComponent from '../ButtonComponent.vue';
    import BouncingBallsComponent from '../BouncingBallsComponent.vue';
    import ErrorInfo from '../ErrorInfo.vue';

    import { computed, ref } from 'vue';
    import ALLOWED_TYPES from '../../utils/allowedTypes.js';
    import useStorage from '../../composables/getImage.js';
    import useUserStore from '../../stores/userStore.js';
    import { timestamp } from '../../firebase/config.js';
    import useCollection from '../../composables/useCollections.js';

    const { isLoading, addDoc, error } = useCollection('listOfImportRecipies');
    const { url, uploadImage } = useStorage();

    const nameAndSurnameDoctor = ref(null);
    const medicine = ref(null);
    const frequency = ref(null);
    const researchDate = ref(null);
    const successFlag = ref(false);
    const testFile = ref(null);
    const testFileError = ref(null);

    const userStore = useUserStore();

    const disableAddTest = computed(() => !testFile.value);
    const dateFormat = computed(
        () =>
            researchDate.value &&
            researchDate.value.split('-').reverse().join('-')
    );

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

    const addTest = async () => {
        try {
            await uploadImage(testFile.value);
            console.log(`image uploaded`, url.value);
            await addDoc({
                userId: userStore.getUserId,
                dateImport: dateFormat.value,
                doctorDataImport: nameAndSurnameDoctor.value,
                medicineNameImport: medicine.value,
                frequencyMedicineImport: frequency.value,
                testUrl: url.value,
                createdAt: timestamp(),
            });
            if (error.value) throw new Error();
            isLoading.value = false;
            successFlag.value = true;
        } catch (err) {
            console.log(error.value);
        } finally {
            nameAndSurnameDoctor.value = null;
            medicine.value = null;
            frequency.value = null;
            testFile.value = null;
            testFileError.value = null;
            researchDate.value = null;
        }
    };
</script>

<style lang="scss" scoped>
    .prescriptionBox {
        @include flex-position(column, nowrap, space-between, flex-start);
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
            .actionsAndInfo {
                @include flex-position(column, nowrap, center, center);
                gap: 1rem;
                align-self: center;
            }
        }
        .prescriptionForm {
            width: 100%;
            @include flex-position(column, nowrap, space-evenly, flex-start);
            gap: 1rem;

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

        .dataSend {
            color: $color-success;
        }
    }
</style>
