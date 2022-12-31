<template>
    <div class="two-col-container-component">
        <div class="feature" v-for="(feature, index) in featuresData" :key="index">
            <p>
                <b>{{feature.section_name}}:</b>
                <span v-for="(value, index) in feature.values" :key="index">
                    <ul v-if="value.heading">
                        <li>
                            <b>{{value.heading}}:</b>
                            <span>{{value.content}}</span>
                        </li>
                    </ul>
                    <span v-else>
                        {{value}}
                    </span>
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
            active:false
        }
    },
    props:["features_data"],
    computed:{
        featuresData(){
            console.log("props: ", this.$props)
            let data:any = this.$props.features_data
            return data
        }
    }
})
</script>