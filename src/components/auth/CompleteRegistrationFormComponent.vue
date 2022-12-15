<template>
    <form
        action=""
        class="completeProfileForm">
        <div class="formBlock">
            <label for="name">Imię</label>
            <input
                id="name"
                type="text"
                required />
        </div>

        <div class="formBlock">
            <label for="surname">Nazwisko</label>
            <input
                id="surname"
                type="text"
                required />
        </div>

        <div class="formBlock">
            <label for="avatar">Twój awatar</label>
            <input
                id="avatar"
                type="file" />
        </div>

        <div class="formBlock">
            <label for="phoneNumber">Numer telefonu</label>
            <input
                id="phoneNumber"
                type="tel"
                required />
        </div>

        <div class="formBlock">
            <label for="dateOfBirth">Data urodzenia</label>
            <input
                id="dateOfBirth"
                type="date"
                required />
        </div>

        <div class="formBlock">
            <label for="personId">PESEL</label>
            <input
                id="personId"
                type="text"
                required />
        </div>

        <div class="formBlock">
            <label for="gender">Płeć</label>
            <input
                id="gender"
                type="select"
                required />
        </div>

        <div class="formBlock">
            <label for="weight">Twoja waga [kg] {{ weight }}</label>
            <input
                id="weight"
                min="0"
                max="200"
                step="1"
                type="range"
                v-model="weight"
                required />
        </div>

        <div class="formBlock">
            <label for="height">Wzrost [cm]</label>
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
        display: flex;
    }
</style>
