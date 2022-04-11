<template>
    <div class="authenticate">
        <AuthLogin v-if="is_active"/>
        <AuthRegister v-else/>
        <button @click="changeActive">Change Active</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        is_active: true
    }),
    created(){
        this.$nuxt.$on('changeAuthenticate', () => {
            this.changeActive();
        })
    },
    methods:{
        changeActive () {
            this.is_active = !this.is_active;
        }
    }
})
</script>