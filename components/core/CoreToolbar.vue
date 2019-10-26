<template>
    <section>
        <v-app-bar app
                   height="54"
                   style="background: rgb(22,0,36);
background: linear-gradient(90deg, rgba(22,0,36,1) 0%, rgba(118,9,121,0.5186449579831933) 35%, rgba(166,0,255,1) 100%);"
                   dark>
            <v-toolbar-title style="width: 300px">
                <span class="hidden-sm-and-down">Genda-Spa</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon to="/about">
                <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>{{notificationIcon}}</v-icon>
            </v-btn>
            <v-btn icon large>
                <v-avatar size="32px" tile>
                    <!--<img
                            src="~/assets/logo.png"
                            alt="Vuetify"
                    >-->
                </v-avatar>
            </v-btn>
        </v-app-bar>
    </section>
</template>
<script lang="ts">
    import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
    import {mdiNotificationClearAll} from '@mdi/js'
    @Component
    export default class CoreToolbar extends Vue {
        public drawer: boolean = false;
        @Prop({
            type: Boolean,
            required: true
        })
        public value!: boolean;

        @Emit('input')
        public handleInput() {
            return this.value ? false : true;
        }

        public notificationIcon: string = mdiNotificationClearAll
    }
</script>


<style scoped>

</style>
