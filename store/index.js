import qs from 'qs'
import axios from 'axios'
import Vue from 'vue'

/*
getDefaultState is defined as a function so it can be called
when logging out (to reset VueX State to default)
*/

const getDefaultState = () => {
  return {
    last_poll: '',
    URL_ROOT: 'https://www.beveilig.nu:3000',
    isLoggedIn: false,
    currentId: 0,
    openMobileChat: false,
    status: '',
    user : {},
    blogs: {},
    auth: null,
    token: null,
    counter: 0
  }
}

export const state = () => {
  return {
    last_poll: '',
    URL_ROOT: 'https://www.beveilig.nu:3000',
    isLoggedIn: false,
    currentId: 0,
    openMobileChat: false,
    status: '',
    user : {},
    blogs: {},
    auth: null,
    token: null,
    counter: 0
  }
}

//URL_ROOT: 'https://10.10.10.82:3000',

export const mutations = {
  setUser(state, payload) {
    state[payload.key] = payload.value
  },
  resetUser(state){
    Object.assign(state, getDefaultState());
  },
  uploadVuex(state, payload) {
    let pics = state.user.uploads.length?state.user.uploads:[]
      function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].id === obj.id && list[i].type ===  obj.type && list[i].url === obj.url) {
                return true;
            }
        }
    
        return false;
    }
    let result = containsObject(payload,state.user.uploads)
    if(result){
          console.log('data already existed')
    }
    else{
          pics.push({id: payload.id, url: payload.url, type: payload.type});
          state.user.uploads = pics 
    }
  }
};

export const actions = {
  async login({ commit, dispatch }, body) {
    const { data } = await axios.post('https://www.beveilig.nu:3000/users/authenticate', body)
    commit('setUser', {
      key: 'token',
      value: data.data.token,
    });
    commit('setUser', {
      key: 'user',
      value: data.data.user,
    });
    commit('setUser', {
      key: 'isLoggedIn',
      value: true,
    });
    return data
  },

  async logout({ commit, dispatch }, userName) {
    const data = await axios.post('https://www.beveilig.nu:3000/users/logout', null, { headers: { 'user-name': userName } })
    console.log(data.data.message);
    commit('resetUser');
    return data
  },

  async register({ commit, dispatch}, user) {
    const data = await axios.post('https://www.beveilig.nu:3000/users/register', qs.stringify(user))
    console.log('User Created');
    return data;
  },

  async submitfileaction({commit, dispatch}, fileinfo) {
    let formData = new FormData();
    formData.append('file', fileinfo.file);
    formData.append('userName', fileinfo.username);
    formData.append('type', fileinfo.type);
    const data = await axios.post( 'https://www.beveilig.nu:3000/files/upload/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': fileinfo.token
        },
        onUploadProgress: function( progressEvent ) {
          this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
        }.bind(this)
      })
    if(data.status == 200){
      //console.log(data.data);
      if (fileinfo.type === "profile") {
        //
      }
    }
    //return data;
  },

  async addupload({commit, dispatch}, payload) {
    commit('uploadVuex', {id: payload.id, url: payload.url, type: payload.type});
    // console.log('action:',payload);
    // return payload;
  },

};

/*
  export const login = ({commit}, user) => {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post(URL_ROOT + '/users/authenticate', qs.stringify(user))
        .then(resp => {
          const token = resp.data.data.token
          const userID = resp.data.data.user._id
          const user = resp.data.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', {token, userID, user})
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
  };

  export const register = ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios.post(URL_ROOT + '/users/register', qs.stringify(user))
      .then(resp => {
        console.log('User registered');
        resolve(resp)
      })
      .catch(err => {
        console.log('User not registered');
        commit('auth_error', err)
        localStorage.removeItem('token')
        reject(err)
      })
    })
  };
}
*/
export const getters = {

};
