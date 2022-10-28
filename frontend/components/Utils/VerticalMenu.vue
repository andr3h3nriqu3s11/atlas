<template>
    <div class="vertical-menu">
        <div class="vertical-menu-item" v-for="(item, index) in getMenuList" :key="index">
            <div class="btn" @click="verticalMenuClicked($event)" :attr="item.action">
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
    data() {
        return {
            v_menu:[{}]
        }
    },
    props:["json"],
    computed:{
        getMenuList():any{
            try{
                this.v_menu = this.$props.json
                return this.v_menu
            }
            catch(e){
                console.log("Error - ", e)
                return {}
            }
        }
    },
    methods:{
        verticalMenuClicked(event:any){
            let v_menu_item_name = event.target.getAttribute("attr")
            this.v_menu.forEach((elem: any) => {
                this.$nuxt.$emit(elem.action, false)
            });
            this.$nuxt.$emit(v_menu_item_name, true)
        }
    }
})
</script>