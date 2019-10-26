<template>
    <v-list-item :to="item.url" :class="secondchild ? 'ml-3':''">
        <v-list-item-icon class="m-0 mr-2">
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
    </v-list-item>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class FirstList extends Vue {
        @Prop({
            type: Object,
            required: true,
        })
        public item!: string;
        @Prop({
            type: Boolean,
            required: false,
        })
        public secondchild!: boolean;

    }
</script>

<style scoped>

</style>
