import Vuex from 'vuex'
import MyStoreModule from '~/store/modules/MyStoreModule'

export function createStore() {
    return new Vuex.Store({
        modules: {
            MyStoreModule,
        },
    })
}

/*const cookieparser = process.server ? require("cookieparser") : undefined;

export const state = () => {
    return {
        auth: false
    };
};
export const mutations = {
    setAuth(state:any, auth:any) {
        state.auth = auth;
    }
};*//*
export const actions = {
    nuxtServerInit({ commit }:any, { req }:any) {
        let auth = null;
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                auth = JSON.parse(parsed.auth);
                console.log('amir')
            } catch (err) {
            }
        }
        commit("setAuth", auth);
    }
};
*/