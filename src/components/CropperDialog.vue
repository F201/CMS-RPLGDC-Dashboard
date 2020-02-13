<template>
  <div>
    <img @click="pickFile" v-if="icon" :src="icon" width="130" />
    <img
      v-else 
      @click="pickFile"
      src="@/assets/square.png"
      width="130"
    />
    <ValidationProvider :rules="`image|${required ? 'required': ''}`" ref="imgPicker" v-slot="{ errors }">
      <input
        type="file"
        style="display: none"
        ref="image"
        accept="image/*"
        @change="onChanged($event)"
      />
      <div class="caption red--text">
        {{errors[0]}}
      </div>
    </ValidationProvider>
    <v-dialog v-model="cropmodal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Crop Image</span>
        </v-card-title>
        <v-container fill-height grid-list-md text-xs-center class="pt-0 pb-0">
          <v-layout row wrap align-center justify-center class="pt-2">
            <v-flex xs12 class="pr-2 pl-2">
              <vue-cropper
                :ref="'cropper'"
                alt="Source Image"
                drag-mode="crop"
                :src="icon"
                :view-mode="2"
                :aspectRatio="ratio"
                
                :min-container-width="250"
                :min-container-height="180"
                :img-style="{ width: '300px', height: '300px' }"
              />
              <v-flex class="pt-2">
                <v-btn @click="rotate" v-if="icon != ''">Rotate</v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="closeCrop">
            Close
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            @click="cropImage"
            v-if="photo != null"
          >
            Crop
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { ValidationProvider } from 'vee-validate';

export default {
  props: ['value'],
  components: {
    VueCropper,
    ValidationProvider
  },
  data: () => ({
    cropmodal: false,
    required: true,
    icon: '',
    photo: null,
    ratio: 1/1,
    readonly: false
  }),
  methods: {
    pickFile() {
      if (!this.readonly) this.$refs.image.click();
    },
    async onChanged(event) {
      const { valid } = await this.$refs.imgPicker.validate(event);
      if (event.target.files.length && valid){
        this.cropmodal = true;
        this.photo = event.target.files[0];
        this.$nextTick(function () {
          this.$refs.cropper.replace(URL.createObjectURL(this.photo));
        })
      } else {
        this.icon = ''
      }
    },
    async cropImage() {
      const icon = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.icon = icon;
      const photoName = this.photo.name;
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        const fileUpload = new File([blob], photoName);
        this.photo = fileUpload;
        this.emitChange();
      });
      this.cropmodal = false;
    },
    rotate() {
      this.$refs.cropper.rotate(90);
    },
    async closeCrop() {
      await this.$refs.imgPicker.validate(null);
      this.icon = ''
      this.cropmodal = false;
    },
    emitChange() {
      this.$emit('input', {photo: this.photo});
    },
    changeVal(newVal) {
      if (newVal) {
        this.ratio = newVal.ratio ? newVal.ratio : 1 / 1;
      };
    }
  },
  watch: {
    value(newVal) {
      if (newVal !== undefined) {
        this.readonly = newVal.readonly ? newVal.readonly : false;
        this.required = newVal.required ? true : false;
      };
      if (newVal !== undefined && newVal.icon) {
        this.icon = newVal.icon;
        this.ratio = newVal.ratio ? newVal.ratio : 1 / 1;
      }
    }
  },
  created() {
    // console.log('hehe',this.value, this.value)
    this.changeVal(this.value);
  }
}
</script>

<style>

</style>