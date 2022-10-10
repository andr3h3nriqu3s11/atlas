<template>
    <div class="vertical-menu">
        <div class="vertical-menu-item" v-for="(item, index) in getMenuList" :key="index">
            <div class="btn">
                <div class="btn_container">
                    <span class="material-icons">{{item.icon}}</span>
                    <a>{{ item.name }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:["json"],
    computed:{
        getMenuList(){
            try{
                return this.$props.json
            }
            catch(e){
                console.log("Error - ", e)
                return {}
            }
        }
    }
})
</script>