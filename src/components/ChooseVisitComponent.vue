<template>
    <section class="searchVisit">
        <h3>Wyszukaj wizytę</h3>

        <div class="chooseVisits">
            <label
                class="chooseDate__title"
                for="visit"
                >Wybierz wizytę</label
            >
            <input
                id="visit"
                v-model="typeOfVist"
                type="text" />
            <ul class="chooseVisit__listOfVisits"></ul>
        </div>
        <div class="chooseDate">
            <label
                class="chooseDate__title"
                for="date"
                >Wybierz termin</label
            >
            <input
                id="date"
                v-model="date"
                type="date" />
        </div>
        <div class="chooseDoctor">
            <label for="doctor">Wybierz lekarza</label>
            <input
                id="doctor"
                v-model="doctor"
                type="text" />
            <ul class="chooseDoctor__doctorList"></ul>
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
