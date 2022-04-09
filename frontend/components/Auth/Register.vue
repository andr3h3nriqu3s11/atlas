<template>
    <div class="auth-register">
        <div class="register-wrapper">
            <form class="generic-form" @submit.prevent="register">
                <h1>Register</h1>
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
        async register(){
            try{
                const res = await Requests.user.create({name:this.username, password:this.password})
                console.log(res);
            }
            catch(err){
                console.error(err);
            }
        }
    }
})
</script>