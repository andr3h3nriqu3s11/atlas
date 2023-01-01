<template>
    <div class="characters-page">
        <div class="character-tabs">
            <div class="btn" v-for="(tab, index) in tabs" :key="index">
                {{tab.name}}
            </div>
            <div class="square-btn btn">
                <span>+</span>
            </div>
        </div>
        <div class="character-select" v-if="this.active">
            <div class="generic-form">
                <select name="settings" id="settings">
                    <option value="all">All</option>
                    <option value="fifthedition">5th Edition</option>
                    <option value="savageworlds">Savage Worlds</option>
                </select>
            </div>
            <div class="character-flex">
                <CharacterAddNewCharacter />
                <CharacterListCharacters />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            active:false,
            tabs:[
                {
                    "name":"Veraxhadon"
                },
                {
                    "name":"The Rogue"
                },
                {
                    "name":"The Red One"
                },
                {
                    "name":"The Eternal Emperor"
                },
                {
                    "name":"Veraxhadon"
                },
                {
                    "name":"The Rogue"
                },
                {
                    "name":"The Red One"
                },
                {
                    "name":"The Eternal Emperor"
                },
                {
                    "name":"Veraxhadon"
                },
                {
                    "name":"The Rogue"
                },
                {
                    "name":"The Red One"
                },
                {
                    "name":"The Eternal Emperor"
                }
            ]
        }
    },
    methods:{
        switchActive(){
            this.active = !this.active
        }
    }
})
</script>