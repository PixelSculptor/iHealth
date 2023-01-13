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
            <div class="actionsAndInfo">
                <button-component
                    :disabled="disableAddInfo"
                    wide
                    >Zapisz badanie</button-component
                >
                <bouncing-balls-component
                    :visible="isLoading"
                    class="loader" />
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
    import { typeOfBlood } from '../../../utils/typeOfResources.js';
    import { computed, ref, watch } from 'vue';
    import ButtonComponent from '../../ButtonComponent.vue';
    import BouncingBallsComponent from '../../BouncingBallsComponent.vue';
    import ErrorInfo from '../../ErrorInfo.vue';

    const antigenFlag = ref(false);
    const bloodType = ref(null);
    const allergies = ref(null);
    const diabetes = ref(null);
    const isOrganDonor = ref(false);
    const isBloodDonor = ref(false);

    const successFlag = ref(false);
    const isLoading = ref(false);
    const error = ref(null);

    const bloodGroup = computed(() =>
        antigenFlag.value ? bloodType.value + '+' : bloodType.value + '-'
    );

    const disableAddInfo = computed(
        () => !(bloodType.value && antigenFlag.value && bloodGroup.value)
    );
    watch(diabetes, () => {
        console.log(diabetes.value, bloodGroup.value);
    });
</script>

<style lang="scss" scoped>
    .userIssuesContainer {
        height: 100%;
        &__header {
            @include text-header3($font-weight-semiBold);
            color: $blue-900;
            height: 15%;
        }
        &__form {
            @include flex-position(column, nowrap, space-evenly, flex-start);
            height: 85%;

            .inputBox {
                @include flex-position(row, nowrap, flex-start, center);
                gap: 0.5rem;

                select,
                input {
                    @include text-header6($font-weight-regular);
                }

                label {
                    @include label;
                    color: $blue-900;
                }
            }

            .actionsAndInfo {
                @include flex-position(column, nowrap, space-evenly, center);
                align-self: center;
                position: relative;
                .loader {
                    position: absolute;
                }
            }
        }
    }
</style>
