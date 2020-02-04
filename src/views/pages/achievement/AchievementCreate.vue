<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Create Request Access</span>
    </v-card-title>
    <v-container>
      <v-row>
        <v-col cols="3">
          <img v-if="icon" :src="icon" height="130" width="130" />
          <img v-else src="@/assets/square.png" height="130" />
        </v-col>
        <v-col>
          <v-text-field
            label="Judul"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Nama Pemenang"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Peringkat"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Jurusan"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Tahun"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
      <v-btn color="primary darken-1" text @click="onSubmit">Submit</v-btn>
    </v-card-actions>
    <v-dialog v-model="cropmodal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Crop Image</span>
        </v-card-title>
        <v-container fill-height grid-list-md text-xs-center class="pt-0 pb-0">
          <v-layout row wrap align-center justify-center class="pt-2">
            <v-flex xs12 class="pr-2 pl-2">
              <vue-cropper
                ref="cropper"
                alt="Source Image"
                drag-mode="crop"
                :src="icon"
                :view-mode="2"
                :aspectRatio="1 / 1"
                :initialAspectRatio="1 / 1"
                :min-container-width="250"
                :min-container-height="180"
                :img-style="{ width: '300px', height: '300px' }"
              >
              </vue-cropper>
              <v-flex class="pt-2">
                <v-btn @click="rotate" v-if="icon != ''">Rotate</v-btn>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cropmodal = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="cropImage"
            v-if="photo != null || photo_edit != null"
          >
            Crop
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  components: {
    VueCropper
  },
  data: () => ({
    icon: '',
    isEdit: false,
    cropmodal: false,
    photo: null,
    icon_edit: ''
  }),
  methods: {
    onSubmit() {

    },
    pickFile() {
      this.$refs.image.click();
    },
    onChanged(event) {
      if (event.target.files.length){
        this.photo = event.target.files[0];
        this.$refs.cropper.replace(URL.createObjectURL(this.photo));
        this.cropmodal = true;
      }
    },
    cropImage() {
      const icon = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.isEdit ? this.icon_edit = icon : this.icon = icon;
      const photoName = this.isEdit ? this.photo_edit.name : this.photo.name
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        const fileUpload = new File([blob], photoName);
        this.isEdit ? this.photo_edit = fileUpload : this.photo = fileUpload;
      });
      this.cropmodal = false;
    },
    rotate() {
      this.$refs.cropper.rotate(90);
    }
  }
}
</script>
