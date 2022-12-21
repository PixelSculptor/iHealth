<template>
    <form
        class="completeProfileForm"
        @submit.prevent="completeProfile">
        <div class="formBlock">
            <label
                for="name"
                class="formBlock__label"
                >Imię</label
            >
            <input
                class="formBlock__input"
                id="name"
                type="text"
                v-model="name"
                placeholder="Jan"
                required />
        </div>

        <div class="formBlock">
            <label
                for="surname"
                class="formBlock__label"
                >Nazwisko</label
            >
            <input
                class="formBlock__input"
                id="surname"
                type="text"
                v-model="surname"
                placeholder="Kowalski"
                required />
        </div>

        <div class="formBlock avatar">
            <label
                for="avatar"
                class="formBlock__label"
                >Twój awatar</label
            >
            <div
                class="formBlock__input icon"
                tabindex="0">
                <font-awesome-icon icon="fa-solid fa-file-import" />
            </div>
            <input
                class="formBlock__input"
                id="avatar"
                type="file" />
        </div>

        <div class="formBlock">
            <label
                for="phoneNumber"
                class="formBlock__label"
                >Numer telefonu</label
            >
            <input
                class="formBlock__input"
                id="phoneNumber"
                type="tel"
                v-model="phoneNumber"
                placeholder="+48 999 999 999"
                required />
        </div>

        <div class="formBlock">
            <label
                for="dateOfBirth"
                class="formBlock__label"
                >Data urodzenia</label
            >
            <input
                class="formBlock__input"
                id="dateOfBirth"
                type="date"
                :max="today"
                pattern="\d{4}-\d{2}-\d{2}"
                :placeholder="dateOfBirth"
                v-model="dateOfBirth"
                required />
        </div>

        <div class="formBlock">
            <label
                for="personId"
                class="formBlock__label"
                >PESEL</label
            >
            <input
                class="formBlock__input"
                id="personId"
                type="text"
                placeholder="11111111111"
                maxlength="11"
                minlength="11"
                v-model="personId"
                required />
        </div>

        <div class="formBlock">
            <label
                for="gender"
                class="formBlock__label"
                >Płeć</label
            >
            <select
                class="formBlock__input"
                id="gender"
                v-model="gender"
                required>
                <option value="">Wybierz płeć</option>
                <option value="kobieta">Kobieta</option>
                <option value="mężczyzna">Mężczyna</option>
                <option value="inna">Inna</option>
                <span v-if="gender">{{ gender }}</span>
            </select>
        </div>

        <div class="formBlock">
            <label
                for="weight"
                class="formBlock__label"
                >Twoja waga [kg]</label
            >
            <div class="slider">
                <span>{{ weight }}</span>
            </div>
            <div class="field">
                <div class="value left">0</div>
                <input
                    id="weight"
                    min="0"
                    max="200"
                    step="1"
                    type="range"
                    v-model="weight"
                    required />
                <div class="value right">200</div>
            </div>
        </div>

        <div class="formBlock">
            <label
                for="height"
                class="formBlock__label"
                >Wzrost [cm]</label
            >
            <div class="slider">
                <span>{{ height }}</span>
            </div>
            <div class="field">
                <div class="value left">0</div>
                <input
                    id="height"
                    min="0"
                    max="220"
                    step="1"
                    type="range"
                    v-model="height"
                    required />
                <div class="value right">220</div>
            </div>
        </div>
        <div class="completeProfileForm__submit">
            <button-component
                wide
                main
                :disabled="disableCompleteProfile"
                >Zapisz profil</button-component
            >
            <error-info :message="notValidPersonIdError" />
        </div>
    </form>
</template>

<script setup>
    import ButtonComponent from '../ButtonComponent.vue';
    import ErrorInfo from '../ErrorInfo.vue';
    import checkPesel from '../../composables/checkPesel.js';
    import { computed, ref } from 'vue';

    const name = ref(null);
    const surname = ref(null);
    const phoneNumber = ref(null);
    const dateOfBirth = ref();
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
            phoneNumber.value &&
            dateOfBirth.value &&
            personId.value &&
            gender.value &&
            weight.value &&
            height.value &&
            checkPesel(personId.value)
        );
    });

    const completeProfile = async () => {
        console.log(
            name.value,
            surname.value,
            phoneNumber.value,
            dateOfBirth.value,
            personId.value,
            gender.value,
            weight.value,
            height.value
        );
        //  TODO: write sending to base personal data
        emit('completeProfile');
    };
</script>

<style scoped lang="scss">
    .completeProfileForm {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-flow: row;
        grid-template-areas:
            'name surname avatar avatar'
            'phone birth person-id gender'
            'weight weight height height'
            'submit submit submit submit';
        place-items: center;
        min-height: 80%;
        min-width: 50vw;
        padding: 5%;
        gap: 3rem;
        background: $blue-100;
        border: solid $border-size--input $blue-900;
        border-radius: $border-radius--rounded;
        @include shadow;

        .formBlock {
            width: 100%;
            height: auto;
            @include flex-position(column, wrap, space-around, flex-start);
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
                    display: none;
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
            // custom inputs design
            .icon {
                @include input;
                background-color: $white;
                cursor: pointer;
                @include flex-position(row, nowrap, flex-start, center);
                & > * {
                    width: 1.5rem;
                    height: 1.5rem;
                    color: $blue-700;
                }
            }

            //  range field
            .field {
                width: 100%;
                color: $blue-700;
                @include text-header6($font-weight-semiBold);
                @include flex-position(row, wrap, center, center);
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
                    position: relative;
                    @include flex-position(row, nowrap, center, center);
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
    }
</style>
