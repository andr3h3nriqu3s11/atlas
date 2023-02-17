<template>
    <div class="npc-gen-card-component">
        <div class="npc-gen-card-wrapper">
            <div class="npc-gender">{{NPCInfo.gender}}</div>
            <h3 :class="NPCInfo.occupationCategory" class="npc-name">Name: {{NPCInfo.name}}</h3>
            <h2>Age: {{NPCInfo.age}}</h2>
            <span><b>Occupation:</b> {{NPCInfo.occupation}}</span>
            <span><b>Appearance:</b> {{NPCInfo.appearance}}</span>
            <span><b>Abilities:</b> {{NPCInfo.abilities}}</span>
            <span><b>Talent:</b> {{NPCInfo.talent}}</span>
            <span><b>Mannerism:</b> {{NPCInfo.mannerism}}</span>
            <span><b>Interactions:</b> {{NPCInfo.interactions}}</span>
            <span><b>Ideal:</b> {{NPCInfo.ideal}}</span>
            <span><b>Bond:</b> {{NPCInfo.bond}}</span>
            <span><b>Flaw:</b> {{NPCInfo.flaw}}</span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:["NPCInfo"]
})
</script>