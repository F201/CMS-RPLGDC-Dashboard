<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col align="center" cols="3">
          <CropperDialog v-model="formData.img" @change="emitChange"/>
        </v-col>
        <v-col cols="7" class="py-0">
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
              <v-row>
                <v-col cols="7" >
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-select
                      :items="itemsDivisi"
                      v-model="formData.divisi"
                      item-text="divisi"
                      item-value="key"
                      label="Divisi"
                      outlined
                      :readonly="formData.readonly"
                      :error-messages="errors"
                      @change="emitChange"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="5">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <v-text-field
                      label="NIM"
                      outlined
                      v-model="formData.nim"
                      :error-messages="errors"
                      :readonly="formData.readonly"
                      @change="emitChange"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center" class="py-0">
        <v-col cols="7">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-text-field
              label="Jurusan"
              outlined
              v-model="formData.jurusan"
              :error-messages="errors"
              :readonly="formData.readonly"
              @change="emitChange"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="3">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-text-field
              label="Angkatan"
              outlined
              v-model="formData.angkatan"
              :error-messages="errors"
              :readonly="formData.readonly"
              @change="emitChange"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row justify="center" class="py-0">
        <v-col cols="5">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-text-field
              label="Tanggal Lahir"
              outlined
              v-model="formData.tgl"
              :error-messages="errors"
              :readonly="formData.readonly"
              @change="emitChange"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="5">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-text-field
              label="Jenis Kelamin"
              outlined
              v-model="formData.gender"
              :error-messages="errors"
              :readonly="formData.readonly"
              @change="emitChange"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row justify="center" class="py-0">
        <v-col cols="5">
          <template v-if="!formData.readonly">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                label="CV"
                outlined
                v-model="formData.cv"
                :error-messages="errors"
                :readonly="formData.readonly"
                @change="emitChange"
              ></v-text-field>
            </ValidationProvider>
          </template>
          <template v-else>
            <!-- <a :href="formData.cv" target="_blank"> -->
              <v-btn block color="primary" outlined @click="downloadPdf(formData.cv)" target="_blank">
                CV
              </v-btn>
            <!-- </a> -->
          </template>
        </v-col>
        <v-col cols="5">
          <template v-if="!formData.readonly">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                label="Motivation letter"
                outlined
                v-model="formData.ml"
                :error-messages="errors"
                :readonly="formData.readonly"
                @change="emitChange"
              ></v-text-field>
            </ValidationProvider>
          </template>
          <template v-else>
            <!-- <a :href="formData.cv" target="_blank"> -->
              <v-btn block color="primary" outlined @click="downloadPdf(formData.ml)" target="_blank">
                Motivation Letter
              </v-btn>
            <!-- </a> -->
          </template>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-textarea
              label="Portofolio"
              outlined
              v-model="formData.portofolio"
              :error-messages="errors"
              :readonly="formData.readonly"
              @change="emitChange"
            ></v-textarea>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CropperDialog from '@/components/CropperDialog';
import { ValidationProvider } from 'vee-validate';

export default {
  props: ['value'],
  components: {
    ValidationProvider,
    CropperDialog
  },
  data: () => ({
    itemsDivisi: [
      {divisi: 'Front-End', key: 'frontend'},
      {divisi: 'Back-End', key: 'backend'},
      {divisi: 'GDC', key: 'gdc'},
      {divisi: 'UI/UX', key: 'uiux'},
      {divisi: 'Mobile', key: 'mobile'},
    ],
    formData: {
      name: '',
      nim: '',
      divisi: '',
      angkatan: '',
      gender: '',
      tgl: '',
      cv: '',
      ml: '',
      img: null,
      readonly: false
    }
  }),
  methods: {
    emitChange() {
      this.$emit('input', this.formData);
    },
    downloadPdf(file) {
      window.open(file.replace('dl.','www.'));
    }
  },
  watch:{
    value(newVal) {
      // console.log('he',newVal)
      this.formData = newVal;
    }
  }
}
</script>

<style>

</style>