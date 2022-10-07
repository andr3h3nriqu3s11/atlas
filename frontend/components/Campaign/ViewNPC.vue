<template>
    <div class="add-NPC-component">
        <div class="container-NPC">
            <div class="row">
                <div class="vertical-menu col-md-2">
                    <div class="vertical-menu-item" v-for="(item, index) in menuItems" :key="index">
                        <div class="btn">
                            <div class="btn_container">
                                <span class="material-icons">{{item.icon}}</span>
                                <a>{{ item.name }}</a>
                            </div>
                        </div>
                    </div>
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
                    name: "menu 1",
                    icon: "settings",
                    action: ""
                },
                {
                    name: "menu 2",
                    icon: "person",
                    action: ""
                },
                {
                    name: "menu 3",
                    icon: "settings_accessibility",
                    action: ""
                },
                {
                    name: "menu 4",
                    icon: "diversity_2",
                    action: ""
                },
                {
                    name: "menu 5",
                    icon: "sensor_occupied",
                    action: ""
                },
                {
                    name: "menu 6",
                    icon: "filter_1",
                    action: ""
                }
            ]
        };
    },
})
</script>