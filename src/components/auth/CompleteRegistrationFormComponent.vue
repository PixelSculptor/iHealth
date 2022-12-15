<template>
    <form
        action=""
        class="completeProfileForm">
        <div
            id="firstName"
            class="formBlock">
            <label
                for="name"
                class="formBlock__label"
                >Imię</label
            >
            <input
                class="formBlock__input"
                id="name"
                type="text"
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
                required>
                <option value="">Wybierz płeć</option>
                <option value="female">Kobieta</option>
                <option value="male">Mężczyna</option>
                <option value="other">Inna</option>
            </select>
        </div>

        <div class="formBlock">
            <label
                for="weight"
                class="formBlock__label"
                >Twoja waga [kg] {{ weight }}</label
            >
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
                >Wzrost [cm] {{ weight }}</label
            >
            <div class="field">
                <div class="value left">0</div>
                <input
                    id="height"
                    min="0"
                    max="220"
                    step="1"
                    type="range"
                    v-model="weight"
                    required />
                <div class="value right">220</div>
            </div>
        </div>
    </form>
</template>

<script setup></script>

<style scoped lang="scss">
    .completeProfileForm {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-flow: row;
        grid-template-areas:
            'name surname avatar avatar'
            'phone birth person-id gender'
            'height height weight weight';
        place-items: center;
        min-height: 70%;
        min-width: 50vw;
        border: 2px solid red;
        padding: 5%;
        gap: 2rem;

        .formBlock {
            width: 100%;
            height: auto;
            border: 2px solid red;
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
            }
            // custom inputs design
            .icon {
                @include input;
                background-color: $white;
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
                background-color: $white;
                @include flex-position(row, wrap, center, center);
                border: 2px solid green;
                & > input[type='range'] {
                    margin-inline: 0.5rem;
                    border-radius: $border-radius--rounded;
                    background-color: $blue-100;
                    -webkit-appearance: none;
                    width: 100%;
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
        }
    }
</style>
