<template>
    <div class="auth-login">
        <div class="login-wrapper">
            <div class="generic-form-wrapper">
                <form class="generic-form" @submit.prevent="login">
                    <h1>Login</h1>
                    <div class="input-group">
                        <input type="text" v-model="username" placeholder=" " autocomplete="on" />
                        <label class="input-label">username</label>
                    </div>  
                    <div class="input-group">
                        <input type="password" v-model="password" placeholder=" " autocomplete="on" />
                        <label class="input-label">password</label>
                    </div> 
                    <button class="btn full-width">Submit</button>
                </form>
            </div>
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
                console.log(res);
                this.$store.commit("users/setToken", res.token); // NEEDS actual token
            }
            catch(err){
                console.error(err);
            }
            
        }
    }
})
</script>