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
                    action: "v_show_5e_main_stats"
                },
                {
                    name: "Special Features",
                    icon: "person",
                    action: "v_show_5e_special_features"
                },
                {
                    name: "Actions",
                    icon: "settings_accessibility",
                    action: "v_show_5e_actions"
                },
                {
                    name: "Features & Feats",
                    icon: "diversity_2",
                    action: "v_show_5e_features"
                },
                {
                    name: "Magic",
                    icon: "sensor_occupied",
                    action: "v_show_5e_magic"
                },
                {
                    name: "Items",
                    icon: "filter_1",
                    action: "v_show_5e_items"
                },
                {
                    name: "Description & Notes",
                    icon: "filter_1",
                    action: "v_show_5e_desc"
                }
            ]
        };
    },
})
</script>