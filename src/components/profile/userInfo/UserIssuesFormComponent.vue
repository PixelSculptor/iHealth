<template>
    <div class="userIssuesContainer">
        <h3 class="userIssuesContainer__header">
            Uzupełnij informacje o sobie
        </h3>
        <form
            action=""
            class="userIssuesContainer__form">
            <div class="inputBox">
                <label for="typeOfBlood">Wybierz grupę krwi: </label>
                <select
                    id="typeOfBlood"
                    v-model="bloodType"
                    class="bloodType">
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
                <label for="antigen">Antygen R: </label>
                <input
                    id="antigen"
                    v-model="antigenFlag"
                    class="bloodSection__antigenRflag"
                    type="checkbox" />
            </div>
            <div class="inputBox">
                <label for="allergies">Czy masz uczulenia? </label>
                <input
                    id="allergies"
                    v-model="allergies"
                    type="text" />
            </div>
            <div class="inputBox">
                <label for="diabetes">Czy cierpisz na cukrzycę? </label>
                <select
                    id="diabetes"
                    v-model="diabetes">
                    <option disabled>Wybierz jedną opcję</option>
                    <option>Typu 1</option>
                    <option>Typu 2</option>
                    <option>Ciążowa</option>
                    <option>Typu LADA</option>
                    <option>Typu MODY</option>
                </select>
            </div>

            <div class="inputBox">
                <label for="organDonor">Czy jesteś dawcą organów? </label>
                <select
                    id="organDonor"
                    v-model="isOrganDonor">
                    <option disabled>Wybierz jedną opcję</option>
                    <option>Tak</option>
                    <option>Nie</option>
                </select>
            </div>

            <div class="inputBox">
                <label for="bloodDonor"
                    >Czy jesteś honorowym dawcą krwi?
                </label>
                <select
                    id="bloodDonor"
                    v-model="isBloodDonor">
                    <option disabled>Wybierz jedną opcję</option>
                    <option>Tak</option>
                    <option>Nie</option>
                </select>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { typeOfBlood } from '../../../utils/typeOfResources.js';
    import { computed, ref, watch } from 'vue';

    const antigenFlag = ref(false);
    const bloodType = ref(null);
    const allergies = ref(null);
    const diabetes = ref(null);

    const bloodGroup = computed(() =>
        antigenFlag.value ? bloodType.value + '+' : bloodType.value + '-'
    );

    watch(diabetes, () => {
        console.log(diabetes.value, bloodGroup.value);
    });
</script>

<style lang="scss" scoped>
    .userIssuesContainer {
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
        }
    }
</style>
