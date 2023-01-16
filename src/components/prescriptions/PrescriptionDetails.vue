<template>
    <section v-bind:key="props.id">
        <ul class="documentBox">
            <article>
                <font-awesome-icon :icon="classOfIcon" />
                <h3
                    class="documentBox__header"
                    style="display: inline;">
                    Szczegóły recepty:
                </h3>
            </article>
            <article>
                <font-awesome-icon icon="fa-solid fa-user-doctor" />
                <h5
                    class="documentBox__title"
                    style="display: inline;">
                    Imię i nazwisko lekarza:
                </h5>
                <h6 class="documentBox__data">{{ names }}</h6>
            </article>

            <article>
                <font-awesome-icon icon="fa-solid fa-tablets" />
                <h5
                    class="documentBox__title"
                    style="display: inline;">
                    Nazwa leku:
                </h5>
                <h6 class="documentBox__data">{{ medicines }}</h6>
            </article>

            <article>
                <font-awesome-icon icon="fa-solid fa-repeat" />
                <h5
                    class="documentBox__title"
                    style="display: inline;">
                    Częstotliwość leku:
                </h5>
                <h6 class="documentBox__data">{{ frequencys }}</h6>
            </article>

            <article>
                <font-awesome-icon icon="fa-solid fa-calendar-plus" />
                <h5
                    class="documentBox__title"
                    style="display: inline;">
                    Data wystawienia leku:
                </h5>
                <h6 class="documentBox__data">{{ dates }}</h6>
            </article>
        </ul>
    </section>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        names: {
            type: String,
            default: 'Lekarz',
        },
        dates: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: null,
        },
        frequencys: {
            type: String,
            default: '',
        },
        medicines: {
            type: String,
            default: '',
        },
        idDoc: {
            type: Number,
            default: 0,
        },
    });
    const classOfIcon = computed(() => {
        return 'fa-solid ' + 'fa-circle-info';
    });
</script>
<style lang="scss" scoped>
    .documentBox {
        width: 100%;
        padding: 1rem;
        color: $blue-900;
        background-color: $white;
        @include flex-position(column, nowrap, space-around, center);
        gap: 3rem;
        .header {
            display: inline-block;
            height: 2.5rem;
            width: 2.5rem;
            @include flex-position(column, nowrap, center, center);
            @include text-header4();
            text-align: center;
            color: $blue-900;
            background-color: $white;
        }

        &__data {
            height: 70%;
            padding-top: 10%;
            @include flex-position(column, nowrap, center, center);
            gap: 1rem;
        }
        &__title {
            @include text-header5($font-weight-light);
            color: $blue-900;
        }
    }
</style>
