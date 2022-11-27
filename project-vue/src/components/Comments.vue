<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


interface IComment {
    id: string;
    comments: string; 
    avatar: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

defineProps<{
    characterName: string
}>()
const inputComment = ref("")
const id: string = useRoute().params.id.toString()

const comments = ref<IComment[]>([]) 

async function sendComment (characterName: string) {
    if(inputComment.value.trim().length <= 0) return
    const dataToSend = {
        comments: inputComment.value,
        avatarName: characterName,
        avatar: id,
        author: 'Adxell Arango' 
    }

    await axios.post('https://back-microservice-production.up.railway.app/api/comment', dataToSend)
    inputComment.value = ''
    await getComments()
}

async function getComments () {
    const { data } = await axios.get(`https://back-microservice-production.up.railway.app/api/comment/${id}`)
    comments.value = data.message;
}


onMounted(async()=> {
    await getComments()
})

</script>

<template>
    <div class="create-comment">
        <textarea v-model="inputComment" name="" id="" cols="30" rows="10"></textarea>
        <button @click="sendComment(characterName)">
            Add comments
        </button>
    </div>
    <div class="comment-section">
        <h2 v-if="comments.length == 0 ">Loading...</h2>
        <template v-else v-for="comment in comments">
            <div class="comment_comment-section">
                <span>{{comment.comments}}</span>
                <span class="author"><strong>Author: </strong>{{ comment.author }}</span>
                <cite>{{ new Date().getMinutes() - new Date(comment?.createdAt ? JSON.parse(JSON.stringify(comment?.createdAt)) : '').getMinutes() }} mins</cite>
            </div>
        </template>
    </div>
</template>
<style>
.create-comment textarea {
    width: 100%;
    min-width: 100%;
    background-color: rgb(90, 90, 90);
    outline: none;
    color: #fff;
    font-size: 15px;
    min-height: 150px;
}
.comment-section{
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
    color: #fff;
}

.author{
   font-size: small;
   padding-top: 10px;
}

.comment_comment-section{
    background-color: rgb(85, 85, 85);
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 10px;
}
.comment_comment-section span{
    display: block;
}
.comment_comment-section cite{
    display: flex;
    justify-content: end;
    font-size: small;
}
.create-comment button {
    display: flex;
    justify-content: center;
    width: 30%;
    background-color: rgb(90, 90, 90);
    border: none;
    height: 30%;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
}

.create-comment button:hover{
    background-color: rgb(65, 65, 65);
    box-shadow: 1px 1px 3px rgb(65, 64, 64);
    cursor: pointer;
}
</style>