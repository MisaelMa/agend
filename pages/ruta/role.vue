<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card color="transparent" class="transparent elevation-0" >
        <v-toolbar
                dark
                flat
        >
                <v-tabs
                        v-model="model"
                        slider-color="blue darken-4"
                        background-color="blue"
                >
                    <v-tab

                            :href="`#tab-1`"
                    >
                     Nest
                    </v-tab>
                    <v-tab
                            :href="`#tab-2`"
                    >
                        Laravel
                    </v-tab>
                </v-tabs>
        </v-toolbar>

        <v-tabs-items v-model="model"
                      :touchless="true"
                      style="background-color: transparent"
                      class="elevation-0"
        >
            <v-tab-item value="tab-1" class="transparent">
                    <NestRol></NestRol>
            </v-tab-item>
            <v-tab-item value="tab-2">

                    <LaravelRol></LaravelRol>
            </v-tab-item>
        </v-tabs-items>
    </v-card>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import LaravelRol from '~/components/rol/LaravelRol.vue';
    import NestRol from '~/components/rol/NestRol';

    @Component({
        components:{
            NestRol,
            LaravelRol
        }
    })
    export default class Roles extends Vue {
        model: any = 'tab-1';
    }
</script>

<style scoped>

</style>
