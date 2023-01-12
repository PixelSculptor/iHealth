<template>
    <section class="bloodResult">
        <div class="bloodResult__bloodLogo">
            <font-awesome-icon icon="fa-solid fa-droplet" />
        </div>
        <div class="bloodResult__typeOfBlood">
            <h6>Grupa krwi</h6>
            <p>{{ bloodType }}</p>
        </div>
        <div class="bloodResult__dateOfResult">
            <h6>Data badania</h6>
            <p>{{ date }}</p>
        </div>
        <button-component
            class="bloodResult__moreInfo"
            small
            @click="seeDetails">
            Szczegóły
        </button-component>
    </section>
</template>

<script setup>
    import ButtonComponent from '../../ButtonComponent.vue';
    import { openNewCard } from '../../../utils/openNewCard.js';

    const props = defineProps({
        bloodType: {
            type: String,
            default: null,
        },
        date: {
            type: String,
            default: null,
        },
        researchID: {
            type: Number,
            default: null,
        },
        linkDocument: {
            type: String,
            default: null,
        },
    });
    const seeDetails = () => {
        openNewCard(props.linkDocument);
    };
</script>

<style lang="scss" scoped>
    .bloodResult {
        margin: 1rem 0rem;
        border: $border-size solid $gray-300;
        border-radius: $border-radius--normal;
        width: 90%;
        display: grid;
        gap: 5%;
        padding: 1rem;
        background-color: $white;
        place-items: flex-start center;
        grid-template-areas:
            'logo type date'
            'button button button';

        &__bloodLogo {
            grid-area: logo;
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            @include flex-position(row, nowrap, center, center);
            background-color: #f2adbd;
            &:deep(svg) {
                transform: scale(2);
                color: #c2042b;
            }
        }
        &__typeOfBlood,
        &__dateOfResult {
            @include flex-position(column, nowrap, center, center);
        }

        &__typeOfBlood {
            grid-area: type;
        }
        &__dateOfResult {
            grid-area: date;
        }
        &__moreInfo {
            grid-area: button;
            place-self: center;
        }
        &__dateOfResult > h6,
        &__typeOfBlood > h6 {
            @include text-header6(500);
            color: $gray-500;
        }
        &__dateOfResult > p,
        &__typeOfBlood > p {
            @include text-paragraph($font-weight-bold);
            color: $blue-700;
        }
    }
</style>
