<template>
    <div class="character-sheets-component">
        <div class="character-wrapper" v-for="(character, index) in getCharacters" :key="index">
            <SheetsFifthEditionView v-if="character.type=='FE' && activeID==character.id"/>
            <SheetsSavageWorldsView v-if="character.type=='SW' && activeID==character.id"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            activeID:-1 as number
        }
    },
    created(){
        this.$nuxt.$on('on_character_tab_change', (id:number) => {
            this.activeID = id
        })
    },
    methods:{
    },
    props:["charactersData"],
    computed:{
        getCharacters():any{
            return this.charactersData
        }
    }
})
</script>