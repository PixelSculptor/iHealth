<template>
    <div
        class="researchBox"
        @submit.prevent="addTest">
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
                <error-info :message="testFileError" />
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
                    >Badanie zostało przesłane pomyślnie</span
                >
            </div>
        </form>
    </div>
</template>

<script setup>
    import ButtonComponent from './ButtonComponent.vue';
    import BouncingBallsComponent from './BouncingBallsComponent.vue';
    import ErrorInfo from './ErrorInfo.vue';

    import { typeOfBlood, typeOfResources } from '../utils/typeOfResources.js';
    import { computed, ref } from 'vue';
    import ALLOWED_TYPES from '../utils/allowedTypes.js';
    import useStorage from '../composables/getImage.js';
    import useUserStore from '../stores/userStore.js';
    import { timestamp } from '../firebase/config.js';
    import useCollection from '../composables/useCollections.js';

    const { isLoading, addDoc, error } = useCollection('research');
    const { url, uploadImage } = useStorage();

    const antigenFlag = ref(false);
    const researchType = ref(null);
    const bloodType = ref(null);
    const testFile = ref(null);
    const testFileError = ref(null);
    const researchDate = ref(null);
    const successFlag = ref(false);

    const userStore = useUserStore();

    const disableAddTest = computed(
        () => !(researchType.value && dateFormat.value && testFile.value)
    );

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

    const addTest = async () => {
        try {
            await uploadImage(testFile.value);
            console.log(`image uploaded`, url.value);
            await addDoc({
                userId: userStore.getUserId,
                date: dateFormat.value,
                bloodType: bloodGroup.value,
                testUrl: url.value,
                testType: researchType.value,
                createdAt: timestamp(),
            });
            if (error.value) throw new Error();
            isLoading.value = false;
            successFlag.value = true;
        } catch (err) {
            console.log(error.value);
        } finally {
            antigenFlag.value = false;
            researchType.value = null;
            bloodType.value = null;
            testFile.value = null;
            testFileError.value = null;
            researchDate.value = null;
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
