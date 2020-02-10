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
            label="Nama"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Tanggal Lahir"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Jenis Kelamin"
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
            label="Angkatan"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Divisi"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="CV"
            outlined
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Motivation Letter"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            label="Portofolio"
            outlined
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-row no-gutters>
        <v-col align="center">
          <v-btn color="green" text @click="onSubmit">Lolos Tahap 1</v-btn>
      <v-btn color="red" text @click="onSubmit">Undo Tahap 1</v-btn>
      <v-btn color="green" text @click="onSubmit">Lolos Tahap 2</v-btn>
      <v-btn color="red" text @click="onSubmit">Undo Tahap 2</v-btn>
        </v-col>
      </v-row>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  data: () => ({
    icon: '',
    isEdit: false,
    photo: null,
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
    }
  }
}
</script>
