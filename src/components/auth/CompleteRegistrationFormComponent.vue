<template>
    <form
        class="completeProfileForm"
        @submit.prevent="completeProfile">
        <div class="formBlock">
            <label
                class="formBlock__label"
                for="name"
                >Imię</label
            >
            <input
                id="name"
                v-model="name"
                class="formBlock__input"
                placeholder="Jan"
                required
                type="text" />
        </div>

        <div class="formBlock">
            <label
                class="formBlock__label"
                for="surname"
                >Nazwisko</label
            >
            <input
                id="surname"
                v-model="surname"
                class="formBlock__input"
                placeholder="Kowalski"
                required
                type="text" />
        </div>

        <div class="formBlock avatar">
            <label
                class="formBlock__label"
                for="avatar"
                >Twój awatar</label
            >
            <div
                class="icon"
                tabindex="0">
                <font-awesome-icon
                    alt="file import icon"
                    aria-label="file import icon"
                    icon="fa-solid fa-file-import" />
            </div>
            <input
                id="avatar"
                class="formBlock__input"
                type="file"
                @change="handleChange" />
            <error-info
                :aria-label="avatarError"
                :message="avatarError"
                aria-live="polite" />
        </div>

        <div class="formBlock">
            <label
                class="formBlock__label"
                for="phoneNumber"
                >Numer telefonu</label
            >
            <input
                id="phoneNumber"
                v-model="phoneNumber"
                class="formBlock__input"
                maxlength="12"
                minlength="9"
                placeholder="+48 999 999 999"
                required
                type="tel" />
        </div>

        <div class="formBlock">
            <label
                class="formBlock__label"
                for="dateOfBirth"
                >Data urodzenia</label
            >
            <input
                id="dateOfBirth"
                v-model="dateOfBirth"
                :max="today"
                class="formBlock__input"
                pattern="\d{4}-\d{2}-\d{2}"
                required
                type="date" />
        </div>

        <div class="formBlock">
            <label
                class="formBlock__label"
                for="personId"
                >PESEL</label
            >
            <input
                id="personId"
                v-model="personId"
                class="formBlock__input"
                maxlength="11"
                minlength="11"
                placeholder="11111111111"
                required
                type="text" />
        </div>

        <div class="formBlock">
            <label
                class="formBlock__label"
                for="gender"
                >Płeć</label
            >
            <select
                id="gender"
                v-model="gender"
                class="formBlock__input"
                required>
                <option value="">Wybierz płeć</option>
                <option value="kobieta">Kobieta</option>
                <option value="mężczyzna">Mężczyzna</option>
                <option value="inna">Inna</option>
                <span v-if="gender">{{ gender }}</span>
            </select>
        </div>

        <div class="formBlock">
            <label
                class="formBlock__label"
                for="weight"
                >Twoja waga [kg]</label
            >
            <div class="slider">
                <span>{{ weight }}</span>
            </div>
            <div class="field">
                <div class="value left">0</div>
                <input
                    id="weight"
                    v-model="weight"
                    max="200"
                    min="0"
                    required
                    step="1"
                    type="range" />
                <div class="value right">200</div>
            </div>
        </div>

        <div class="formBlock">
            <label
                class="formBlock__label"
                for="height"
                >Wzrost [cm]</label
            >
            <div class="slider">
                <span>{{ height }}</span>
            </div>
            <div class="field">
                <div class="value left">0</div>
                <input
                    id="height"
                    v-model="height"
                    max="220"
                    min="0"
                    required
                    step="1"
                    type="range" />
                <div class="value right">220</div>
            </div>
        </div>
        <div class="completeProfileForm__submit">
            <button-component
                :disabled="disableCompleteProfile"
                main
                wide
                >Zapisz profil</button-component
            >
            <error-info
                :aria-label="notValidPersonIdError"
                :message="notValidPersonIdError"
                aria-live="polite" />
            <error-info
                :aria-label="error"
                :message="error"
                aria-live="polite" />
        </div>
        <bouncing-balls-component
            :visible="isLoading"
            aria-label="loader"
            aria-live="polite"
            class="loader" />
    </form>
</template>

