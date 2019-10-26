<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>

        <v-card     max-width="450"
                    class="mx-auto"
        >
            <v-card-title>
                Roles
                <div class="flex-grow-1"></div>
                <v-text-field
                        v-model="search"
                        prepend-inner-icon="filter_list"
                        solo
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
                <br>
                <v-btn
                        block
                        large
                        class="pt-0 mt-0"
                        color="orange darken-2"
                        dark
                        @click.native="addRolModal=true">Registrar
                </v-btn>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="roles"
                    :search="search"
            >
                <template v-slot:item="{item}">
                    <tr>
                        <td>{{item.name}}</td>
                        <td>
                            <v-icon :color="item.isActive ? 'green' : 'red'">
                                mdi-checkbox-multiple-blank-circle
                            </v-icon>
                            {{item.isActive ? 'Activo' : 'Desactivado'}}
                        </td>
                        <td>
                            <v-btn color="primary" icon @click="edit_rol(item)" >
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn color="red darken-1" icon>
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <v-btn color="purple" icon @click="getPermisoFlat(item)" >
                                <v-icon>lock</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="addRolModal" scrollable max-width="300px">
            <v-card style="border-radius: 10px">
                <v-toolbar dense color="primary" dark>
                    <v-toolbar-title>Nuevo Rol</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text style="height: 200px;">
                    <v-container grid-list-md class="ma-0">
                        <v-form ref="addRol" lazy-validation>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field :rules="rules" v-model="rol.name" label="Nombre del rol"
                                                  required></v-text-field>
                                </v-flex>
                                <v-flex>
                                    <v-checkbox v-model="rol.isActive"
                                                class="ma-0"
                                                label="Active"
                                                :false-value="0"
                                                :true-value="1"
                                                style="padding-top: 25px"/>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" dark outlined @click="addRolModal = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" dark outlined @click="addUpdateRol()">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="permisomodal" scrollable max-width="700px">
            <v-card style="border-radius: 5px">
                <v-toolbar dense color="primary" dark>
                    <v-toolbar-title>Permisos</v-toolbar-title>
                </v-toolbar>
                <v-card-text style="height: 450px;">
                    <v-row>
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6"
                               style="border: solid 1px black"
                        >
                            <v-text-field
                                    v-model="searchrutas"
                                    label="Search Path"
                                    dark
                                    flat
                                    solo
                                    hide-details
                                    clearable
                                    clear-icon="mdi-close-circle-outline"
                            ></v-text-field>
                            <v-treeview
                                    v-model="rolespermisos"
                                    :items="rutas"
                                    selection-type="independent"
                                    :search="searchrutas"
                                    :filter="filterrutas"

                                    return-object.id
                            >
                                <template v-slot:prepend="{ item }">
                                    <v-checkbox v-model="rolespermisos"
                                                :value="item.id"
                                                @change="addDelPermission(item.id)"
                                                style="width: 10px; height: 0px"
                                                class="ma-0 mb-7 mr-2"
                                    ></v-checkbox>
                                    <v-btn icon color="primary">
                                        <v-icon v-text="`${item.icon }`"></v-icon>
                                    </v-btn>
                                </template>
                                <template v-slot:label="{ item }">
                                    <a :href="`#${item.url }`">
                                        {{item.name}}
                                    </a>
                                </template>
                            </v-treeview>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6" >
                            {{rolespermisos}}
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" dark outlined @click="permisomodal = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" dark outlined @click="permisomodal = false">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {servicesRol} from '~/services/servicesRol';
    import {notificationService} from '~/services/notification.service';
    import {Rols} from '~/interfaces/components/Rols/Rols';
    import Roles from "~/views/rutas/Roles.vue";
    import Rutas from "~/views/rutas/Rutas.vue";
    import {RoutePath} from '~/interfaces/components/routePath/RoutePath';
    import {servicesRutas} from '~/services/servicesRutas';
    import {sort} from "~/utils/tree";
    import {permisos} from '~/services/permisos.services';
    import {createTree} from '~/utils/tree/CreateTree';

    @Component
    export default class NestRol extends Vue {

        search: any = "";
        public addRolModal: boolean = false;
        public permisomodal: boolean = false;
        public loading: boolean = false;
        public rules: any = [
            (v:any) => !!v || 'Nombre is requerido',
        ];
        public rolespermisos: any = [];
        public searchrutas:string = '';
        public rutas: RoutePath[] = [];
        public routeRoute:RoutePath[] = [];
        get filterrutas() {
            return (item: any, search: any, textKey: any) => item[textKey].indexOf(search) > -1;
        }
        public rol: Rols = {
            id: 0,
            name: '',
            isActive: 0
        };
        headers: any = [
            {
                text: "Nombre",
                align: "left",
                sortable: false,
                value: "name",
            },
            {text: "Estado", value: "isActive"},
            {text: "Acciones", value: ""},
        ];
        public roles: Rols[] = [];
        public async mounted(){
            try {

            this.roles = await servicesRol.getRols();
            let a = await permisos.getPermissionTree(1);
            this.routeRoute = await createTree(a)
            await this.get_rutas_all()
            } catch (e) {
                console.log(e)
            }
        }
        async addUpdateRol() {
            const ref: any = this.$refs;
            if (ref.addRol.validate()) {
                try {
                    if (this.rol.id === 0) {
                        let data = await servicesRol.addRole(this.rol);
                        this.addRolModal = false;
                        notificationService.Success('Rol Registrado')
                        this.roles = await servicesRol.getRols();

                    } else {
                        let data = await servicesRol.updateRole(this.rol);
                        this.addRolModal = false;
                        notificationService.Success('Rol actualizado')
                    }
                } catch (e) {

                }
            }

        }

        edit_rol(item:Rols) {
            this.rol = item;
            this.rol.isActive = item.isActive ? 1 : 0;
            this.addRolModal = true;
        }

        async getPermisoFlat(rol:any) {
            this.rolespermisos = await permisos.getPermissionFlat(rol.id);
            this.rol = rol;
            this.permisomodal = true
            //let permiso = await permisos.flatpermissions(rol.id);
            //this.tree = permiso.data
        }

        public async get_rutas_all() {
            try {
                this.loading = true;
                this.rutas = await servicesRutas.getRoutes();
                this.rutas = await sort({
                        items: this.rutas,
                        comparisonProperty: 'level',
                        subArrayName: 'children'
                    });

                this.loading = false;
            } catch (e) {
                this.loading = false;
            }

        }

        public async addDelPermission(data: any){
            try {

                let permiss = {
                    roleId:this.rol.id,
                    routeId:data
                };

                const con = await permisos.addPermissionRole(permiss);
                notificationService.Success('Permiso agregado');

            }catch (e) {
                notificationService.Success(e.message)
            }
        }
    }
</script>

<style scoped>

</style>
