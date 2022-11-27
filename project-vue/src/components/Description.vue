<script setup lang="ts">
    import axios from 'axios'
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router';
    import type {Character} from '../interfaces/character.interface'
    import Comments from './Comments.vue'
    const datos = ref<Character>({} as Character)
    const id: string = useRoute().params.id.toString()

    async function getInformation(id: string) {
       const {data} =  await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        datos.value = data
    }
    onMounted(()=> {
       getInformation(id)
    })
</script>
<template>
    <div class="contianer">
        <div class="information-character">
            <div>
                <img :src="datos?.image" :alt="datos?.name">
            </div>
            <div class="left-information">
                <h1>{{datos?.name}}</h1>
                <span><strong>Origin</strong>{{datos?.origin?.name}}</span>
                <span><strong>Status</strong>{{datos?.status}}</span>
                <span><strong>Origin</strong>{{datos?.gender}}</span>
                <span><strong>Location</strong>{{datos?.location?.name}}</span>
                <div class="section-episode">
                    <select>
                        <option>Episode</option>
                        <option v-for="episode in datos.episode">{{episode}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="comments-section">
            <h3>Comments</h3>
            <Comments :character-name="datos.name"/>
        </div>
    </div>
</template>

<style>
.contianer{
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 100%;
}
.information-character span{
    display: block;
}
.information-character img {
    width: 100%;
}

.section-episode{
    padding-top: 10px;
}

select {
    background-color: rgb(70, 69, 69);
    height: 45px;
    border: none;
    outline: none;
    border-radius: 10px;
    font-weight: 600;
    font-family: Arial;
    width: 100%;
}

select option {
    background-color: rgb(81, 81, 82);
    border: none;
    scroll-margin: 10px;
    border-radius: 5px;
}


@media (min-width: 1024px) {
    .information-character {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .left-information{
        padding-left: 20px;
    }
}
@media (min-width: 768px) {
    .information-character {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .left-information{
        padding-left: 20px;
    }
    .left-information span{
        font-size: 20px;
    }
    .left-information h1{
        font-size: 40px;
    }
}
</style>