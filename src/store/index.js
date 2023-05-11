import { createStore } from 'vuex'
import axios from "axios"
import auxJson from '@/store/629e39e8b2d31319081e0650.json';

export default createStore({
    state: {
        users: [],
        chatByUser1: [],
        chatByUser2: [],
    },
    getters: {
        getUsers: (state) => state.users,
        getChatUser1: (state) => state.chatByUser1,
        getChatUser2: (state) => state.chatByUser2,
    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                const data = await axios.get('http://localhost:8080/clients.json')
                commit('SET_USERS', data.data)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async fetchChatByUser1({ commit }) {
            try {
                const data = await axios.get('http://localhost:8080/629a8125b2d313190810212f.json')
                commit('SET_CHATUSER1', data.data)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async fetchChatByUser2({ commit }) {
            try {
                // const data = await axios.get('http://localhost:8080/629e39e8b2d31319081e0650.json') /* JSON con mal formato */
                commit('SET_CHATUSER2', auxJson)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        }
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users
        },
        SET_CHATUSER1(state, chatByUser1) {
            state.chatByUser1 = chatByUser1
        },
        SET_CHATUSER2(state, chatByUser2) {
            state.chatByUser2 = chatByUser2
        },
    },
})