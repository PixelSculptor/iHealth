<template>
    <div
        class="referralsBox"
        @submit.prevent="addTest">
        <h3 class="referralsBox__header">Dodaj skierowanie:</h3>
        <form class="referralsBox__form referralsForm">
            <div class="inputBox">
                <label for="doctorData"> Lekarz:</label>
                <select
                    id="doctorData"
                    v-model="nameAndSurnameDoctor">
                    <option>Zaimportowane z dnia:</option>
                </select>
            </div>

            <div class="inputBox">
                <label for="researchDate"
                    >Wybierz dzień wystawienia skierowania:</label
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
                    >Zapisz skierowanie</button-component
                >
                <bouncing-balls-component :visible="isLoading" />
                <error-info :message="error" />
                <span
                    v-show="successFlag"
                    class="dataSend"
                    >Skierowanie zostało przesłane pomyślnie</span
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
    const { isLoading, addDoc, error } = useCollection('listOfImportReferrals');
    const { url, uploadImage } = useStorage();
    const nameAndSurnameDoctor = ref(null);
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
                doctorReferralsDataImport: nameAndSurnameDoctor.value,
                userId: userStore.getUserId,
                dateImport: dateFormat.value,
                testUrl: url.value,
                createdAt: timestamp(),
            });
            if (error.value) throw new Error();
            isLoading.value = false;
            successFlag.value = true;
        } catch (err) {
            console.log(err);
            console.log(error.value);
            console.log(error.message);
        } finally {
            testFile.value = null;
            testFileError.value = null;
            researchDate.value = null;
        }
    };
</script>

<style lang="scss" scoped>
    .referralsBox {
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
        .referralsForm {
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
