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

        <div class="formBlock">
            <label
                for="height"
                class="formBlock__label"
                >Wzrost [cm]</label
            >
            <input
                id="height"
                min="0"
                max="220"
                step="1"
                type="range"
                required />
        </div>
    </form>
</template>

<script setup></script>

<style scoped lang="scss">
    .completeProfileForm {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        place-items: center;
        min-height: 70%;
        min-width: 50vw;
        border: 2px solid red;
        padding: 5%;
        gap: 2rem;

        .formBlock {
            min-width: 20vw;
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
        }
    }
</style>
