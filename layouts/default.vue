<template>
    <v-app >
        <CoreMenu></CoreMenu>
        <v-content class="">
            <nuxt/>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from "nuxt-property-decorator"
    import CoreMenu from "../components/core/CoreMenu.vue";

    @Component({
        components: {
            CoreMenu
        }
    })
    export default class Default extends Vue {

    }
</script>
