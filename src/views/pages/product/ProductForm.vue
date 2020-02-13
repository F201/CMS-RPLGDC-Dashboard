<template>
  <div>
    <v-container class="py-0 px-2">
      <v-row no-gutters justify="center">
        <v-col align="center" cols="3">
          <CropperDialog v-model="formData.img" @change="emitChange"/>
        </v-col>
        <v-col cols="7">
          <v-row no-gutters>
            <v-col cols="12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Nama Product"
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
                  label="Kategori"
                  outlined
                  v-model="formData.kategori"
                  :error-messages="errors"
                  :readonly="formData.readonly"
                  @change="emitChange"
                ></v-text-field> -->
                <v-select
                  :items="items"
                  v-model="formData.kategori"
                  label="Kategori"
                  outlined
                  :error-messages="errors"
                  :readonly="formData.readonly"
                  @change="emitChange"
                ></v-select>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-textarea
                  label="Deskripsi Product"
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
import CropperDialog from '@/components/CropperDialog';
import { ValidationProvider } from 'vee-validate';

export default {
  props: ['value'],
  components: {
    ValidationProvider,
    CropperDialog
  },
  data: () => ({
    items: ['web', 'android', 'game', 'UI/UX', 'sound'],
    formData: {
      name: '',
      kategori: '',
      deskripsi: '',
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