import { createStore } from 'vuex'
import axios from 'axios'

const Store = createStore({
  state: {
    JSONobject: {},
    TRASHObject: {},
    JSONChouseFile: null,
    FoldersMass: null,
    Answer: null
  },
  mutations: {
    SET_JSONFILE_TO_STATE: (state, file) => {
      state.JSONChouseFile = file
    },
    SET_JSONOBJECT_TO_STATE: (state, response) => {
      state.JSONobject = response
    },
    SET_TRASHOBJECT_TO_STATE: (state, response) => {
      state.TRASHObject = response
    },
    SET_FOLDERMASS_TO_STATE: (state, response) => {
      state.FoldersMass = response
    },
    SET_ANSWER_TO_STATE: (state, response) => {
      state.Answer = response
    }
  },
  actions: {
    GET_JSONFILE_FROM_JSON_OBJECT({ commit }, file) {
      commit('SET_JSONFILE_TO_STATE', file)
    },
    GET_JSON_FROM_SERVER({ commit }) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/loadfiles',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'test=Check1'
      })
        .then((response) => {
          commit('SET_JSONOBJECT_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    GET_TRASH_FROM_SERVER({ commit }) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/loadtrashfiles',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'test=Check2'
      })
        .then((response) => {
          commit('SET_TRASHOBJECT_TO_STATE', response.data.files)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    GET_FOLDERMASS_FROM_SERVER({ commit }) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/loadfolders',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'test=Check3'
      })
        .then((response) => {
          commit('SET_FOLDERMASS_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    PUT_JSONUPLOADFILE_TO_SERVER({ commit }, formData) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/uploadfile',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
        .then((response) => {
          commit('SET_ANSWER_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    PUT_ADDFOLDER_TO_SERVER({ commit }, formData) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/addfolder',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
        .then((response) => {
          commit('SET_ANSWER_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    PUT_EDITFOLDER_TO_SERVER({ commit }, formData) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/editfolder',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
        .then((response) => {
          commit('SET_ANSWER_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    PUT_DELETEFOLDER_TO_SERVER({ commit }, formData) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/deletefolder',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
        .then((response) => {
          commit('SET_ANSWER_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    PUT_RESTOREFILE_TO_SERVER({ commit }, formData) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/gofromtrash',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
        .then((response) => {
          commit('SET_ANSWER_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    PUT_PUTTOTRASH_TO_SERVER({ commit }, formData) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/gototrash',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
        .then((response) => {
          commit('SET_ANSWER_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    PUT_DELETRASHFILE_TO_SERVER({ commit }, formData) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/finalfiledeletion',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
        .then((response) => {
          commit('SET_ANSWER_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    },
    PUT_EDITJSONFILE_TO_SERVER({ commit }, formData) {
      return axios({
        method: 'post',
        url: 'http://localhost:8081/addeditfile',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
      })
        .then((response) => {
          commit('SET_ANSWER_TO_STATE', response.data)
          return response
        })
        .catch((error) => {
          console.log(error)
          return error
        })
    }
  },
  getters: {
    JSONOBJECT(state) {
      return state.JSONobject
    },
    JSONFILE(state) {
      return state.JSONChouseFile
    },
    TRASHOBJECT(state) {
      return state.TRASHObject
    },
    FOLDERMASS(state) {
      return state.FoldersMass
    },
    ANSWER(state) {
      return state.Answer
    }
  },
  modules: {}
})

export default Store
