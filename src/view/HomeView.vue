<template>
    <section class="dashboard">
        <h2 class="dashboard__header">Dashboard</h2>
        <button-component class="dashboard__make_visit">
            Umów wizytę
            <font-awesome-icon icon="fa-solid fa-plus" />
        </button-component>
        <article class="dashboard__bloodResults">
            <h3 class="blood__header">Morfologia</h3>
            <!--      TODO: make blood component    -->
            <ul
                v-for="el in tab"
                :key="el.id">
                <h1>{{ el.name }}</h1>
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
    const tab = [
        { name: 'Kacper', age: 22, id: 1 },
        { name: 'Magda', age: 22, id: 2 },
        { name: 'Kacper', age: 22, id: 3 },
        { name: 'Kacper', age: 22, id: 4 },
    ];
</script>

<style scoped lang="scss">
    .dashboard {
        display: grid;
        place-items: center;
        grid-template-areas:
            'dashboard bmi bmi'
            'visit bmi bmi'
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
        &__make_visit {
            grid-area: visit;
            place-self: flex-start;
        }
        &__bloodResults {
            grid-area: blood;

            max-height: 30vh;
            width: 100%;
            place-self: center;
            overflow-y: scroll;

            .blood__header {
                @include text-header3($font-weight-semiBold);
                color: $blue-900;
            }
            ul {
                height: 5rem;
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
