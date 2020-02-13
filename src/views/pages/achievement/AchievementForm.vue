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
                  label="Judul"
                  outlined
                  v-model="formData.judul"
                  :error-messages="errors"
                  :readonly="formData.readonly"
                  @change="emitChange"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Tahun"
                  outlined
                  v-model="formData.tahun"
                  :error-messages="errors"
                  :readonly="formData.readonly"
                  @change="emitChange"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Peringkat"
                  outlined
                  v-model="formData.peringkat"
                  :error-messages="errors"
                  :readonly="formData.readonly"
                  @change="emitChange"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
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
    formData: {
      judul: '',
      tahun: '',
      peringkat: '',
      img: null,
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