<template>
    <div class="fifth-edition-spell-casting">
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    created(){
        this.$nuxt.$on('v_show_5e_magic', (state:boolean) => {
            this.active = state
        })
    }
})
</script>