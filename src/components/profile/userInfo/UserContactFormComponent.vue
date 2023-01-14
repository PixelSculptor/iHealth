<template>
    <div class="userContactFormContainer">
        <h3 class="userContactFormContainer__header">Kontakty alarmowe</h3>
        <form
            class="userContactFormContainer__form"
            @submit.prevent="addContact">
            <div class="inputBox">
                <label for="personName">Imię i Nazwisko</label>
                <input
                    id="personName"
                    v-model="personName"
                    required
                    type="text" />
            </div>

            <div class="inputBox">
                <label for="relationship">Związek</label>
                <select
                    id="relationship"
                    v-model="relationshipType"
                    required>
                    <option
                        v-for="rel in relationshipData"
                        :key="rel.relType"
                        :value="rel.relType">
                        {{ rel.name }}
                    </option>
                </select>
            </div>

            <div class="inputBox">
                <label for="phoneNumber">Numer telefonu</label>
                <input
                    id="phoneNumber"
                    v-model="phoneNumber"
                    class="formBlock__input"
                    maxlength="12"
                    minlength="9"
                    placeholder="+48 999 999 999"
                    required
                    type="tel" />
            </div>

            <div class="inputBox">
                <label for="uploadTest">Awatar</label>
                <div
                    class="icon"
                    tabindex="0">
                    <font-awesome-icon icon="fa-solid fa-file-import" />
                </div>
                <input
                    id="uploadTest"
                    class=""
                    type="file"
                    @change="handleChange" />
                <error-info :message="contactAvatarFileError" />
            </div>

            <div class="actionsAndInfo">
                <button-component
                    :disabled="disableAddContact"
                    wide
                    >Dodaj kontakt</button-component
                >
                <bouncing-balls-component :visible="isLoading" />
                <error-info :message="error" />
                <span
                    v-show="successFlag"
                    aria-label="contact imported"
                    class="dataSend"
                    role="presentation"
                    >Kontakt został dodany!</span
                >
            </div>
        </form>
    </div>
</template>

<script setup>
    import ButtonComponent from '../../ButtonComponent.vue';
    import BouncingBallsComponent from '../../BouncingBallsComponent.vue';
    import ErrorInfo from '../../ErrorInfo.vue';

    import { relationshipData } from '../../../utils/relationShip.js';
    import { computed, ref, watch } from 'vue';
    import useCollection from '../../../composables/useCollections.js';
    import ALLOWED_TYPES from '../../../utils/allowedTypes.js';
    import { timestamp } from '../../../firebase/config.js';
    import useStorage from '../../../composables/getImage.js';
    import useUserStore from '../../../stores/userStore.js';

    const { isLoading, addDoc, error } = useCollection('userContacts');
    const { url, uploadImage } = useStorage();

    const userStore = useUserStore();

    const personName = ref(null);
    const phoneNumber = ref(null);
    const contactAvatarFile = ref(null);
    const contactAvatarFileError = ref(null);
    const successFlag = ref(false);
    const relationshipType = ref(
        relationshipData.find(({ relType }) => relType === 'others').relType
    );

    const relationshipName = computed(
        () =>
            relationshipData.find(
                ({ relType }) => relType === relationshipType.value
            ).name
    );
    const disableAddContact = computed(
        () =>
            !(
                personName.value &&
                relationshipType.value &&
                relationshipName.value &&
                phoneNumber.value
            )
    );

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        if (
            selectedFile &&
            ALLOWED_TYPES.includes(selectedFile.type) &&
            selectedFile.type !== 'pdf'
        ) {
            contactAvatarFile.value = selectedFile;
            contactAvatarFileError.value = null;
        } else {
            contactAvatarFile.value = null;
            contactAvatarFileError.value =
                'Please select an image file (jpeg, jpg, png, webp or pdf).';
        }
    };

    const addContact = async () => {
        try {
            if (contactAvatarFile.value) {
                await uploadImage(contactAvatarFile.value);
            }
            console.log(`image uploaded`, url.value);
            await addDoc({
                userId: userStore.getUserId,
                nameAndSurname: personName.value,
                relationshipType: relationshipType.value,
                phoneNumber: phoneNumber.value,
                contactUrl: url.value,
                createdAt: timestamp(),
            });
            if (error.value) throw new Error();
            isLoading.value = false;
            successFlag.value = true;
        } catch (err) {
            error.value = err.message;
            console.log(error.value);
        } finally {
            personName.value = null;
            phoneNumber.value = null;
            contactAvatarFile.value = null;
            contactAvatarFileError.value = null;
            relationshipType.value = 'others';
        }
    };

    console.log(relationshipType.value);
    watch(relationshipType, () => {
        console.log(
            relationshipType.value,
            relationshipName.value,
            personName.value,
            phoneNumber.value,
            contactAvatarFile.value
        );
    });
</script>

<style lang="scss" scoped>
    h3:after {
        position: absolute;
        content: '*';
        width: 1rem;
        height: 1rem;
        color: $color-error;
    }
</style>
