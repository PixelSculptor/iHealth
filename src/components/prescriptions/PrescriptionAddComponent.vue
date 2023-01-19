<template>
    <div
        class="prescriptionBox"
        @submit.prevent="addTest">
        <h3 class="prescriptionBox__header">Dodaj receptę:</h3>
        <form class="prescriptionBox__form prescriptionForm">
            <div class="inputBox">
                <label for="nameAndSurnameDoctor"> Lekarz:</label>
                <select
                    id="nameAndSurnameDoctor"
                    v-model="nameAndSurnameDoctor">
                    <option
                        disabled
                        value="">
                        Wybierz lekarza
                    </option>
                    <option
                        v-for="research in getDoctorsArray()"
                        :key="research.registryId">
                        {{ research.doctorName }}
                    </option>
                </select>
            </div>

            <div class="inputBox">
                <label for="medicine">Lek:</label>
                <select
                    id="medicine"
                    v-model="medicine">
                    <option
                        disabled
                        value="">
                        Wybierz lek
                    </option>
                    <option
                        v-for="research in getMedicineArray()"
                        :key="research.medicinalProductId">
                        {{ research.medicineName }}
                    </option>
                </select>
            </div>

            <div class="inputBox">
                <label for="frequency">Częstotliwość:</label>
                <input
                    id="frequency"
                    v-model="frequency"
                    type="text" />
            </div>

            <div class="inputBox">
                <label for="dateOfResource"
                    >Wybierz dzień wystawienia recepty:</label
                >
                <input
                    id="dateOfResource"
                    v-model="researchDate"
                    type="date" />
            </div>

            <div class="actionsAndInfo">
                <button-component
                    :disabled="disableAddTest"
                    wide
                    >Zapisz receptę</button-component
                >
                <bouncing-balls-component :visible="isLoading" />
                <error-info :message="error" />
                <span
                    v-show="successFlag"
                    class="dataSend"
                    >Recepta została przesłana pomyślnie</span
                >
            </div>
        </form>
    </div>
</template>

<script setup>
    import ButtonComponent from '../ButtonComponent.vue';
    import BouncingBallsComponent from '../BouncingBallsComponent.vue';
    import ErrorInfo from '../ErrorInfo.vue';
    import getDoctorsArray from '../../composables/getDoctor.js';
    import getMedicineArray from '../../composables/getMedicine.js';

    import { computed, ref } from 'vue';
    import useUserStore from '../../stores/userStore.js';
    import { timestamp } from '../../firebase/config.js';
    import useCollection from '../../composables/useCollections.js';

    const { isLoading, addDoc, error } = useCollection('listOfRecipies');

    const nameAndSurnameDoctor = ref(null);
    const medicine = ref(null);
    const frequency = ref(null);
    const researchDate = ref(null);
    const successFlag = ref(false);
    const userStore = useUserStore();

    const disableAddTest = computed(() => !dateFormat.value);
    const dateFormat = computed(
        () =>
            researchDate.value &&
            researchDate.value.split('-').reverse().join('-')
    );

    const addTest = async () => {
        try {
            await addDoc({
                userId: userStore.getUserId,
                date: dateFormat.value,
                doctorData: nameAndSurnameDoctor.value,
                medicineName: medicine.value,
                frequencyMedicine: frequency.value,
                createdAt: timestamp(),
            });
            if (error.value) throw new Error();
            isLoading.value = false;
            successFlag.value = true;
        } catch (err) {
            console.log(err);
            console.log(error.value);
            console.log(error.message);
        } finally {
            nameAndSurnameDoctor.value = null;
            medicine.value = null;
            frequency.value = null;
            researchDate.value = null;
        }
    };
</script>

<style lang="scss" scoped>
    .prescriptionBox {
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
        .prescriptionForm {
            width: 100%;
            @include flex-position(column, nowrap, space-evenly, flex-start);
            gap: 1rem;

            .inputBox {
                @include flex-position(row, nowrap, flex-start, center);
                gap: 0.5rem;
                input[type='file'] {
                    background-color: $white;

                    &::-webkit-file-upload-button {
                        cursor: pointer;
                        border: none;
                        padding: 1rem;
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
