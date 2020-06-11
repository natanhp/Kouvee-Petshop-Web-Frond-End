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
		name : localStorage.getItem('name') || '', 
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
					const user = resp.data.data[0]
                    localStorage.setItem('token', user.token)
                    localStorage.setItem('user', user.id)
					localStorage.setItem('role', user.role)
					localStorage.setItem('name', user.name)
					Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + user.token
	                commit('auth_success', user.token)
	                commit('user_id', user.id)
					commit('user_role', user.role)
					commit('user_name', user.name)
					resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error')
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
	  employeeRole: state => state.role,
	  employeeName: state => state.name
	}
})
