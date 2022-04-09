<template>
    <div class="card-component">
        <div class="card">
            <h4>{{this.heading}}</h4>
            <p>{{this.content}}</p>
            <NuxtLink v-if="link_url" :to="this.link_url">{{this.link_name}}</NuxtLink>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:["heading", "content", "link_name", "link_url"]
})
</script>