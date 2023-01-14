<template>
    <div class="userIssuesContainer">
        <h3 class="userIssuesContainer__header">
            Uzupełnij informacje o sobie
        </h3>
        <form
            class="userIssuesContainer__form"
            @submit.prevent="handleSaveData">
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

                <div class="inputBox">
                    <label for="antigen">Antygen R: </label>
                    <input
                        id="antigen"
                        v-model="antigenFlag"
                        class="bloodSection__antigenRflag"
                        type="checkbox" />
                </div>
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
                    >Twoje dane zostały zapisane pomyślnie!</span
                >
            </div>
        </form>
    </div>
</template>

<script setup>
    import ButtonComponent from '../../ButtonComponent.vue';
    import BouncingBallsComponent from '../../BouncingBallsComponent.vue';
    import ErrorInfo from '../../ErrorInfo.vue';

    import { typeOfBlood } from '../../../utils/typeOfResources.js';
    import { computed, ref } from 'vue';
    import useUserStore from '../../../stores/userStore.js';
    import { timestamp } from '../../../firebase/config.js';
    import { useUpdateDocument } from '../../../composables/updateDocument.js';

    const userStore = useUserStore();
    // const { addDoc, error } = useCollection('userIssues');
    const { updateDoc, error } = useUpdateDocument('userIssues');

    const antigenFlag = ref(false);
    const bloodType = ref(null);
    const allergies = ref(null);
    const diabetes = ref(false);
    const isOrganDonor = ref(false);
    const isBloodDonor = ref(false);

    const successFlag = ref(false);
    const isLoading = ref(false);

    const bloodGroup = computed(() =>
        antigenFlag.value ? bloodType.value + '+' : bloodType.value + '-'
    );

    const disableAddInfo = computed(
        () => !(bloodType.value && antigenFlag && bloodGroup.value)
    );

    // const handleSaveData = async () => {
    //     try {
    //         isLoading.value = true;
    //         await addDoc({
    //             userId: userStore.getUserId,
    //             bloodType: bloodGroup.value,
    //             allergies: allergies.value,
    //             diabetes: diabetes.value,
    //             isOrganDonor: isOrganDonor.value,
    //             isBloodDonor: isBloodDonor.value,
    //             createdAt: timestamp(),
    //         });
    //         if (error.value) throw new Error();
    //         isLoading.value = false;
    //         successFlag.value = true;
    //     } catch (err) {
    //         console.log(error.value);
    //     } finally {
    //         antigenFlag.value = false;
    //         bloodType.value = null;
    //         allergies.value = null;
    //         diabetes.value = false;
    //         isOrganDonor.value = false;
    //         isBloodDonor.value = false;
    //         isLoading.value = false;
    //     }
    // };

    console.log(userStore.getUserIssues[0].id);

    const handleSaveData = async () => {
        try {
            isLoading.value = true;
            await updateDoc(userStore.getUserIssues[0].id, {
                userId: userStore.getUserId,
                bloodType: bloodGroup.value,
                allergies: allergies.value,
                diabetes: diabetes.value,
                isOrganDonor: isOrganDonor.value,
                isBloodDonor: isBloodDonor.value,
                createdAt: timestamp(),
            });
            if (error.value) throw new Error();
            isLoading.value = false;
            successFlag.value = true;
        } catch (err) {
            console.log(error.value);
        } finally {
            antigenFlag.value = false;
            bloodType.value = null;
            allergies.value = null;
            diabetes.value = false;
            isOrganDonor.value = false;
            isBloodDonor.value = false;
            isLoading.value = false;
        }
    };
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
                gap: 1rem;
                align-self: center;
                position: relative;
                .loader {
                    position: absolute;
                }
            }
            .dataSend {
                color: $color-success;
            }
        }
    }
</style>
