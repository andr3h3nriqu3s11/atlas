<template>
    <div class="fifth-edition-features">
        <div class="features">

        </div>
        <div class="feats">
            
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    created(){
        this.$nuxt.$on('v_show_5e_features', (state:boolean) => {
            this.active = state
        })
    }
})
</script>