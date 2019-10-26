<template>
      <v-dialog v-model="dialog" fullscreen  >
        <v-layout
                fill-height
                row
                justify-center
                align-center
                class="loading-dialog">
          <v-card color="primary" dark width="300">
            <i role="button"
               v-if="close"
               class="v-icon v-chip__close v-icon--link v-icon--right mdi mdi-close-circle"
               style="float: right;margin-right: 1px;margin-top: 2px;"
            >
            </i>
            <v-card-text>
              <v-progress-circular
                      :size="20"
                      :width="2"
                      color="white"
                      indeterminate
                      style="float: left;"
                      class="mr-2 mb-2"
              ></v-progress-circular>
              <div style="float: left;" class="mb-2">
                {{text}}
              </div>
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>

        </v-layout>
      </v-dialog>
</template>
<script lang="ts">
  import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";

  @Component({
    props: {
      dialog:{
        type: Boolean,
        required: true,
        default: false,
      },
      text:{
        type: String,
        default:'Cargando ...',
        required: false,
      },
    },
  })
  export default class Loading extends Vue {
      @Prop({
        type: Boolean,
        required: true,
        default: false,
      })
      public dialog!: boolean;
      @Prop({
        type: String,
        default:'Cargando',
        required: false
      })
      public text!:string;

    @Prop({
      type: Boolean,
      default:false,
      required: false
    })
    public close!:boolean;

  }
</script>

<style scoped>
  .loading-dialog {
    background-color: rgba(255, 255, 255, 0.38);
  }
  .blur {
    content: “ ”;
    background: inherit;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    box-shadow: inset 0 0 0 3000px rgba(255,255,255,0.3);
    filter: blur(10px);
  }

</style>
