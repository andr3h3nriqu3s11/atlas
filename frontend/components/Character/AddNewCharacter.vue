<template>
    <div class="add-new-character-component">
        <div class="add-new-character-btn btn" @click="switchActive">
            <span class="material-icons">note_add</span>
            <span class="text">Add New</span>
        </div>
        <UtilsOverlayDialog v-if="this.active">
            <div class="tools-wrapper">
                <div class="tool" v-for="(sheet, index) in sheets" :key="index">
                    <span class="material-icons">note_add</span>
                    <h3>{{sheet.name}}</h3>
                </div>
            </div>
            <div class="btn" @click="switchActive">
                <span>Close</span>
            </div>
        </UtilsOverlayDialog>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            active:false,
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
    },
    methods:{
        switchActive(){
            this.active = !this.active
        }
    }
})
</script>