<template>
    <div class="fifth-edition-main-stats">
        <div class="attributes-with-skills">
            <div class="row">
                <div class="attribute col-md-2" v-for="(attr, index) in attributes" :key="index">
                    <div class="attribute-container" :class="{proficient : attr.proficient}">
                        <h5>{{attr.name}}</h5>
                        <h4>+{{Math.floor((attr.value - 10) / 2)}}</h4>
                        <h6>{{attr.value}}</h6>
                    </div>
                    <div class="skills-container" v-for="(skill, index) in attr.skills" :key="index">
                        <div class="skill" :class="{proficient : skill.proficient}">
                            <span class="skill-name">{{skill.name}}</span>
                            <span class="skill-value">{{skill.value}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {attribute} from "../../../types/Sheets/fifthedition"

export default Vue.extend({
    data() {
        return {
            attributes: [
                {
                    name: "str",
                    proficient: false,
                    value: 10,
                    skills:[
                        {
                            name: "Atheltics",
                            value: 0,
                            proficient: false
                        }
                    ]
                },
                {
                    name: "dex",
                    proficient: false,
                    value: 16,
                    skills:[
                        {
                            name: "Acrobatics",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Sleight of Hand",
                            value: 0,
                            proficient: true
                        },
                        {
                            name: "Stealth",
                            value: 0,
                            proficient: false
                        }
                    ]
                },
                {
                    name: "con",
                    proficient: true,
                    value: 12,
                    skills:[{}]
                },
                {
                    name: "int",
                    proficient: false,
                    value: 20,
                    skills:[
                        {
                            name: "Arcana",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "History",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Investigation",
                            value: 0,
                            proficient: true
                        },
                        {
                            name: "Nature",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Religion",
                            value: 0,
                            proficient: false
                        }
                    ]
                },
                {
                    name: "wis",
                    proficient: true,
                    value: 15,
                    skills:[
                        {
                            name: "Animal Handling",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Insight",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Medicine",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Perception",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Survival",
                            value: 0,
                            proficient: false
                        }
                    ]
                },
                {
                    name: "cha",
                    proficient: false,
                    value: 11,
                    skills:[
                        {
                            name: "Deception",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Intimidation",
                            value: 0,
                            proficient: false
                        },
                        {
                            name: "Performance",
                            value: 0,
                            proficient: true
                        },
                        {
                            name: "Persuasion",
                            value: 0,
                            proficient: false
                        }
                    ]
                }
            ]
        };
    },
})
</script>