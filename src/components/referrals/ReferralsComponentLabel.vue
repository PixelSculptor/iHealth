<template>
    <li class="documentBox">
        <font-awesome-icon :icon="classOfIcon" />
        <h5 class="documentBox__title">{{ name }}</h5>
        <p class="documentBox__data">{{ date }}</p>
        <button-component
            small
            @click="openModalDetails = true">
            Szczegóły
        </button-component>
        <teleport to="body">
            <transition name="modal">
                <div
                    v-if="openModalDetails"
                    class="modal">
                    <modal-component
                        ref="modalDetils"
                        @close="openModalDetails = false">
                        <referrals-details
                            v-bind:key="getPatientRefferals[index].id"
                            :names="getPatientRefferals[index].doctorData"
                            :dates="getPatientRefferals[index].date"
                            :specializations="
                                getPatientRefferals[index].specializationType
                            "
                            :typeOfTests="
                                getPatientRefferals[index].testType
                            " />
                    </modal-component>
                </div>
            </transition>
        </teleport>
    </li>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { onClickOutside } from '@vueuse/core';
    import ButtonComponent from '../ButtonComponent.vue';
    import ReferralsDetails from './ReferralsDetails.vue';
    import ModalComponent from '../ModalComponent.vue';
    import useUserStore from '../../stores/userStore';

    const openModalDetails = ref(null);
    const modalDetils = ref(null);
    const userStore = useUserStore();
    const { getPatientRefferals } = storeToRefs(userStore);

    onClickOutside(modalDetils, () => (openModalDetails.value = false));

    defineProps({
        name: {
            type: String,
            default: 'Lekarz',
        },
        date: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: null,
        },
        specialization: {
            type: String,
            default: '',
        },
        typeOfTest: {
            type: String,
            default: '',
        },
        index: {
            type: Number,
            default: 0,
        },
    });
    const classOfIcon = computed(() => {
        return 'fa-solid ' + 'fa-clipboard';
    });
</script>

<style lang="scss" scoped>
    .documentBox {
        @include flex-position(row, nowrap, space-between, center);
        width: 100%;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;
        padding: 1rem;
        background-color: $white;
        gap: 5rem;

        &__title {
            @include text-header5($font-weight-light);
            color: $gray-700;
        }

        &__data {
            @include text-paragraph($font-weight-light);
            color: $gray-700;
        }

        &:deep(svg) {
            color: $blue-700;
            height: 3rem;
        }
    }
</style>
