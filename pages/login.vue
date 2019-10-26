<template>
    <v-app class="pa-0 ma-0">
        <v-container fluid fill-height class="loginOverlay">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm6 md4 lg3 elevation-6>

                    <v-card style="border-radius: 5px" >
                        <v-card-text class="pt-4">
                            <div>

                                <div class='layout column align-center'>
                                    <h1 class="flex my-4 primary--text">Genda Spa</h1>
                                    <img src='https://pngimage.net/wp-content/uploads/2018/06/logo-agenda-png-4.png' alt='Vue Material Admin' width='120' height='120'>
                                    <br>
                                </div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field
                                            label="E-mail"
                                            v-model="email"
                                            :rules="emailRules"
                                            required
                                    ></v-text-field>
                                    <v-text-field
                                            label="Password"
                                            v-model="password"
                                            min="8"
                                            :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                            @click:append="() => (e1 = !e1)"
                                            :type="e1 ? 'password' : 'text'"
                                            :rules="passwordRules"
                                            counter
                                            required
                                    ></v-text-field>
                                    <v-layout >
                                        <v-btn @click="postLogin"
                                               block
                                               dark
                                               :class="[
                                                   { 'blue darken-4 white--text' : valid, disabled :  !valid }]"
                                               style="background: -webkit-linear-gradient(right, #00dbde, #009688);    transition: all 0.4s;"
                                        >
                                            Login
                                        </v-btn>
                                    </v-layout>

                                    <a href="">Forgot Password</a>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
            <a href="https://unsplash.com/photos/i6Wc5qZO5MQ" target="_blank">
                <v-card class="photoCredit teal">
                    <v-card-title>
                        <div class="white--text">
                            Photo by Tatyana Dobreva on Unsplash
                        </div>
                    </v-card-title>
                </v-card>
            </a>
        </v-container>
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
   // import {authService} from "~/services/auth.service";
   // import {api} from "~/services/Api";
   // import {AuthInterface} from "~/interface/auth.interface";
    const Cookie = process.client ? require('js-cookie') : undefined

    @Component({
        middleware: ['notAuthenticated']
    })
    export default class Login extends Vue {

        public valid: any = false;
        public e1: any = false;
        public password: string = 'marin';
        public passwordRules: any = [
            (v: any) => !!v || 'Password is required',
        ];
        public email: any = 'amisael.amir.misael@gmail.com';
        public emailRules: any = [
            (v: any) => !!v || 'E-mail is required',
            (v: any) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        ];

        public ref: any = this.$refs;

        public async submit() {
            if (this.ref.form.validate()) {
                try {
                    //const res: any  = await authService.login(this.email, this.password);
                    //let data: AuthInterface = api.parseJwt(res.data.accessToken);
                    //await Authenticate.LoginAuth(data);
                    //this.$router.push('/')
                } catch (e) {
                    alert(e.message)
                }
            }

        }

        postLogin() {
            setTimeout(() => { // we simulate the async request with timeout.
                const auth = {
                    accessToken: 'air'
                }
                Cookie.set('auth', auth) // saving token in cookie for server rendering
                this.$store.commit('setAuth', auth) // mutating to store for client rendering
                this.$router.push('/')
            }, 1000)
        }
        public mounted(){

        }

        public clear() {
            this.ref.form.reset();
        }
    }
</script>
<style scoped lang="scss">
    #app {
        background-image: url('https://cdn.shopify.com/s/files/1/1443/5020/products/20180618_infiniteagenda1393_2048x.jpg?v=1539923069');
        background-size: cover;
        overflow:hidden;
    }
    .loginOverlay {
        background:rgba(33,150,243,0.3);
    }
    .photoCredit{
        position: absolute;
        bottom: 15px;
        right: 15px;
    }
    .btn {
        background: -webkit-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff);
        background: -o-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff);
        background: -moz-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff);
        background: linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff);
        top: 0;
        left: -100%;
        -webkit-transition: all 0.4s;
        -o-transition: all 0.4s;
        -moz-transition: all 0.4s;
        transition: all 0.4s;
    }
</style>
