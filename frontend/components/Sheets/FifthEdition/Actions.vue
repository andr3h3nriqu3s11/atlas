<template>
    <div class="fifth-edition-actions">
        Actions
        Bonus Actions
        Reactions
        Legendary Actions
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            active:false,
        }
    },
    created(){
        this.$nuxt.$on('v_show_5e_actions', (state:boolean) => {
            this.active = state
        })
    }
})
</script>