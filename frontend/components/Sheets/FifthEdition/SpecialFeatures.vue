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
            active:false
        }
    },
    created(){
        this.$nuxt.$on('v_show_5e_special_features', (state:boolean) => {
            this.active = state
        })
    }
})
</script>