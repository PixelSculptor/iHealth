<template>
    <ul class="userInfoList">
        <user-label-component
            v-for="userRecord in userDataCollection"
            :key="userRecord.key"
            :label="userRecord.key"
            :person-value="userRecord.name" />
    </ul>
</template>

<script setup>
    import useUserStore from '../../stores/userStore.js';
    import { storeToRefs } from 'pinia';
    import { computed, ref } from 'vue';
    import { projectAuth } from '../../firebase/config.js';
    import UserLabelComponent from './UserLabelComponent.vue';

    const userStore = useUserStore();
    const { getUserInfo } = storeToRefs(userStore);

    const email = ref(projectAuth.currentUser.email);
    const phone = ref(
        getUserInfo.value.data[0].phoneNumber?.replace(
            /(?!^)(?=(?:\d{3})+(?:\.|$))/gm,
            ' '
        )
    ); // regex for adding space after each 3 characters
    const dayOfBirth = ref(getUserInfo.value.data[0].dateOfBirth);
    const gender = ref(getUserInfo.value.data[0].gender);
    const weight = ref(getUserInfo.value.data[0].weight + ' kg');
    const height = ref(getUserInfo.value.data[0].height + ' cm');

    const age = computed(() => {
        // computed property to compute age considering checking exact date with month and day
        const currentDate = new Date();
        const ageComponents = dayOfBirth.value.split('-');
        const ageValue = ref(
            currentDate.getFullYear() - parseInt(ageComponents[0])
        );

        if (ageComponents.every((dateElement) => dateElement !== '')) {
            if (currentDate.getMonth() < parseInt(ageComponents[1])) {
                ageValue.value--;
            } else if (currentDate.getDate() < parseInt(ageComponents[2])) {
                ageValue.value--;
            }
        }
        return ageValue.value;
    });

    const userDataCollection = ref([
        { name: email.value, key: 'Email' },
        { name: phone.value, key: 'Telefon' },
        { name: age.value, key: 'Wiek' },
        { name: gender.value, key: 'Płeć' },
        { name: weight.value, key: 'Waga' },
        { name: height.value, key: 'Wzrost' },
    ]);
</script>

<style lang="scss" scoped>
    .userInfoList {
        padding: 1rem;
        height: 100%;
        @include flex-position(column, nowrap, space-evenly, flex-start);
    }
</style>
