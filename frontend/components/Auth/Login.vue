<template>
    <div class="auth-login" @submit.prevent="login">
        <form>
            <h1>Login</h1>
            <input type="text" v-model="username" placeholder="username">
            <input type="password" v-model="password" placeholder="password">
            <button>Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        username: "",
        password: ""
    }),
    methods:{
        login(){
            console.log("login")
            this.$store.commit("users/setToken", "Something"); // NEEDS actual token
        }
    }
})
</script>