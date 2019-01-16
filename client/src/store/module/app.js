import types from '@/store/types';

const initState = {
  manager: null,
  orgnization: null,
  isLogin : false
};
const mutations = {
    [types.mutations.SET_MANAGER](state, { manager }) {
      state.manager = manager
    },
    [types.mutations.SET_ORGNIZATION](state, { orgnization }) {
      state.orgnization = orgnization
    },
    [types.mutations.SET_IS_LOGIN](state, { isLogin }) {
     state.isLogin = isLogin
    }
};

const actions = {
    [types.actions.LOGIN_APP]({ state, commit }, { manager, orgnization }) {
        commit(types.mutations.SET_MANAGER, { manager: manager });
        commit(types.mutations.SET_ORGNIZATION, { orgnization: orgnization });
        commit(types.mutations.SET_IS_LOGIN, { isLogin: true });
    },
    [types.actions.LOGOFF_APP]({ state, commit }, { }) {
        commit(types.mutations.SET_MANAGER, { manager: null });
        commit(types.mutations.SET_ORGNIZATION, { orgnization: null });
        commit(types.mutations.SET_IS_LOGIN, { isLogin: false });
    }
};

const getters = {

};

export default {
  state: initState,
  mutations,
  actions,
  getters,
};
