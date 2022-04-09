<template>
    <div class="auth-login" @submit.prevent="login">
        <div class="login-wrapper">
            <form class="generic-form">
                <h1>Login</h1>
                <input type="text" v-model="username" placeholder="username">
                <input type="password" v-model="password" placeholder="password">
                <button>Submit</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Requests from '../../utils/Requests'

export default Vue.extend({
    data: () => ({
        username: "",
        password: ""
    }),
    methods:{
        async login(){
            console.log("login");
            try{
                const res = await Requests.user.login({name:this.username, password:this.password});
                const res_val = await res.json()
                console.log(res_val);
                this.$store.commit("users/setToken", res_val.token); // NEEDS actual token
            }
            catch(err){
                console.error(err);
            }
            
        }
    }
})
</script>