import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
const cookieparser = process.server ? require('cookieparser') : undefined
import {AuthInterface} from "~/interface/auth.interface";
import {User} from "~/interface/user.interface";
import humbleLocalStorage from 'humble-localstorage';
export interface Auth {
    _ak: string;
    _akus: string;
    _ake: string;
    expiresIn: number;
    issuedAt: number;
    session: boolean;
}
export interface Error {
    isFailed: boolean;
    errorMessage: string;
}

export  interface Result {
    _id: string;
    firstName: string;
    __typename: string;
}
@Module({
    name: "Authenticate",
    stateFactory: true,
    namespaced: true
})
export default class Authenticate extends VuexModule {
    public isLoading: boolean = false;

    public error: Error = {
        isFailed: false,
        errorMessage: '',
    };
    public AuthSession: Auth = {
        _ak: humbleLocalStorage.getItem('_ak') || '',
        _akus:humbleLocalStorage.getItem('_akus') || '',
        _ake:humbleLocalStorage.getItem('_ake') || '',
        expiresIn: parseInt(humbleLocalStorage.getItem('expiresIn') || '0'),
        issuedAt: parseInt(humbleLocalStorage.getItem('issuedAt') || '0'),
        session: JSON.parse(humbleLocalStorage.getItem('session') || 'false'),
    };

    public UserAuth: User = {
        id: parseInt(humbleLocalStorage.getItem('id') || '0'),
        firstname: humbleLocalStorage.getItem('firstname') || '',
        email: humbleLocalStorage.getItem('email') || '',
        email_verified_at: humbleLocalStorage.getItem('email_verified_at') || '',
        updatedAt: humbleLocalStorage.getItem('updatedAt') || '',
        createdAt: humbleLocalStorage.getItem('createdAt') || '',
    };

    public get GetError() {
        return this.error;
    }

    public get isAuthenticated() {
        return this.AuthSession;
    }
    @Mutation
    public LoginAuth( userAuth: AuthInterface ): void {
        //console.log(userAuth)
        this.UserAuth = userAuth.data;
        humbleLocalStorage.setItem('id',  userAuth.data.id);
        humbleLocalStorage.setItem('firstname',  userAuth.data.firstname);
        humbleLocalStorage.setItem('email',  userAuth.data.email);
        humbleLocalStorage.setItem('email_verified_at',  userAuth.data.email_verified_at);
        humbleLocalStorage.setItem('createdAt',  userAuth.data.createdAt);
        humbleLocalStorage.setItem('updatedAt',  userAuth.data.updatedAt);

        this.AuthSession._ak = userAuth.token[0];
        this.AuthSession._akus = userAuth.token[1];
        this.AuthSession._ake = userAuth.token[2];
        this.AuthSession.expiresIn = userAuth.exp;
        this.AuthSession.issuedAt = userAuth.iat;
        this.AuthSession.session = true;

         humbleLocalStorage.setItem('_ak',userAuth.token[0]);
         humbleLocalStorage.setItem('_akus',userAuth.token[1]);
         humbleLocalStorage.setItem('_ake',userAuth.token[2]);
         humbleLocalStorage.setItem('expiresIn', userAuth.exp);
         humbleLocalStorage.setItem('issuedAt', userAuth.iat);
         humbleLocalStorage.setItem('session', true);

    }

    @Mutation
        public LogoutSession(): void {
        this.AuthSession.session = false;
        humbleLocalStorage.clear();

    }
    @Mutation
    public Request(): void {
        this.isLoading = true;
        this.error.isFailed = false;
        this.error.errorMessage = '';
    }

    @Mutation
    public Error(errorMessage: string) {
        this.isLoading = false;
        this.error.isFailed = true;
        this.error.errorMessage = errorMessage;
    }


    @Action
    public async login( user: any ): Promise<any> {
        this.context.commit('LoginAuth', user);
    }

    @Action
    public async logout( user: any ): Promise<any> {
        this.context.commit('LogoutSession');

    }

    @Action
    nuxtServerInit({ commit }:any, { req }:any) {
        let auth = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                auth = JSON.parse(parsed.auth)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setAuth', auth)
    }


}


//console.log(new Date(data.exp*1000).toLocaleTimeString('en-US', { hour12: false,
//  hour: "numeric",
//minute: "numeric"}));
/*if (Date.now() >= exp * 1000) {
    return false;
}*/
//console.log(new Date(data.iat*1000).toLocaleTimeString('en-US', { hour12: false,
//  hour: "numeric",
//minute: "numeric"}));
