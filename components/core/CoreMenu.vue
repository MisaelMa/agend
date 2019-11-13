<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <section>

        <v-navigation-drawer
                v-model="drawer"
                app
                width="250"
        >
            <v-app-bar
                    absolute
                    color="pink darken-4"
                    dark
                    height="54"
                    elevate-on-scroll
                    scroll-target="#scrolling-techniques-7"
            >
                <v-toolbar-title>AGENDA</v-toolbar-title>
            </v-app-bar>
            <br>
            <br>
            <v-divider></v-divider>
            <v-list dense shaped>
                <span v-for="(item, i) in rutasuser" :key="i">
                <v-list-group
                        v-if="item.children.length > 0"
                        group
                >
                    <template v-slot:activator>
                        <v-list-item-icon class="m-0 mr-2">
                              <v-icon>{{ item.icon }}</v-icon>
                         </v-list-item-icon>
                        <v-list-item-title class="ml-0 pl-0">
                            {{ item.name }}
                        </v-list-item-title>
                    </template>
                    <span v-for="(childone, k) in item.children" :key="k">

                    <v-list-group
                            v-if="childone.children.length > 0"
                            sub-group
                            class="ma-0 pa-0"
                    >
                        <template v-slot:activator style="background-color: #0d47a1">

                            <v-list-item-title class="ml-0 pl-0" style="position: relative;float: left;left: -15px;">
                                {{ childone.name }}
                            </v-list-item-title>
                        </template>
                        <FirstList v-for="(childtwo,index) in childone.children"
                                   :secondchild="true"
                                   :item="childtwo"
                                   :key="index"
                                   :to="childtwo.url"></FirstList>

                    </v-list-group>
                    <FirstList v-else
                               :secondchild="true"
                               :item="childone"
                    ></FirstList>
                    </span>

                </v-list-group>
                 <FirstList v-else   :item="item"></FirstList>
                </span>
            </v-list>

        </v-navigation-drawer>

        <core-toolbar v-model="drawer"/>
    </section>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CoreToolbar from "~/components/core/CoreToolbar.vue";
    import FirstList from "~/components/core/FirstList.vue";
    import {createTree} from "~/utils/tree/CreateTree";
    import {servicesRutas} from "~/services/servicesRutas";
    import {sort} from "~/utils/tree";

    @Component({
        components: {
            CoreToolbar,
            FirstList
        }
    })
    export default class CoreMenu extends Vue {
        public drawer = true;

        public rutasuser: any = []

        public async mounted(){
             await this.get_rutas_all();
        }
        public async get_rutas_all() {

            try {
                this.rutasuser = await createTree(await servicesRutas.getRoutes());
                this.rutasuser = await sort({
                    items: this.rutasuser,
                    comparisonProperty: 'level',
                    subArrayName: 'children'
                });
                console.log(this.rutasuser)
               // this.loading = false;
            } catch (e) {
                //this.loading = false;
            }

        }
    }
</script>
