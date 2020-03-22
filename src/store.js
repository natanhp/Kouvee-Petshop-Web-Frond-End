import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
  		user : localStorage.getItem('user') || '',
  		role : localStorage.getItem('role') || '',
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token){
		    state.status = 'success'
		    state.token = token
        },
        user_id(state, user) {
            state.status = 'success'
            state.user = user
        },
        user_role(state, role) {
            state.status = 'success'
            state.role = role
        },
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
	  	},
	},
	actions: {
	  	login({commit}, user){
	        return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: Vue.prototype.$apiUrl + 'login', data: user, method: 'POST' })
	            .then(resp => {
	                const token = resp.data.token
                    const user = resp.data.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', user.id)
					localStorage.setItem('role', user.role)
					Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
	                commit('auth_success', token)
	                commit('user_id', user.id)
	                commit('user_role', user.role)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	    register({commit}, user){
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:3000/register', data: user, method: 'POST' })
	            .then(resp => {
	                const token = resp.data.token
	                const user = resp.data.user
	                localStorage.setItem('token', token)
	                // Add the following line:
	                axios.defaults.headers.common['Authorization'] = token
	                commit('auth_success', token, user)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
	  	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
	},
	getters : {
	  isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      loggedInEmployee: state => state.user,
      employeeRole: state => state.role
	}
})
