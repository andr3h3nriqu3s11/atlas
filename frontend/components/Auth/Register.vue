<template>
    <div class="auth-register">
        <input type="text" v-model="username" placeholder="username">
        <input type="password" v-model="password" placeholder="password">
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        username: "",
        password: ""
    })
})
</script>