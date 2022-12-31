<template>
    <div class="add-new-character-component">
        <div v-for="(sheet, index) in sheets" :key="index">
            <SheetsNewSheet 
                :sheet_name="sheet.name"
                :sheet_page="sheet.link" 
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            sheets:[
                {
                    "name":"5th Edition",
                    "link":""
                },
                {
                    "name":"Savage Worlds",
                    "link":""
                }
            ]
        }
    }
})
</script>