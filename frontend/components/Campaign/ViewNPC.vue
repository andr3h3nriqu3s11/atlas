<template>
    <div class="add-NPC-component">
        <div class="container-NPC">
            <div class="row">
                <div class="col-md-2 vertical-menu-wrapper">
                    <UtilsVerticalMenu 
                        :json="this.menuItems"
                    />
                </div>
                <div class="content col-md-9">
                    <SheetsFifthEditionSheet />
                </div>
                <div class="col-md-1">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            menuItems: [
                {
                    name: "Main Stats",
                    icon: "settings",
                    action: ""
                },
                {
                    name: "Special Features",
                    icon: "person",
                    action: ""
                },
                {
                    name: "Actions",
                    icon: "settings_accessibility",
                    action: ""
                },
                {
                    name: "Features & Feats",
                    icon: "diversity_2",
                    action: ""
                },
                {
                    name: "Magic",
                    icon: "sensor_occupied",
                    action: ""
                },
                {
                    name: "Items",
                    icon: "filter_1",
                    action: ""
                },
                {
                    name: "Description & Notes",
                    icon: "filter_1",
                    action: ""
                }
            ]
        };
    },
})
</script>