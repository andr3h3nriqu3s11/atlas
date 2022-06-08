<template>
    <div v-if="active" class="popup-dialog-component">   
        <div class="popup-dialog-wrapper">
            <div class="text-wrapper">
                <slot></slot>
            </div>
            <div class="btn-row">
                <span class="icon-btn material-icons" @click="close_popup_dialog">close</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        callback: () => {},
        active: false
    }),
    created(){
        this.$nuxt.$on('PopupDialogInterface', () => {
            console.log("Event called!");
            this.active = true;
        })
    },
    methods:{
        execute_callback(){
            if(this.callback != (() => {})){
                this.callback();
                this.callback = () => {} // make sure that the callback becomes empty to cannot be spammed!
                this.active = false;
            }
            else{
                console.error("Nothing to confirm!");
            }
        },
        close_popup_dialog(){
            this.active = false;
        }
    }
})
</script>
