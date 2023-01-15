<template>
    <div
        class="researchBox"
        @submit.prevent="addTest">
        <h3 class="researchBox__header">Dodaj dokument:</h3>
        <form class="researchBox__form researchForm">
            <div class="inputBox">
                <label for="researches">Wybierz typ badania:</label>
                <select
                    id="researches"
                    v-model="documentType"
                    class="researchForm__typeOfResearch">
                    <option
                        disabled
                        value="">
                        Wybierz jeden typ
                    </option>
                    <option
                        v-for="document in typeOfDocuments"
                        :key="document.id"
                        :value="document.type">
                        {{ document.name }}
                    </option>
                </select>
            </div>
            <div class="inputBox">
                <label for="title">Podaj tytuł</label>
                <input
                    id="title"
                    v-model="documentTitle"
                    type="text" />
            </div>
            <div class="inputBox">
                <label for="dateOfResource"
                    >Podaj dzień wystawienia dokumentu:</label
                >
                <input
                    id="dateOfResource"
                    v-model="documentDate"
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
                <error-info :message="documentFileError" />
            </div>
            <div class="actionsAndInfo">
                <button-component
                    :disabled="disableAddTest"
                    wide
                    >Zapisz badanie</button-component
                >
                <bouncing-balls-component :visible="isLoading" />
                <error-info :message="error" />
                <span
                    v-show="successFlag"
                    aria-label="passwords match"
                    class="dataSend"
                    role="presentation"
                    >Dokument został przesłany pomyślnie!</span
                >
            </div>
        </form>
    </div>
</template>

<script setup>
    import BouncingBallsComponent from '../../BouncingBallsComponent.vue';
    import ErrorInfo from '../../ErrorInfo.vue';
    import ButtonComponent from '../../ButtonComponent.vue';

    import { computed, ref } from 'vue';
    import { typeOfDocuments } from '../../../utils/typeOfDocuments.js';
    import useCollection from '../../../composables/useCollections.js';
    import useStorage from '../../../composables/getImage.js';
    import ALLOWED_TYPES from '../../../utils/allowedTypes.js';
    import { timestamp } from '../../../firebase/config.js';
    import useUserStore from '../../../stores/userStore.js';

    const successFlag = ref(false);
    const { isLoading, addDoc, error } = useCollection('certificates');
    const { url, uploadImage } = useStorage();

    const documentType = ref(null);
    const documentFile = ref(null);
    const documentFileError = ref(null);
    const documentDate = ref(null);
    const documentTitle = ref('');

    const userStore = useUserStore();

    const disableAddTest = computed(
        () =>
            !(
                documentType.value &&
                dateFormat.value &&
                documentFile.value &&
                documentTitle.value
            )
    );

    const dateFormat = computed(
        () =>
            documentDate.value &&
            documentDate.value.split('-').reverse().join('-')
    );

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && ALLOWED_TYPES.includes(selectedFile.type)) {
            documentFile.value = selectedFile;
            documentFileError.value = null;
        } else {
            documentFile.value = null;
            documentFileError.value =
                'Please select an image file (jpeg, jpg, png, webp or pdf).';
        }
    };

    const addTest = async () => {
        try {
            await uploadImage(documentFile.value);
            console.log(`image uploaded`, url.value);
            await addDoc({
                userId: userStore.getUserId,
                date: dateFormat.value,
                documentUrl: url.value,
                testType: documentType.value,
                documentTitle: documentTitle.value,
                createdAt: timestamp(),
            });
            if (error.value) throw new Error();
            isLoading.value = false;
            successFlag.value = true;
        } catch (err) {
            console.log(error.value);
        } finally {
            documentType.value = null;
            documentFile.value = null;
            documentFileError.value = null;
            documentDate.value = null;
            documentTitle.value = '';
        }
    };
</script>

<style lang="scss" scoped>
    .researchBox {
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
        .researchForm {
            width: 100%;
            @include flex-position(column, nowrap, space-evenly, flex-start);
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

        .dataSend {
            color: $color-success;
        }
    }
</style>
