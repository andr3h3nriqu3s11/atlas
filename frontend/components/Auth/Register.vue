<template>
    <div class="auth-register">
        <div class="register-wrapper">
            <div class="generic-form-wrapper">
                <form class="generic-form" @submit.prevent="register">
                    <h1>Register</h1>
                    <div class="input-group">
                        <input type="text" v-model="username" placeholder=" " />
                        <label class="input-label">username</label>
                    </div>  
                    <div class="input-group">
                        <input type="password" v-model="password" placeholder=" " />
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
        async register(){
            try{
                const res = await Requests.user.create({name:this.username, password:this.password});
                console.log(res);
                this.$nuxt.$emit("changeAuthenticate");
            }
            catch(err){
                console.error(err);
            }
        }
    }
})
</script>