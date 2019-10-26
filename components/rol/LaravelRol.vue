<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container grid-list-md fluid>
        <v-layout wrap row>
            <v-flex xs12 sm12 md12>
                <v-layout wrap row>

                    <v-flex xs12 sm6 md8>
                        <v-text-field
                                prepend-inner-icon="filter_list"
                                solo
                                label="Nombre del rol "></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm3 md2>
                        <v-btn
                                block
                                large
                                class="pt-0 mt-0"
                                color="orange darken-2"
                                dark
                                @click.native="addRolModal=true">Registrar
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 sm3 md2>
                        <v-btn
                                block
                                large
                                class="pt-0 mt-0"
                                color="primary"
                                dark
                                @click="get_roles_all()">Buscar
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs6 sm3 md2 v-for="(rol, i) in roles" :key="i">
                <v-hover>
                    <v-card
                            slot-scope="{ hover }"
                            tile
                            dark
                            style="background-image: url('http://vma.isocked.com/static/bg/23.jpg')">
                        <v-layout align-center justify-space-between column fill-height>
                            {{rol.nombre}}
                            <v-avatar
                                    size="100"
                                    color="grey lighten-4"
                            >
                                <v-img
                                        src="https://img.xda-cdn.com/Lfg4ap0x-RaKzJzQetAr8Fb01l4=/http%3A%2F%2Faravindsagar.github.io%2FEasyLock%2Fimages%2Fapp_icon.png"
                                        alt="avatar">
                                    <v-expand-transition>
                                        <div
                                                v-if="hover"
                                                class="d-flex transition-fast-in-fast-out primary v-card--reveal display-3 white--text"
                                                style="height: 100%;"
                                        >
                                            <v-icon dark>settings</v-icon>
                                        </div>
                                    </v-expand-transition>
                                </v-img>
                            </v-avatar>
                        </v-layout>
                        <v-card-actions class="white pa-2">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" icon @click="edit_rol(rol)">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn color="primary" icon>
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <v-btn color="primary" icon @click="getPermisoFlat(rol)">
                                <v-icon>lock</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-flex>
        </v-layout>


        <v-dialog v-model="addRolModal" scrollable max-width="300px">
            <v-card>
                <v-toolbar dense color="primary" dark>
                    <v-toolbar-title>Nuevo Rol</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text style="height: 200px;">
                    <v-container grid-list-md class="pa-0 ma-0">
                        <v-form ref="addRol" lazy-validation>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field :rules="rules" v-model="rol.nombre" label="Nombre del rol"
                                                  required></v-text-field>
                                </v-flex>
                                <v-flex>
                                    <v-switch v-model="rol.activo">
                                        <template v-slot:label>
                                            {{ rol.activo ? 'Activo' : 'Desactivado'}}
                                        </template>
                                    </v-switch>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" dark text @click="addRolModal = false">Close</v-btn>
                    <v-btn color="blue darken-1" dark text @click="addUpdateRol()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="modalrol" scrollable max-width="600px">
            <v-card>
                <v-toolbar dense dark color="primary">
                    <v-toolbar-title>{{rol.nombre}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark @click.native="modalrol = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text style="height: 500px;" color="blue">
                    <v-container grid-list-xl text-xs-center fluid class="pt-0">
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-list dense expand>
                  <span v-for="(item, i) in rutas" :key="i">
                      <v-list-group v-if="item.children.length > 0">
                           <v-list-item slot="activator" ripple="ripple">
                              <v-list-item-action style="min-width:25px">
                                    <v-checkbox
                                            v-model="tree"
                                            :value="formatObj(item)"
                                            @change="addRoute(formatObj(item))"
                                    >
                                        <template v-slot:label>
                                                   <v-icon color="grey darken-3">{{ item.icono }}</v-icon>
                                        </template>
                                      </v-checkbox>
                               </v-list-item-action>
                               <v-list-item-content>
                                     <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                                </v-list-item-content>
                           </v-list-item>

                            <v-list style="padding: 0px;">
                                    <span v-for="(childone, i) in item.children" :key="i">
                                          <v-list-group v-if="childone.children.length > 0">
                                               <v-list-item slot="activator">
                                                   <v-list-item-action class="ml-4">
                                                         <v-checkbox
                                                                 v-model="tree"
                                                                 :value="formatObj(childone)"
                                                                 @change="addRoute(formatObj(childone))"
                                                         >
                                                         <template v-slot:label>
                                                                    <v-icon
                                                                            color="grey darken-3"
                                                                    >
                                                                       {{ childone.icono }}
                                                                     </v-icon>
                                                          </template>
                                                        </v-checkbox>

                                                    </v-list-item-action>
                                                   <v-list-item-content>
                                                          <v-list-item-title>
                                                          {{ childone.nombre }}
                                                        </v-list-item-title>
                                                    </v-list-item-content>
                                               </v-list-item>
                                               <v-list-tile v-for="(childtwo,index) in childone.children" :key="index">

                                                    <v-list-item-action class="ml-5">
                                                        <v-checkbox
                                                                v-model="tree"
                                                                :value="formatObj(childtwo)"
                                                                @change="addRoute(formatObj(childtwo))"
                                                        >
                                                          <template v-slot:label>
                                                            <v-icon color="grey darken-3">{{ childtwo.icono }}</v-icon>
                                                          </template>
                                                        </v-checkbox>
                                                    </v-list-item-action>
                                                    <v-list-item-content>
                                                      <v-list-item-title>
                                                      <v-icon class="pr-2">{{ childtwo.icon }}</v-icon>{{ childtwo.nombre}}
                                                     </v-list-item-title>
                                                    </v-list-item-content>

                                                  </v-list-tile>

                                                </v-list-group>

                                                 <v-list-item v-else>
                                                    <v-list-item-action class="ml-4">
                                                      <v-checkbox
                                                              v-model="tree"
                                                              :value="formatObj(childone)"
                                                              @change="addRoute(formatObj(childone))"
                                                      >
                                                          <template v-slot:label>
                                                                     <v-icon
                                                                             color="grey darken-3"
                                                                     >
                                                                       {{ childone.icono }}
                                                                     </v-icon>
                                                          </template>
                                                       </v-checkbox>

                                                    </v-list-item-action>
                                                    <v-list-item-content>
                                                      <v-list-item-title>
                                                        {{ childone.nombre }}
                                                      </v-list-item-title>
                                                    </v-list-item-content>
                                                  </v-list-item>
                                           </span>
                                  </v-list>

                        </v-list-group>

                        <v-list-item v-else>
                            <v-list-item-action>
                                <v-checkbox
                                        v-model="tree"
                                        :value="formatObj(item)"
                                        @change="addRoute(formatObj(item))"
                                >
                                    <template v-slot:label>
                                        <v-icon color="grey darken-3">{{ item.icono }}</v-icon>
                                    </template>
                                </v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.nombre }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        </span>
                                </v-list>
                            </v-flex>
                            <v-flex xs6>
                <pre>

                <li v-for="tre in tree" v-if="tre.nombre =='Home'">
                  {{tre}}
                </li>
                </pre>
                            </v-flex>

                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="modalrol = false">Close</v-btn>
                    <v-btn color="blue darken-1" @click="">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {servicesRol} from '~/services/servicesRol'
    import {servicesRutas} from '~/services/servicesRutas'
    import {permisos} from '~/services/permisos.services'
    import {notificationService} from "~/services/notification.service";
    @Component
    export default class LaravelRol extends Vue {
        roles: any = [];
        rules: any = [
            (v:any) => !!v || 'Nombre is requerido',
        ];
        rolespermisos: any = [];
        rol: any = {
            id: 0,
            nombre: '',
            activo: 0
        };
        addRolModal: any = false;
        Roladdmodal: any = false;
        modalrol: any =false;
        rutas: any = [];
        tree: any = [];

        public mounted() {
            this.get_roles_all();
            this.getRutas();
        }

        async addUpdateRol() {
            const ref: any = this.$refs;
            if (ref.addRol.validate()) {
                try {
                    if (this.rol.id === 0) {
                        let data = await servicesRol.addRol(this.rol);
                        this.addRolModal = false;

                        notificationService.Success('Rol Registrado')

                    } else {
                        let data = await servicesRol.updateRol(this.rol);
                        this.addRolModal = false;
                        notificationService.Success('Rol actualizado')
                    }
                } catch (e) {

                }
            }

        }
        async getRutas() {
            let rutas = await servicesRutas.getRutas();
            this.rutas = rutas.data;
        }
       async getPermisoFlat(rol:any) {
            this.rol = rol;
            let permiso = await permisos.flatpermissions(rol.id);
            this.tree = permiso.data
            this.modalrol = true
        }
        async get_roles_all() {
            try {

                let response = await servicesRol.getRoles();
                this.roles = response.data
            } catch (e) {

            }


        }
        edit_rol(item:any) {
            this.rol = item;
            this.addRolModal = true;
        }

        formatObj(item: any) {
            let obj = {
                id: item.id,
                nombre: item.nombre,
                nivel: item.nivel,
                url: item.url,
                icono: item.icono,
                padre: item.padre,
                id_ruta: item.id_ruta,
                activo: item.activo,
                children:[]
            };
            return obj
        }
        async addRoute(data: any) {
            try {
                let permiss = {
                    idrol:this.rol.id,
                    route:data
                };
                let reponse = await permisos.updatePermissionRole(permiss);
                if (reponse.data.permission){
                    notificationService.Success(reponse.data.msj);
                }else {
                    notificationService.Warning(reponse.data.msj)
                }
            }catch (e) {
               notificationService.Success(e.message)
            }
        }
    }
</script>
<style scoped>
    .v-card--reveal {
        align-items: center;
        bottom: 0;
        justify-content: center;
        opacity: .5;
        position: absolute;
        width: 100%;
    }
</style>