<script setup>
    import ButtonComponent from '../ButtonComponent.vue';
    import ErrorInfo from '../ErrorInfo.vue';
    import BouncingBallsComponent from '../BouncingBallsComponent.vue';

    import checkPesel from '../../composables/checkPesel.js';
    import { computed, ref } from 'vue';
    import useCollection from '../../composables/useCollections.js';
    import useStorage from '../../composables/getImage.js';
    import useUserStore from '../../stores/userStore.js';
    import { timestamp } from '../../firebase/config.js';
    import ALLOWED_TYPES from '../../utils/allowedTypes.js';
    import { sendDefaultUserIssues } from '../../composables/sendDefaultUserIssues.js';

    const userStore = useUserStore();
    const { error, addDoc, isLoading } = useCollection('userProfile');
    const { filePath, url, uploadImage } = useStorage();
    const avatarError = ref(null);
    const name = ref(null);
    const surname = ref(null);
    const phoneNumber = ref(null);
    const dateOfBirth = ref(null);
    const avatar = ref(null);
    const personId = ref('');
    const gender = ref('');
    const weight = ref(100);
    const height = ref(110);
    const emit = defineEmits('completeProfile');
    const date = new Date();
    const today = computed(() => {
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    });

    const notValidPersonIdError = computed(() => {
        if (!checkPesel(personId.value) && personId.value.length >= 11) {
            return 'Twój nr PESEL jest niepoprawny';
        }
        return '';
    });

    const disableCompleteProfile = computed(() => {
        return !(
            name.value &&
            surname.value &&
            avatar.value &&
            phoneNumber.value &&
            dateOfBirth.value &&
            personId.value &&
            gender.value &&
            weight.value &&
            height.value &&
            checkPesel(personId.value)
        );
    });

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && ALLOWED_TYPES.includes(selectedFile.type)) {
            avatar.value = selectedFile;
            avatarError.value = null;
        } else {
            avatar.value = null;
            avatarError.value =
                'Please select an image file (jpeg, jpg, png or webp).';
        }
    };
    const completeProfile = async () => {
        try {
            await uploadImage(avatar.value);
            console.log(`image uploaded`, url.value);
            await addDoc({
                name: name.value,
                surname: surname.value,
                phoneNumber: phoneNumber.value,
                dateOfBirth: dateOfBirth.value,
                personId: personId.value,
                userId: userStore.getUserId,
                gender: gender.value,
                weight: weight.value,
                height: height.value,
                avatarUrl: url.value,
                avatarPath: filePath.value,
                createdAt: timestamp(),
            });
            await sendDefaultUserIssues(userStore.getUserId);

            if (error.value) {
                throw new Error();
            }
            emit('completeProfile');
        } catch {
            console.log(error.value);
        } finally {
            name.value = null;
            surname.value = null;
            phoneNumber.value = null;
            dateOfBirth.value = null;
            personId.value = '';
            gender.value = '';
            weight.value = 100;
            height.value = 110;
        }
    };
</script>

