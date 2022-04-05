<template>
    <div class="session-create" >
        <button v-if="!session_created" @click="create">Create</button>
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
    }
})
</script>