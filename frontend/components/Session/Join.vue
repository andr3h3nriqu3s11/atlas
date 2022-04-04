<template>
    <div class="session-join">
        <form>
            <input type="text" v-model="session_url" placeholder="url"/>
            <button>Join</button>
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    data: () => ({
        session_url:""
    }),
})
</script>