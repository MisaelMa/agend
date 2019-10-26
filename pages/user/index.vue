<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <section class="views-user">
        <v-container>
            {{user}}
            <v-text-field
                    solo
                    label="Buscar"
                    class="elevation-0 boxshadownone"
                    prepend-inner-icon="mdi-magnify"
            ></v-text-field>
            <v-card>
                <v-card-text>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>My CRUD</v-toolbar-title>
                        <v-divider
                                class="mx-2"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>

                    </v-toolbar>
                        <client-only>

                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            class="elevation-1"
                    >
                        <template v-slot:item="{item}">
                            <td>{{ item.firstname }}</td>
                            <td class="text-xs-right">{{ item.firstname }}</td>
                            <td class="text-xs-right">{{ item.lastname }}</td>
                            <td class="text-xs-right">{{ item.email }}</td>
                            <td class="text-xs-right">{{ item.protein }}</td>
                            <td class="justify-center layout px-0">
                                <v-icon
                                        small
                                        class="mr-2"
                                        @click="editItem(item)"
                                >
                                    mdi-pencil

                                </v-icon>
                                <v-icon
                                        small
                                        @click="deleteItem(item)"
                                >
                                    mdi-delete-variant

                                </v-icon>
                            </td>
                        </template>
                    </v-data-table>
                        </client-only>

                </v-card-text>
            </v-card>
        </v-container>

        <v-dialog v-model="dialog" scrollable max-width="700px" style="border-radius: 10px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
            </template>
            <v-card style="border-radius: 10px">
                <v-card-title class="subheading font-weight-bold">Crear usuario</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="user.firstname" label="Name*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field v-model="user.lastname" label="LastName"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md12>
                                <v-text-field
                                        v-model="user.address"
                                        label="Address*"
                                        persistent-hint
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        v-model="user.electorkey"
                                        label="electorkey*"
                                        persistent-hint
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        v-model="user.telephone"
                                        label="telephone*"
                                        persistent-hint
                                        required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                        v-model="user.id_rol"
                                        :items="roles"
                                        item-text="name"
                                        item-value="id"
                                        label="Rol"
                                        persistent-hint
                                        return-object.id
                                        single-line
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        v-model="user.email"
                                        label="Email*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        v-model="user.password"
                                        label="Password*" type="password" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                        v-model="user.confirm_password"
                                        label="Confirm Password*" type="password" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="blue darken-1"  @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1"  @click="CreateUser">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {userService} from '~/services/user.service'
    import {rolService} from '~/services/rol.services';
    import {CreateUserDTO} from '~/pages/user/interface/CreateUserDTO.interface';

    @Component
    export default class Index extends Vue {
        public drawer = true;
        dialog = false;
        headers = [
            {
                text: 'Dessert (100g serving)',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            {text: 'Calories', value: 'calories'},
            {text: 'Fat (g)', value: 'fat'},
            {text: 'Carbs (g)', value: 'carbs'},
            {text: 'Protein (g)', value: 'protein'},
            {text: 'Actions', value: 'name', sortable: false}
        ];
        editedIndex = -1;
        editedItem = {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        }
        defaultItem = {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0
        }
        select: any = []

        desserts = [];
        public roles: any = [];
        public user: CreateUserDTO = {
            firstname: '',
            lastname: '',
            address: '',
            electorkey: '',
            telephone: '',
            email: '',
            password: '',
            confirm_password: '',
            id_rol: 0,
        };

        get formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }

        async mounted() {
            this.getRols();
            const a = await userService.getUser()
            this.desserts = a.data;
        }

        public async CreateUser() {
            const a = await userService.createUser(this.user);
            console.log(a.data)
        }

        public async getRols() {
            let rol = await rolService.getRols();
            this.roles = rol.data;
        }
    }
</script>
<style scoped lang="css">

</style>
