<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Card from './Card.vue'
import type { Result } from '../interfaces/avatar.interface'

const informationAboutAvatar = ref<Result[]>([])
const count_page = ref<number>(1)
const hasNextValues = ref<boolean>(true)
const filter = ref("")
const response = ref("")

async function nextPage(number: number) {
  if (!hasNextValues.value) return
  count_page.value += number
  await getData(count_page.value)
}
async function PrevPage(number: number) {
  if (count_page.value === 1) return
  count_page.value -= number
  await getData(count_page.value)
}
async function getData(count: number) {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${count}`)
  if (count_page.value == data.info.pages) {
    hasNextValues.value = !hasNextValues.value
  }
  informationAboutAvatar.value = data.results
}

watch(filter, async (filterToSearch:string) => {
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/?name=${filterToSearch}`)
      informationAboutAvatar.value= res.data.results
      response.value=''
    } catch (error) {
      response.value = "We can't found your search"
    }
})

onMounted(async () => {
  await getData(1)
})


</script>

<template>
    <h3>{{response}}</h3>
    <input class="filter" type="text" v-model="filter" placeholder="Filter by name">
    <div class="pagination-section">
      <button  class="btn" @click="PrevPage(1)">Previous page</button>
      <div class="pagination-section_pages">
        <h4>{{ count_page }}</h4>
      </div>
      <button class="btn" @click="nextPage(1)" :disabled="!hasNextValues">Next page</button>
    </div>
  <div class="container_mean">
    <router-link  v-for="avatar in informationAboutAvatar" :to="'/character/'+ avatar.id.toString()">
      <Card >
        <template #image><img class="image_post" :src="avatar.image" :alt="avatar.name"></template>
        <template #heading>{{ avatar.name}}</template>
        <template #origin>Origin: {{avatar.origin.name}}</template>
        <span><strong>Status:</strong> {{avatar.status}}</span>
        <span><strong>Gender:</strong> {{avatar.gender}}</span>
        <span><strong>Location:</strong> {{avatar.location.name}}</span>
      </Card>
    </router-link>
    </div>
    <div class="pagination-section">
      <button class="btn" @click="PrevPage(1)">Previous page</button>
      <div class="pagination-section_pages">
        <h4>{{count_page}}</h4>
      </div>
      <button class="btn" @click="nextPage(1)" :disabled="!hasNextValues">Next page</button>
    </div>
</template>

<style scoped>
.container_mean{
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  min-width: 100%;
}

.filter{
  width: 100%;
  background-color: rgb(88, 88, 88);
  border: none;
  color: #fff;
  padding-bottom: 10px;
  margin-bottom: 10px;
  outline: none;
}

.pagination-section{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-section .pagination-section_pages {
  background-color: rgb(53, 52, 52);
  width: 25px;
  text-align: center;
  border-radius: 50%;
  padding: 2px;
}

span {
  display: block;
  font-size: 18px;
  color: #fff;
  padding: 0px 10px;
}

.btn{
  color: #fff;
  background-color: rgb(88, 88, 88);
  border: none;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover{
  background-color: rgb(58, 58, 58);
  box-shadow: 1px  1px 2px rgb(54, 54, 54);
}

strong{
  font-weight: 600;
}
.image_post {
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  object-fit: cover;
  transition: all 0.5s ease-in-out;
}
.image_post:hover {
  transform: scale(1.2);
}


@media (min-width: 768px) {
  .container_mean{
    grid-template-columns: 1fr 1fr;
  }
  .filter{
    width: 20%;
  }
}

@media (min-width: 1024px) {
  .container_mean{
    grid-template-columns: 1fr 1fr 1fr;
  }
  .filter {
    width: 20%;
  }
}
</style>
