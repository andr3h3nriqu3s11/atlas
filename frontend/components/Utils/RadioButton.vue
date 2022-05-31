<template>
    <div class="custom-radio-button-component">
        <span>{{ label }}</span>
        <label class="custom-radio-button-wrapper">
            <input  type="radio" :checked="isChecked" :value="value" @change="$emit('change', $event.target.value)"/>
            <div class="custom-radio-button" :class="{active: isActive}"></div>
        </label>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "RadioButton",
    data: () => ({
        isActive: false
    }),
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        "label": { type: String, default: "", required:true },
        "modelValue": { default: "" },
        "value": { type: String, default: undefined }
    },
    computed: {
        isChecked(this:any) {
            if(this.modelValue == this.value){
                this.isActive = true
            }
            else{
                this.isActive = false
            }
            return this.modelValue == this.value
        }
    }
})
</script>