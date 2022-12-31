<template>
    <div class="forge-page">
        <div class="apps">
            <h1>Forge</h1>
            <div class="tools-wrapper">
                <div class="tool" v-for="(tool, index) in forge_tools" :key="index">
                    <NuxtLink :to="tool.link">
                        <span class="material-icons">{{tool.icon}}</span>
                        <p>{{tool.name}}</p>
                    </NuxtLink>
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
            forge_tools:[
                {
                    "name":"Campaigns Tool",
                    "link":"/campaigns-page",
                    "icon":"menu_book"
                },
                {
                    "name":"Character Tool",
                    "link":"/characters-page",
                    "icon":"contact_page"
                }
            ]
        }
    }
})
</script>