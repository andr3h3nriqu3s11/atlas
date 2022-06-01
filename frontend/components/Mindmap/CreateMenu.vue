<template>
    <div class="create-menu-component" :class="{ active: isActive }" :style="{ left: topDist+'px', top: leftDist+'px' }">
        <span @click="createCard($event)">Create Card</span>
        <span @click="createEvent($event)">Create Event</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        isActive:false,
        topDist: 0,
        leftDist: 0
    }),
    created() {
        this.$nuxt.$on('SetCreateMenu', (tDist:number, lDist:number) => {
            console.log("Event called!");
            this.topDist = tDist;
            this.leftDist = lDist;
            this.isActive = true;
        })
    },
    methods:{
        createCard(e: any){
            e.stopPropagation();
            console.log("Create Card");
            this.closeMenu();
        },
        createEvent(e: any){
            e.stopPropagation();
            console.log("Create Event");
            this.closeMenu();
        },
        closeMenu(){
            this.isActive = false;
        }
    }
})
</script>