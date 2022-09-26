<template>
    <div class="session-create" >
        <button v-if="!session_created" @click="create" class="btn">Create</button>
        <SessionHandler v-else />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        session_created:false
    }),
    methods:{
        create(){
            this.session_created = true
        }
    },
    created(){
        console.log(this.$store.getters['users/token'])
    }
})
</script>