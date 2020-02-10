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
                  :disabled="formData.disabled"
                  @change="emitChange"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Jabatan"
                  outlined
                  v-model="formData.jabatan"
                  :error-messages="errors"
                  :disabled="formData.disabled"
                  @change="emitChange"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider rules="required|numeric" v-slot="{ errors }">
                <v-text-field
                  label="Order"
                  outlined
                  v-model="formData.order"
                  :error-messages="errors"
                  :disabled="formData.disabled"
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
      name: '',
      jabatan: '',
      order: 0,
      img: null,
      disabled: false
    }
  }),
  methods: {
    emitChange() {
      this.$emit('input', this.formData);
    }
  },
  watch:{
    value(newVal) {
      this.formData = newVal;
    }
  }
}
</script>

<style>

</style>