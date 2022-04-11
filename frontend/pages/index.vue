<template>
  <div class="home-page">
    <DashboardHome v-if="this.$store.getters['users/token']"/>
    <AuthAuthenticate v-else />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>
