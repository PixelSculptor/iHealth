<template>
    <div
        v-for="users in documents"
        :key="users.id">
        <div>
            <img :src="users.avatarUrl" />
        </div>
        <h3>{{ users.title }}</h3>
        <p>created by {{ users.name }}</p>
        <p>{{ users.userId }}</p>
    </div>
</template>

<script>
    import getCollections from '../composables/getCollections.js';
    export default {
        setup() {
            const { error, documents } = getCollections('userProfile');
            return { error, documents };
        },
    };
</script>
<style lang="scss" scoped>
    .dashboard {
        position: relative;
        display: grid;
        place-items: center;
        grid-template-areas:
            'dashboard bmi bmi'
            'actions bmi bmi'
            'vaccines calendar calendar'
            'vaccines calendar calendar'
            'blood blood blood'
            'blood blood blood';
        margin-inline: 2rem;
        &__header {
            grid-area: dashboard;
            @include text-header1($font-weight-semiBold);
            color: $blue-900;
            place-self: center flex-start;
        }
        &__actions {
            grid-area: actions;
            place-self: flex-start;
            width: 100%;
            gap: 2rem;
            @include flex-position(row, nowrap, flex-start, center);
        }
        &__bloodResults {
            grid-area: blood;
            height: 90%;
            width: 100%;
            place-self: flex-start;

            .blood__header {
                @include text-header3($font-weight-semiBold);
                color: $blue-900;
            }
            .listOfResults {
                width: 100%;
                overflow-y: scroll;
                height: 33vh;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
            }
        }
        &__vaccines {
            grid-area: vaccines;
            place-self: flex-start;
            width: auto;
            height: 100%;
        }
        &__bmiCalc {
            grid-area: bmi;
            height: 100%;
            width: 100%;
            place-self: center;
        }
        &__calendar {
            grid-area: calendar;
            place-self: center;
        }
    }
</style>
<style lang="scss">
    .modal {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        @include flex-position(column, nowrap, center, center);
    }
    .modal-enter-active,
    .modal-leave-active {
        transition: all 0.25s ease-out;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
        transform: scale(1.1);
    }
</style>
