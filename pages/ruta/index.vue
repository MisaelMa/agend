<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid>
        <v-card
                class="mx-auto"
                max-width="500"
        >
            <v-sheet class="pa-4 primary">
                <v-text-field
                        v-model="search"
                        label="Search Path"
                        dark
                        flat
                        solo-inverted
                        hide-details
                        clearable
                        clear-icon="mdi-close-circle-outline"
                ></v-text-field>
                <v-fab-transition>
                    <v-btn
                            color="pink"
                            fab
                            dark
                            small
                            absolute
                            bottom
                            right
                            @click="close(),routedialog=true"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-fab-transition>
            </v-sheet>
            <v-card-text>
                <v-treeview
                        :items="rutas"
                        :search="search"
                        :filter="filter"
                >

                    <template v-slot:label="{ item }">
                        <v-chip
                                class="v-size--x-small"
                                :color="item.isActive ? 'green':'red'"
                                outlined
                                :href="`#${item.url }`"
                                style="height: 25px"
                        >
                            <v-avatar left>
                                <v-icon v-text="`${item.icon }`"></v-icon>
                            </v-avatar>
                            {{item.level}}.-
                            {{item.name}}
                        </v-chip>
                        <v-divider></v-divider>
                    </template>
                    <template v-slot:append="{ item }">
                        <v-icon color="blue darken-4" @click="edit_ruta(item)">mdi-pencil-outline</v-icon>
                        <v-icon color="red">mdi-delete</v-icon>
                    </template>
                </v-treeview>
            </v-card-text>
        </v-card>

        <v-dialog v-model="routedialog" scrollable max-width="400px">
            <v-card>
                <v-card-title>New Route -
                    <v-icon>
                        {{formRoute.icon}}
                    </v-icon>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 350px;">
                    <v-form ref="routeform">
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="8" md="8" class="pt-0 pb-0">
                                    <v-text-field :rules="rules"
                                                  v-model="formRoute.name"
                                                  label="Name*"
                                                  required/>
                                </v-col>
                                <v-col cols="12" sm="4" md="4" class="pt-0 pb-0">
                                    <v-checkbox v-model="formRoute.isActive"
                                                class="ma-0"
                                                label="Active"
                                                :false-value="0"
                                                :true-value="1"
                                                style="padding-top: 25px"/>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
                                    <v-autocomplete
                                            v-model="formRoute.icon"
                                            label="Icons"
                                            :rules="rules"
                                            :items="iconsList"
                                    >
                                        selection
                                        <template v-slot:selection="{item}">
                                            <v-icon>{{item.value}}</v-icon>
                                            {{item.text}}
                                        </template>
                                        <template v-slot:item="{item}">
                                            <v-icon>{{item.value}}</v-icon>
                                            {{item.text}}
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="9" md="9" class="pt-0 pb-0">
                                    <v-text-field
                                            v-model="formRoute.url"
                                            label="Url"
                                            hint="example of persistent helper text"
                                            persistent-hint
                                            required/>
                                </v-col>
                                <v-col cols="12" sm="3" md="3" class="pt-0 pb-0">
                                    <div style="width: 60px">
                                        <v-select
                                                v-model="formRoute.level"
                                                :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
                                                label="Level"
                                                required
                                                :rules="rules"
                                        />
                                    </div>
                                </v-col>
                                <v-col cols="12" sm="12" class="pt-0 pb-0">
                                    <v-autocomplete
                                            v-model="formRoute.fatherID"
                                            :items="routesflat"
                                            clearable
                                            item-value="id"
                                            item-text="nombre"
                                            label="Parent Route"
                                            @click:clear="setNullParent"
                                            @input="setParent"
                                    >
                                        <template v-slot:selection="{item}">
                                            <v-icon>{{item.icon}}</v-icon>
                                            {{item.name}}
                                        </template>
                                        <template v-slot:item="{item}">
                                            <v-icon>{{item.icon}}</v-icon>
                                            {{item.name}}
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue"
                           outlined
                           @click="close()"
                    >Cancelar
                    </v-btn>
                    <v-btn color="blue"
                           outlined
                           @click="addUpdateRoute()"
                    >Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Loading :dialog="loading"/>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {servicesRutas} from "~/services/servicesRutas";
    import Loading from "~/components/Card.vue";
    import {RoutePath} from "~/interface/components/routePath/RoutePath";
    import {iconMdi} from "~/utils/iconsMdi";
    import {TreeFlat, sort} from "~/utils/tree";
    import {createTree} from "~/utils/tree/CreateTree";

    @Component({
        components: {
            Loading,
        }
    })
    export default class Index extends Vue {
        public mdiArrowLeft = "mdi-menu";
        loading: any = false;
        routedialog: boolean = false;
        public tree: any = [];
        public rutas: RoutePath[] = [];
        public formRoute: RoutePath = {
            id: null,
            isActive: 1,
            name: "",
            fatherID: null,
            level: "",
            url: "",
            icon: "",
        };
        public iconsList: any = [];
        public routesflat: any = [];
        public dialog: any = false;
        public search: any = null;
        public rules: any = [
            (v: any) => !!v || "Requerido",
        ];


        get filter() {
            return (item: any, search: any, textKey: any) => item[textKey].indexOf(search) > -1;
        }

        async mounted() {
            this.iconsList = await iconMdi();
            await this.get_rutas_all();
            this.routesflat = await TreeFlat(this.rutas);
        }

        public async get_rutas_all() {

            try {
                this.loading = true;
                this.rutas = await createTree(await servicesRutas.getRoutes());
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

        public async addUpdateRoute() {
            const ref: any = this.$refs;
            if (ref.routeform.validate()) {
                if (this.formRoute.id === null) {
                    await this.addRoute();
                } else {
                    await this.updateRoute();
                }
                this.routedialog = false;
                await this.get_rutas_all()
            }
        }

        public async addRoute() {
            try {
                delete this.formRoute.id;
                const newroute = await servicesRutas.addRoute(this.formRoute);
                console.log(newroute);
                this.close()
            } catch (e) {
                ;
            }
        }

        public async updateRoute() {
            try {
                const updateRoute = await servicesRutas.updateRoute(this.formRoute);
                console.log(updateRoute);
            } catch (e) {
                ;
            }
        }

        edit_ruta(item: RoutePath) {
            this.formRoute = item;
            // this.formRoute.isActive = item.isActive === true ? 1 : 0;
            this.formRoute.parent = {
                id: item.fatherID,
            };
            delete this.formRoute.children;
            delete this.formRoute.createdAt;
            delete this.formRoute.updatedAt;
            this.routedialog = true;
        }

        public setNullParent() {
            console.log("set null");
            this.formRoute.fatherID = null;
            this.formRoute.parent = {
                id: null,
            };
        }

        public close() {
            this.routedialog = false;
            this.formRoute = {
                id: null,
                isActive: 1,
                name: "",
                fatherID: null,
                level: "",
                url: "",
                icon: "",
            };
        }

        public setParent(id: number) {
            console.log("set val", id);
            if (id) {
                this.formRoute.fatherID = id;
                this.formRoute.parent = {
                    id: id,
                };
            } else {
                this.formRoute.fatherID = null;
                this.formRoute.parent = {
                    id: null,
                };
                if (this.formRoute.id === null) {
                    console.log('delte parent')
                    delete this.formRoute.parent
                }
            }
        }


    }
</script>
