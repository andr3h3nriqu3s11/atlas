<template>
    <div class="view-savageworlds-sheet">
        <div class="container-char">
            <div class="row">
                <div class="col-md-2 vertical-menu-wrapper">
                    <UtilsVerticalMenu 
                        :json="this.menuItems"
                    />
                </div>
                <div class="content col-md-9">
                    <SheetsSavageWorldsSheet />
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
                    name: "Main Attributes",
                    icon: "settings",
                    action: "v_show_sw_mainattr"
                },
                {
                    name: "Skills",
                    icon: "person",
                    action: "v_show_sw_skills"
                },
                {
                    name: "Actions",
                    icon: "settings_accessibility",
                    action: "v_show_sw_actions"
                },
                {
                    name: "Magic",
                    icon: "sensor_occupied",
                    action: "v_show_sw_magic"
                },
                {
                    name: "Items",
                    icon: "filter_1",
                    action: "v_show_sw_items"
                },
                {
                    name: "Description & Notes",
                    icon: "filter_1",
                    action: "v_show_sw_desc"
                }
            ]
        };
    },
})
</script>