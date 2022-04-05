<template>
    <div class="auth" @submit.prevent="login">
        <form>
            <h1>Login</h1>
            <input type="text" v-model="email" placeholder="email">
            <input type="password" v-model="password" placeholder="password">
            <button>Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        email: "",
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