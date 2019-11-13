<template>
    <v-app>
        <v-content>
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
    export default class Login extends Vue {
    }
</script>
