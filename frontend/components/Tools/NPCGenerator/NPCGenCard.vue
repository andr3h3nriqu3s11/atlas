<template>
    <div class="npc-gen-card-component">
        <p>Name: {{NPCInfo.name}}</p>
        <p>Age: {{NPCInfo.age}}</p>
        <p>Occupation: {{NPCInfo.occupation}}</p>
        <p>Appearance: {{NPCInfo.appearance}}</p>
        <p>Abilities: {{NPCInfo.abilities}}</p>
        <p>Talent: {{NPCInfo.talent}}</p>
        <p>Mannerism: {{NPCInfo.mannerism}}</p>
        <p>Interactions: {{NPCInfo.interactions}}</p>
        <p>Ideal: {{NPCInfo.ideal}}</p>
        <p>Bond: {{NPCInfo.bond}}</p>
        <p>Flaw: {{NPCInfo.flaw}}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:["NPCInfo"]
})
</script>