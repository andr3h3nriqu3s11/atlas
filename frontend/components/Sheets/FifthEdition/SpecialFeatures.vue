<template>
    <div class="fifth-edition-special-features" v-if="active">
        <div class="Immunities and Resistances">
            <section class="border-separator">
                <h2>Immunities and Resistances</h2>
                <BannersMultiCard design="three">
                    <UtilsCard 
                        cardDesign="list"
                        heading="Damage Resistances"
                        content="Cold, Fire"
                    />
                    <UtilsCard 
                    cardDesign="list"
                        heading="Damage Immunities"
                        content="Bludgeoning, Piercing, Slashing"
                    />
                    <UtilsCard 
                        cardDesign="list"
                        heading="Condition Immunities"
                        content="Charmed"
                    />
                </BannersMultiCard>
            </section>
        </div>
        
        Senses
        Languages

        Special Features
        Background
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            active:false,
            special_features:{
                dmg_res:[
                    "Cold",
                    "Fire"
                ],
                dmg_im:[
                    "Bludgeoning",
                    "Piercing",
                    "Slashing"
                ],
                con_im:[
                    "charmed"
                ],
                senses:[
                    "Darkvision (60.ft)"
                ],
                lang:[
                    "Common",
                    "Infernal",
                    "Celestial",
                    "Dwarvish"
                ],
                spec_feat:[
                    {
                        "heading": "Channel Divinity 1/1",
                        "content": "You start with two channel divinity effects: Turn Undead and an effect determined by your domain."
                    },
                    {
                        "heading": "Action Surge 1/1",
                        "content": "On your turn, you can take one additional action"
                    },
                    {
                        "heading": "Fighting Style (Defense)",
                        "content": "While you are wearing armor, you gain a +1 bonus to AC"
                    }
                ],
                Background:[{
                    "heading":"Cloistered Scholar",
                    "content":[
                        "History, Arcana",
                        "Two Languages (Celestial and Infernal)",
                        "Equipment -The scholar's robes of your cloister, a writing kit (small pouch with a quill, ink, folded parchment and a small penknife), a borrowed book on the subject of your current study (Orcs), and a pouch containing 10 gp"
                    ]
                }]
            }
        }
    },
    created(){
        this.$nuxt.$on('v_show_5e_special_features', (state:boolean) => {
            this.active = state
        })
    }
})
</script>