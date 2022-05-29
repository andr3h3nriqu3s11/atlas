<template>
    <div class="custom-checkbox-component">
        <label class="custom-checkbox-wrapper">
            <input  type="checkbox" :value="inputValue"  v-model="model" @click="active"/>
            <div class="custom-checkbox" :class="{active: isActive}"></div>
        </label>
        <span>{{ label }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "Checkbox",
    data: () => ({
        isActive: false
    }),
    props: {
        label: String,
        value: Array,
        inputValue: String,
    },
    computed: {
        model: {
            get(this:any) { // have to declare "this" in order to appease typescript gods, otherwise would have to declare vue into a variable
                return this.value; // get will return value to v-model for component, comes from props
            },
            set(this:any, value) {
                this.$emit("input", value); // this actually emits it out to the outer v-model that then updates the values
            },
        },
    },
    methods:{
        active: function() {
            this.isActive = !this.isActive;
        }
    }
})
</script>