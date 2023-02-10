<template>
    <div class="character-sheets-component">
        <div class="character-wrapper" v-for="(character, index) in getCharacters" :key="index">
            <SheetsFifthEditionView v-if="character.type=='FE'"/>
            <SheetsSavageWorldsView v-if="character.type=='SW'"/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            
        }
    },
    methods:{
    },
    props:["charactersData"],
    computed:{
        getCharacters(){
            return this.charactersData
        }
    }
})
</script>