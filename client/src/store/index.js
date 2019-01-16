import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {};
const files = require.context('./module', false, /\.js$/);
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default new Vuex.Store({
  modules
});
