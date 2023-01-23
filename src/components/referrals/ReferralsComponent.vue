<template>
    <div
        class="referralsBox"
        @submit.prevent="addTest">
        <h3
            class="referralsBox__header"
            tabindex="0">
            Dodaj skierowanie:
        </h3>
        <form class="referralsBox__form referralsForm">
            <div class="inputBox">
                <label for="doctorData"> Lekarz:</label>
                <select
                    id="doctorData"
                    v-model="dataDoctor">
                    <option
                        disabled
                        value="">
                        Wybierz lekarza
                    </option>
                    <option
                        v-for="datas in getDoctorsArray()"
                        :key="datas.registryId">
                        {{ datas.doctorName }}
                    </option>
                </select>
            </div>

            <div class="inputBox">
                <label for="specialization">Specjalizacja:</label>
                <select
                    id="specialization"
                    v-model="specializations">
                    <option
                        disabled
                        value="">
                        Wybierz specjalizację:
                    </option>
                    <option
                        v-for="research in specializationArray"
                        :key="research.specKeyName">
                        {{ research.specName }}
                    </option>
                </select>
            </div>

            <div class="inputBox">
                <label for="typeOfTest">Typ badania:</label>
                <select
                    id="typeOfTest"
                    v-model="typeOfTestPeople">
                    <option
                        disabled
                        value="">
                        Wybierz typ badania:
                    </option>
                    <option
                        v-for="exam in medicExamArray"
                        :key="exam.medicExamKeyName">
                        {{ exam.medicExamName }}
                    </option>
                </select>
            </div>

            <div class="inputBox">
                <label for="dateOfResource"
                    >Wybierz dzień wystawienia skierowania:</label
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
                    tabindex="0"
                    >Zapisz skierowanie</button-component
                >
                <bouncing-balls-component :visible="isLoading" />
                <error-info :message="error" />
                <span
                    v-show="successFlag"
                    class="dataSend"
                    tabindex="0"
                    >Skierowanie zostało przesłane pomyślnie</span
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
    import specializationArray from '../../utils/specializationArray.js';
    import medicExamArray from '../../utils/medicExamArray.js';
    import { computed, ref } from 'vue';
    import { timestamp } from '../../firebase/config.js';
    import useUserStore from '../../stores/userStore.js';
    import useCollection from '../../composables/useCollections.js';

    const { isLoading, addDoc, error } = useCollection('listOfReferrals');

    const userStore = useUserStore();

    const dataDoctor = ref(null);
    const specializations = ref(null);
    const typeOfTestPeople = ref(null);
    const researchDate = ref(null);
    const successFlag = ref(false);

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
                doctorData: dataDoctor.value,
                specializationType: specializations.value,
                testType: typeOfTestPeople.value,
                createdAt: timestamp(),
            });
            if (error.value) throw new Error();
            isLoading.value = false;
            successFlag.value = true;
        } catch (err) {
            console.log(error.value);
        } finally {
            dataDoctor.value = null;
            specializations.value = null;
            researchDate.value = null;
            typeOfTestPeople.value = null;
        }
    };
</script>

<style lang="scss" scoped>
    .referralsBox {
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
        .referralsForm {
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
