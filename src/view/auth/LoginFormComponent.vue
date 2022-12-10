<template>
    <form
        action=""
        @submit.prevent="handleLogin">
        <h2>Zaloguj się do konta</h2>
        <label for="email">E-mail</label>
        <input
            id="email"
            type="email"
            required
            placeholder="abc@gmail.com"
            v-model="email" />
        <label for="password">Hasło</label>
        <input
            id="password"
            type="password"
            minlength="8"
            required
            placeholder="Hasło"
            v-model="password" />
        <div class="error">Error</div>
        <!-- TODO: here button component-->
        <button type="submit">Zaloguj się</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    const email = ref('');
    const password = ref('');
    const handleLogin = () => {
        console.log('Logged in');
        email.value = '';
        password.value = '';
    };

    //  TODO: Write styles for invalid input
</script>

<style scoped lang="scss"></style>
