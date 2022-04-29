import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: "SET_USER",
  SET_DIALOG_SHOW: "SET_DIALOG_SHOW",
};
const state = {
  isAuthenticated: false,
  user: {},
  dialog: {
    show: false,
    title: "",
    option: "edit"
  }
};
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  dialog: state => state.dialog
};
const mutations = {
  [types.SET_AUTHENTICATED] (state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },
  [types.SET_USER] (state, user) {
    if (user) state.user = user;
    else state.user = {};
  },
  [types.SET_DIALOG_SHOW] (state, dialog) {
    if (dialog.show) state.dialog = dialog;
    else state.dialog.show = false;
  }
};
const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  setDialogShow: ({ commit }, dialog) => {
    commit(types.SET_DIALOG_SHOW, dialog);
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
