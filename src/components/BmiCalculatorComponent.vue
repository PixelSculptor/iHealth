<template>
    <section class="bmi-calculator">
        <h3 class="bmi-calculator__header">Body mass index</h3>
        <div class="bmi-calculator__panel">
            <metric-component id="weightInput">
                <input
                    id="weight"
                    type="number"
                    v-model="weight"
                    min="0"
                    max="200" />
                <label for="weight">kg</label>
            </metric-component>
            <metric-component id="heightInput">
                <input
                    id="height"
                    type="number"
                    v-model="height"
                    min="0"
                    max="220" />
                <label for="height">cm</label>
            </metric-component>
            <article class="bmi-calculator__indicator">
                <div class="bmi-calculator__progressBar">
                    <span
                        :class="classBmi"
                        class="statusCheck"></span>
                </div>
                <div
                    class="bmi-calculator__indicator-status"
                    :class="classBmi">
                    {{ bmiStatus }} ({{ computeBmiValue }})
                </div>
            </article>
        </div>
    </section>
</template>

<script setup>
    import MetricComponent from './MetricComponent.vue';
    import { computed, ref, watch } from 'vue';

    //    TODO: pass data from user store
    const weight = ref(65);
    const height = ref(174);

    const computeBmiValue = computed(() => {
        return (weight.value / Math.pow(height.value / 100, 2)).toFixed(2);
    });

    const bmiStatus = computed(() => {
        if (computeBmiValue.value > 0 && computeBmiValue.value <= 18.5) {
            return 'Niedowaga';
        } else if (
            computeBmiValue.value > 18.5 &&
            computeBmiValue.value <= 24.99
        ) {
            return 'Waga prawidłowa';
        } else if (computeBmiValue.value > 25) {
            return 'Otyłość';
        }
        return null;
    });

    const classBmi = computed(() => {
        switch (bmiStatus.value) {
            case 'Niedowaga':
                return 'low';
            case 'Waga prawidłowa':
                return 'good';
            case 'Otyłość':
                return 'high';
            default:
                return null;
        }
    });

    watch(weight, () => {
        console.log(bmiStatus.value, classBmi.value);
    });
</script>

<style scoped lang="scss">
    .bmi-calculator {
        height: 100%;
        @include flex-position(column, nowrap, space-around, center);
        &__header {
            color: $blue-900;
        }
        &__panel {
            width: 70%;
            height: 60%;
            background-color: $white;
            border: $border-size solid $gray-300;
            border-radius: $border-radius--rounded;
            padding: 1rem;
            display: grid;
            grid-template-areas:
                'weight - height'
                'indicator indicator indicator';
            place-items: center;
        }

        #weightInput {
            grid-area: weight;
        }

        #heightInput {
            grid-area: height;
        }
        &__indicator {
            grid-area: indicator;
            width: 90%;
            height: 100%;
            @include flex-position(column, nowrap, space-around, center);
            gap: 0.2rem;
        }
        &__progressBar {
            border: $border-size solid $blue-100;
            border-radius: $border-radius--rounded;
            background-color: $blue-100;
            width: 90%;
            height: 50%;
            display: grid;
            .statusCheck {
                display: block;
                width: 30%;
                background-color: $blue-100;
                height: 100%;
                border-radius: $border-radius--rounded;
            }
        }
        &__indicator-status {
            @include text-paragraph;
        }
        div.low {
            color: $color-warining;
        }
        span.low {
            background-color: $color-warining;
            place-self: flex-start;
        }

        div.good {
            color: $color-success;
        }
        span.good {
            background-color: $color-success;
            place-self: center;
        }

        div.high {
            color: $color-error;
        }
        span.high {
            background-color: $color-error;
            place-self: flex-end;
        }
    }
</style>
