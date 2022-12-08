<template>
    <form @submit.prevent="handleSubmit">
        <input
            type="email"
            placeholder="email"
            v-model="email" />
        <input
            type="password"
            placeholder="password"
            v-model="password" />
        <button>Sign up</button>
    </form>
</template>

<script>
    import { ref } from 'vue';
    import useSignup from '../composables/useSignup';

    export default {
        setup() {
            const email = ref('');
            const password = ref('');

            const { error, signup } = useSignup();

            const handleSubmit = async () => {
                await signup(email.value, password.value);
                console.log('user signed up');
            };

            return { email, password, handleSubmit, error };
        },
    };
</script>
