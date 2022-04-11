<template>
    <div class="style-page">
        <h1>For Testing Styles</h1>
        <section class="border-separator">
            <h2>Card Banner</h2>
            <BannersMultiCard design="three">
                <UtilsCard 
                    heading="Variables"
                    content="There are some Variables to be added"
                    link_url="/"
                    link_name="Lorem"
                />
                <UtilsCard 
                    heading="Lorem Ipsum!!"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    link_url="/"
                    link_name="Ipsum!"
                    btn_design="fill"
                />
                <UtilsCard 
                    heading="An app component"
                    content="Use this app to make something new!"
                />
            </BannersMultiCard>
        </section>
        <section class="main-colour">
            <h2>Click Cards</h2>
            <BannersMultiCard design="three">
                <UtilsCard
                    cardDesign="click"
                    heading="Variables"
                    content="There are some Variables to be added"
                    link_url="/"
                />
                <UtilsCard 
                    cardDesign="click"
                    heading="Lorem Ipsum!!"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    link_url="/"
                />
                <UtilsCard 
                    cardDesign="click"
                    heading="An app component"
                    content="Use this app to make something new!"
                    link_url="/"
                />
            </BannersMultiCard>
        </section>
        <section class="border-separator">
            <h2>Generic Form</h2>
            <div class="generic-form-wrapper">
                <form class="generic-form">
                    <div class="input-group">
                        <input type="text" placeholder=" " />
                        <label class="input-label">Text</label>
                    </div>            
                    <div class="input-group">
                        <input type="numeric" placeholder=" " />
                        <label class="input-label">numeric</label>
                    </div>
                    <h4>Radio Selection:</h4>
                    <label>radio 1</label>
                    <input type="radio" />
                    <label>radio 2</label>
                    <input type="radio" />
                    <h4>Checkbox Selection:</h4>
                    <UtilsCheckbox label="React" inputValue="react" v-model="selectedCheckboxes" />
                    <UtilsCheckbox label="Vue" inputValue="vue" v-model="selectedCheckboxes" />
                    <UtilsCheckbox label="Angular" inputValue="angular" v-model="selectedCheckboxes" />
                    <h5 v-if="selectedCheckboxes != 0">Selected Checkboxes:</h5>
                    <ul>
                        
                        <li v-for="(option, index) of selectedCheckboxes" :key="index">
                            {{ option }}
                        </li>
                    </ul>
                    <input class="btn" type="submit" value="Submit">
                    <button class="btn full-width" type="submit">Submit</button>
                </form>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            selectedCheckboxes: [],
        };
    },
})
</script>