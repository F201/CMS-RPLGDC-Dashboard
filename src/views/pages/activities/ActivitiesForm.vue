<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col align="center" cols="3">
          <CropperDialog v-model="formData.img" @change="emitChange"/>
        </v-col>
        <v-col cols="7">
          <v-row no-gutters>
            <v-col cols="12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Nama"
                  outlined
                  v-model="formData.name"
                  :error-messages="errors"
                  :readonly="formData.readonly"
                  @change="emitChange"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <!-- <v-text-field
                  label="Tanggal"
                  outlined
                  v-model="formData.tanggal"
                  :error-messages="errors"
                  :readonly="formData.readonly"
                  @change="emitChange"
                ></v-text-field> -->
                <v-menu
                  v-model="datePick"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formData.tanggal"
                      label="Tanggal"
                      outlined
                      readonly
                      v-on="on"
                      :error-messages="errors"
                    ></v-text-field>
                  </template>
                  <v-date-picker color="primary" v-model="formData.tanggal" @input="datePick = false"></v-date-picker>
                </v-menu>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-textarea
                  label="Deskripsi"
                  outlined
                  v-model="formData.deskripsi"
                  :error-messages="errors"
                  :readonly="formData.readonly"
                  @change="emitChange"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CropperDialog from '@/views/components/CropperDialog';
import { ValidationProvider } from 'vee-validate';

export default {
  props: ['value'],
  components: {
    ValidationProvider,
    CropperDialog
  },
  data: () => ({
    datePick: false,
    formData: {
      name: '',
      tanggal: '',
      deskripsi: '',
      judul: '',
      img: {
        ratio: 4/3
      },
      readonly: false
    }
  }),
  methods: {
    emitChange() {
      this.$emit('input', this.formData);
    }
  },
  watch:{
    value(newVal) {
      // console.log(newVal)
      this.formData = newVal;
    }
  }
}
</script>

<style>

</style>