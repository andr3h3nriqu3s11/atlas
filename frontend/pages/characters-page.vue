<template>
    <div class="characters-page">
        <div class="character-tabs">
            <div class="btn" v-for="(tab, index) in getTabs" :key="index">
                <div @click="tabSelected(tab.id)">
                    {{tab.name}}
                </div>
            </div>
            <div class="square-btn btn" @click="switchActive">
                <span>+</span>
            </div>
        </div>
        <UtilsOverlayDialog v-if="this.active">
            <div class="character-select">
                <div class="character-flex">
                    <CharacterAddNewCharacter />
                    <CharacterListCharacters />
                </div>
            </div>
            <div class="character-list-btn-close-wrapper">
                <div class="character-list-close-btn btn" @click="switchActive">
                    <span>Close</span>
                </div>
            </div>
        </UtilsOverlayDialog>
        <CharacterListSheets :charactersData="getTabs"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            active:false,
            tabs:[] as Array<any>
        }
    },
    methods:{
        switchActive(){
            this.active = !this.active
        },
        tabSelected(id:number){
            this.$nuxt.$emit("on_character_tab_change", id)
        }
    },
    created () {
        this.$nuxt.$on('AddCharacterView', (data:any) => {
            let tabOpen = false
            this.tabs.forEach((tab:any) => {
                if(tab.id === data.id){
                    console.log("WARNING - Tab already open!")
                    tabOpen = true
                }
            });
            if(!tabOpen){
                this.tabs.push(data)
            }
        }),
        this.$nuxt.$on('SwitchCharacterListVisibility', () => {
            this.switchActive()
        })
    },
    computed:{
        getTabs(){
            let char_tabs:any = this.tabs
            return char_tabs
        }
    }
})
</script>