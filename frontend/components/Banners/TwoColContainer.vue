<template>
    <div class="two-col-container-component">
        <div class="feature" v-for="(feature, index) in special_features" :key="index">
            <p>
                <b>{{feature.section_name}}:</b>
                <span v-for="(value, index) in feature.values" :key="index">
                    <ul v-if="value.heading">
                        <li>
                            <b>{{value.heading}}:</b>
                            <span>{{value.content}}</span>
                        </li>
                    </ul>
                    <attr v-else>
                        {{value}}
                    </attr>
                </span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            active:false,
            special_features:[
                {
                    section_name: "Damage Resistances",
                    values: [
                        "Cold",
                        "Fire"
                    ]
                },
                {
                    section_name: "Damage Immunities",
                    values: [
                        "Bludgeoning",
                        "Piercing",
                        "Slashing"
                    ]
                },
                {
                    section_name: "Condition Immunities",
                    values: [
                        "Charmed"
                    ]
                },
                {
                    section_name: "Condition Immunities",
                    values: [
                        "Darkvision (60.ft)"
                    ]
                },
                {
                    section_name: "Languages",
                    values: [
                        "Common",
                        "Infernal",
                        "Celestial",
                        "Dwarvish"
                    ]
                },
                {
                    section_name:"Special Features",
                    values:[
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
                    ]
                },
                {
                    section_name:"Background",
                    values: [
                        {
                            "heading":"Name",
                            "content":"Cloistered Scholar"
                        },
                        {
                            "heading":"Skills",
                            "content":"History, Arcana"
                        },
                        {
                            "heading":"Languages",
                            "content":"Two Languages (Celestial and Infernal)"
                        },
                        {
                            "heading":"Equipment",
                            "content":"The scholar's robes of your cloister, a writing kit (small pouch with a quill, ink, folded parchment and a small penknife), a borrowed book on the subject of your current study (Orcs), and a pouch containing 10 gp"
                        }
                    ]
                }
            ]
        }
    }
})
</script>