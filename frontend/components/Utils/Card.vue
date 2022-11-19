<template>
    <div class="card-component">
        <div class="card" v-if="cardDesign == 'click'" :class="cardDesign">
            <NuxtLink :to="this.link_url">
                <h4>{{this.heading}}</h4>
                <p>{{this.content}}</p>
            </NuxtLink>
        </div>
        <div class="card" v-else-if="cardDesign == 'list'" :class="cardDesign">
            <h4>{{this.heading}}</h4>
            <div class="list-container">
                <div class="list-item-value-container" v-for="(listItem, index) in getCardList" :key="index">
                    {{listItem}}
                </div>
            </div>
        </div>
        <div class="card" v-else>
            <h4>{{this.heading}}</h4>
            <p>{{this.content}}</p>
            <NuxtLink class="btn" :class="btn_design" v-if="link_url" :to="this.link_url">{{this.link_name}}</NuxtLink>
            <span v-else></span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:["heading", "content", "link_name", "link_url", "btn_design", "cardDesign"],
    computed:{
        getCardList(){
            return this.$props.content.split(",")
        }
    }
})
</script>