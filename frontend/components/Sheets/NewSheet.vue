<template>
    <div class="new-sheet-component">
        <div class="sheet-wrapper">
            <span class="material-icons">note_add</span>
            <h3>{{this.sheet_name}}</h3>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
        }
    },
    props:["sheet_name"]
})
</script>