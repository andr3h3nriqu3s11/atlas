<template>
    <div class="npc-gen-component">
        <form class="generic-form">
            <input type="number" v-model="npc_to_gen_num" />
        </form>
        <div class="btn" @click="generateNPC">Generate NPC</div>
        <div class="npc-generated-cards">
            <div class="generated-npc-wrapper" v-for="(npc, index) in getNPCs" :key="index">
                <ToolsNPCGeneratorNPCGenCard :NPCInfo="npc" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NPCData from "../../../data/tools/NPCGenerator/NPCGenerationData.json"
import NPCNames from "../../../data/tools/NPCGenerator/NPCNames.json"
export default Vue.extend({
    data() {
        return {
            npc_to_gen_num:1,
            npcs: [] as any
        }
    },
    methods:{
        getRandomAttribute(data:any){
            let keys = Object.keys(data)
            let values:any = data
            return values[Math.floor(Math.random() * keys.length)]
        },
        generateNPC(){
            this.npcs = []
            for (let i = 0; i < this.npc_to_gen_num; i++) {
                this.npcs.push(this.makeNPCData())
            }
        },
        makeNPCData() : JSON {
            let npc_data:any = {}

            let OccupationKeys = Object.keys(NPCData.Occupations)
            let OccupationValues:any = NPCData.Occupations
            let occupationCategory:string = OccupationKeys[Math.floor(Math.random() * OccupationKeys.length)]
            let occupations = OccupationValues[occupationCategory]
            let occupation = occupations[Math.floor(Math.random() * occupations.length)]
            
            npc_data.name = this.getRandomAttribute(NPCNames.HumanMaleFirst) + " " + this.getRandomAttribute(NPCNames.HumanLast)
            npc_data.age = Math.floor(Math.random() * 110)
            npc_data.occupation = occupation
            npc_data.occupationCategory = occupationCategory
            npc_data.appearance = this.getRandomAttribute(NPCData.Appearance)
            npc_data.abilities = this.getRandomAttribute(NPCData.Abilities)
            npc_data.talent = this.getRandomAttribute(NPCData.Talent)
            npc_data.mannerism = this.getRandomAttribute(NPCData.Mannerism)
            npc_data.interactions = this.getRandomAttribute(NPCData.Interactions)
            npc_data.ideal = this.getRandomAttribute(NPCData.Ideal)
            npc_data.bond = this.getRandomAttribute(NPCData.Bond)
            npc_data.flaw = this.getRandomAttribute(NPCData.Flaw)
            return npc_data
        }
    },
    computed:{
        getNPCs() : any{
            return this.npcs
        }
    }
})
</script>