<style lang="scss" scoped>
    .completeProfileForm {
        @include shadow;
        display: grid;
        grid-auto-flow: row;
        grid-template-areas:
            'name surname avatar avatar'
            'phone birth person-id gender'
            'weight weight height height'
            'submit submit submit submit'
            'loader loader loader loader';
        place-items: center;
        max-height: 65%;
        width: 90%;
        padding: 5%;
        gap: 3rem;
        background: $blue-100;
        border: solid $border-size--input $blue-900;
        border-radius: $border-radius--rounded;

        .formBlock {
            @include flex-position(column, wrap, space-around, flex-start);
            width: 100%;
            height: auto;
            gap: 0.5rem;
            &__input {
                @include input;
                &:active,
                &:focus-visible,
                &:focus {
                    @include input--active;
                }
                &[type='date'] {
                    font-family: $main-font;
                }
                &[type='file'] {
                    background-color: $white;

                    &::-webkit-file-upload-button {
                        @include button-soft;
                        @include text-button($font-weight-semiBold);
                        cursor: pointer;
                        border: none;
                        padding: 0.5rem;
                        width: 35%;
                        text-align: left;
                        border-radius: $border-radius--normal;
                    }
                }
            }
            &__label {
                @include label;
                color: $blue-700;
                position: relative;

                &:after {
                    position: absolute;
                    content: '*';
                    width: 1rem;
                    height: 1rem;
                    color: $color-error;
                }
            }
            .icon {
                @include flex-position(row, nowrap, flex-start, center);
                cursor: pointer;
                position: relative;
                &:deep(svg) {
                    width: 1.2rem;
                    height: 1.2rem;
                    position: absolute;
                    top: 2rem;
                    left: 8.8rem;
                    color: $blue-700;
                }
            }

            //  range field
            .field {
                @include text-header6($font-weight-semiBold);
                @include flex-position(row, wrap, center, center);
                width: 100%;
                color: $blue-700;
                & > input[type='range'] {
                    margin-inline: 0.5rem;
                    border-radius: $border-radius--rounded;
                    background-color: $white;
                    border: solid $border-size--input $blue-700;
                    -webkit-appearance: none;
                    width: 100%;
                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 1.25rem;
                        width: 1.25rem;
                        background-color: $blue-700;
                        border-radius: 50%;
                    }
                }
            }
            &:nth-child(1) {
                grid-area: name;
            }

            &:nth-child(2) {
                grid-area: surname;
            }

            &:nth-child(3) {
                grid-area: avatar;
            }

            &:nth-child(4) {
                grid-area: phone;
            }

            &:nth-child(5) {
                grid-area: birth;
            }

            &:nth-child(6) {
                grid-area: person-id;
            }

            &:nth-child(7) {
                grid-area: gender;
            }
            &:nth-child(8) {
                grid-area: weight;
            }
            &:nth-child(9) {
                grid-area: height;
            }
            //slider
            &:nth-child(8),
            &:nth-child(9) {
                .slider {
                    @include flex-position(row, nowrap, center, center);
                    position: relative;
                    left: 50%;
                    top: -1.5rem;
                    & > span {
                        @include text-paragraph($font-weight-semiBold);
                        position: absolute;
                        display: inline-block;
                        text-align: center;
                        width: auto;
                        height: 3rem;
                        padding: 0.1rem;
                        color: $blue-700;
                        line-height: 50px;
                        transform: translateX(-25%);
                        z-index: 2;
                        &:after {
                            position: absolute;
                            content: '';
                            width: 3rem;
                            height: 3rem;
                            background: $white;
                            transform: translateX(-70%) rotate(45deg);
                            z-index: -1;
                            border-top-left-radius: 50%;
                            border-top-right-radius: 50%;
                            border-bottom-left-radius: 50%;
                            border: solid $border-size--input $blue-700;
                        }
                    }
                }
            }
        }
        &__submit {
            grid-area: submit;
            &:deep(button) {
                margin-bottom: 1rem;
            }
        }
        .loader {
            place-self: center;
            grid-area: loader;
        }
    }

    @media screen and (min-width: $tablet-width) and (max-width: $bigger-tablet) {
        .completeProfileForm {
            grid-template-areas:
                'name surname'
                'avatar avatar'
                'phone birth'
                'person-id gender'
                'weight height'
                'submit submit'
                'loader loader';
            max-height: 100%;
            .formBlock {
                &:nth-of-type(8),
                &:nth-of-type(9) {
                    position: relative;
                    label {
                        position: absolute;
                        top: 110%;
                    }
                }
            }
        }
    }
    @media screen and (min-width: $laptop-width) and (max-width: $pc-width) {
        .completeProfileForm {
            .formBlock {
                &__input {
                    padding: 0.9rem 0.2rem 0.9rem 0.2rem;
                    &[type='file'] {
                        background-color: $white;

                        &::-webkit-file-upload-button {
                            @include button-soft;
                            cursor: pointer;
                            border: none;
                            padding: 0.25rem;
                            width: 30%;
                            text-align: left;
                            border-radius: $border-radius--normal;
                            font-size: 0.8rem;
                        }
                    }
                }

                &__label,
                &__input {
                    font-size: 1rem;
                }

                .icon {
                    @include flex-position(row, nowrap, flex-start, center);
                    cursor: pointer;
                    position: relative;
                    &:deep(svg) {
                        width: 1rem;
                        height: 1rem;
                        position: absolute;
                        top: 1.75rem;
                        left: 6rem;
                    }
                }

                &:nth-of-type(8),
                &:nth-of-type(9) {
                    position: relative;
                    label {
                        position: absolute;
                        top: 110%;
                    }
                }
            }
        }
    }
</style>
