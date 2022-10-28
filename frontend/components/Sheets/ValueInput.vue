<template>
    <div class="value-input-field-component">
        <input v-if="tag == 'input'" :value="this.value">
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            
        }
    },
    props:["tag", "value"]
})
</script>