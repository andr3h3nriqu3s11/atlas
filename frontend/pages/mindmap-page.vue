<template>
    <div class="mindmap-page">
        <UtilsPopupDialog><h2>Header</h2><p>text</p></UtilsPopupDialog>
        <div class="mindmap-container" @click="clickListener($event)"> 
            <MindmapCreateMenu />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods:{
        clickListener(event:any){
            console.log("mouse event ", event);
            let px = event.offsetX
            let py = event.offsetY
            console.log("x is", px);
            console.log("y is", py);
            this.$nuxt.$emit('SetCreateMenu', px, py);
        }
    }
})
</script>