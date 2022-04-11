<template>
    <div class="multi-card-banner" :class="design">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:["design"]
})
</script>