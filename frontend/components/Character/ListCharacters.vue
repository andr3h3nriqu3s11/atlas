<template>
    <div class="list-characters-component">
        <div class="characters-container">
            <div class="character-wrapper" v-for="(character, index) in characters" :key="index">
                <div class="charcter-content-wrapper">
                    <div class="character-img-wrapper">
                        <img :src="character.img" />
                    </div>
                    <h4>{{character.name}}</h4>
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
            characters:[
                {
                    "img":"https://i.pinimg.com/564x/03/f6/13/03f6135e91b48fef0e1b12f09b224da9.jpg",
                    "name":"Veraxhadon",
                    "id":"1"
                },
                {
                    "img":"https://i.pinimg.com/564x/06/53/98/065398232e9d666800583d9f6d13f14b.jpg",
                    "name":"The Rogue",
                    "id":"2"
                },
                {
                    "img":"https://cdnb.artstation.com/p/assets/images/images/003/734/319/large/atec-min-gyu-lee-1018.jpg?1476925161",
                    "name":"The Red One",
                    "id":"3"
                },
                {
                    "img":"https://i.pinimg.com/564x/7e/eb/50/7eeb50ccfacc650ce91cc0d3f97d4d41.jpg",
                    "name":"The Eternal Emperor",
                    "id":"4"
                }
            ]
        }
    }
})
</script>