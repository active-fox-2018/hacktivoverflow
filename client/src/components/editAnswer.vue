<template>
    <div style="background-color: white;" class="p-2 mt-5 ml-3 mb-5 row mr-4">
        <form @submit.prevent="edit" style="width: 100%;">
            <h3>
                Your answer:
            </h3>
             <md-field>
                <label>Title</label>
                <md-input class="input-login " v-model="title"></md-input>
            </md-field>
            <wysiwyg v-model="description" />
            <md-button type="submit" class="md-raised float-right" style="background-color: #efefef">update answer</md-button>
        </form>
    </div>
</template>

<script>
import api from '@/api/my.js'
import alertify from 'alertifyjs'

export default {
    name: 'editAnswerForm',
    data () {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        getOne () {
            api({
                method: 'get',
                url: `/answers/${this.$route.params.id}/one`,
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    this.title = data.title
                    this.description = data.description
                })
                .catch(err => {
                    console.log(err.response)
                    alertify.error(`Ooopss something went wrong!`)
                })
        },
        edit() {
            api({
                method: 'put',
                url: `/answers/${this.$route.params.id}`,
                data: {
                    title: this.title,
                    description: this.description
                },
                headers: {
                    token: localStorage.token
                }
            })
                .then(({ data }) => {
                    this.$router.push({ name: 'quesDetail', params: { id: data.question } })
                })
                .catch(err => {
                    alertify.error(`Oopss something went wrong!`)
                })
        }
    },
    created () {
        this.getOne()
    }
}
</script>

<style>

</style>
