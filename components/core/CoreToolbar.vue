<template>
    <section>
        <v-app-bar app
                   height="54"
                   color="transparent"
                   class="elevation-0"
        >
            <v-app-bar-nav-icon @click="handleInput()"></v-app-bar-nav-icon>

            <v-toolbar-title style="width: 300px">
                <span class="hidden-sm-and-down">Genda-Spa</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom
                    close-on-click
                    offset-y
                    origin="center center"
                    max-width="200"
                    transition="scale-transition"
                    class="menucontent"
                    fixed
            >
                <template v-slot:activator="{ on }">
                    <span
                            v-on="on"
                    >
                        <v-avatar size="32px">
                            <img
                                    src="https://demos.creative-tim.com/vue-argon-dashboard/img/theme/team-1-800x800.jpg"
                                    alt="Vuetify"
                            >
                        </v-avatar>
                        <span class="hidden-xs-only">
                            Amir Misael
                        </span>
                    </span>
                </template>
                <v-sheet style="border-radius: 100px">

                    <v-list dense>
                        <v-list-item>
                            !Welcome
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                                @click=""
                        >
                            <v-list-item-icon class="pr-0 mr-6">
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item >
                            <v-list-item-icon class="pr-0 mr-5">
                                <v-icon>mdi-exit-run</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-sheet>
            </v-menu>

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

        items: any = [
            {
                title: 'My Profile',
                icon: 'mdi-account'
            },
            {
                title: 'Settings',
                icon: 'mdi-settings-outline'
            },
            {
                title: 'Activity',
                icon: 'mdi-calendar-text-outline'
            },
            {
                title: 'Support',
                icon: 'mdi-lifebuoy'
            },
        ]
    }
</script>


<style scoped>
    .menucontent {
        border-radius: 50px;
    }

    div.v-menu__content {
        border-radius: 10px !important;
    }
</style>
