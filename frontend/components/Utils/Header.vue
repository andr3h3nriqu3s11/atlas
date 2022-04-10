<template>
    <div class="header">
        <div v-if="this.$store.getters['users/token']">
            <div class="icon-btn" @click="logOut">
                <span class="material-icons">meeting_room</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    created () {
        this.$nuxt.$on('TokenLogOut', () => {
            this.logOut();
        })
    },
    methods:{
        logOut(){
            this.$store.commit('users/setToken', null)
            this.$router.push('/')
        }
    }
})
</script>