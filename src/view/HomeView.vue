<template>
    <section class="dashboard">
        <h2 class="dashboard__header">Dashboard</h2>
        <div class="dashboard__actions">
            <button-component class="dashboard__make_visit">
                Umów wizytę
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button-component>
            <button-component class="dashboard__make_visit">
                Dodaj badanie
                <font-awesome-icon icon="fa-solid fa-droplet" />
            </button-component>
            <button-component class="dashboard__make_visit">
                Dodaj certyfikat / szczepienie
                <font-awesome-icon icon="fa-solid fa-syringe" />
            </button-component>
        </div>

        <article class="dashboard__bloodResults">
            <h3 class="blood__header">Morfologia</h3>
            <ul class="listOfResults">
                <li
                    v-for="bloodResult in bloodResults"
                    :key="bloodResult.researchID">
                    <blood-result
                        :blood-type="bloodResult.bloodType"
                        :date="bloodResult.date" />
                </li>
            </ul>
        </article>
        <article class="dasboard__bmiCalc">
            <h3>Kalkulator BMI</h3>
        </article>
        <article class="dashboard__vaccines">
            <h3>Certyfikaty i szczepienia</h3>
            <div class="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus architecto consequuntur excepturi non nostrum.
                Aspernatur culpa delectus ducimus eaque eos excepturi, illo
                incidunt magnam nam nisi quaerat suscipit temporibus, veritatis?
            </div>
        </article>
        <article class="dashboard__calendar">
            <h3>Kalendarz</h3>
        </article>
    </section>
</template>

<script setup>
    import ButtonComponent from '../components/ButtonComponent.vue';
    import BloodResult from '../components/BloodResult.vue';
    const bloodResults = [
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 12,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 13,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 14,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 15,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 16,
        },
        {
            bloodType: 'AB rh-',
            date: '15-05-2022',
            researchID: 17,
        },
    ];
</script>

<style scoped lang="scss">
    .dashboard {
        display: grid;
        place-items: center;
        grid-template-areas:
            'dashboard dashboard bmi'
            'actions actions bmi'
            'blood blood calendar'
            'blood blood calendar'
            'vaccines vaccines vaccines'
            'vaccines vaccines vaccines';
        margin-inline: 2rem;
        &__header {
            grid-area: dashboard;
            @include text-header1($font-weight-semiBold);
            color: $blue-900;
            place-self: flex-start stretch;
        }
        &__actions {
            grid-area: actions;
            place-self: flex-start;
            width: 90%;
            @include flex-position(row, nowrap, space-around, center);
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
        }
        &__bmiCalc {
            grid-area: bmi;
        }
        &__calendar {
            grid-area: calendar;
            place-self: center;
        }
    }
</style>
