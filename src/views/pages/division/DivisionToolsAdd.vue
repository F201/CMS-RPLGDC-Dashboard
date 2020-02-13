<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Add Division Tools</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-select
                :items="dataTools"
                v-model="toolSelected"
                item-text="nama_tools"
                item-value="id_tools"
                label="Tools"
                outlined
                :error-messages="errors"
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="close">Close</v-btn>
        <v-btn
          color="primary darken-1"
          :disabled="invalid || !validated"
          @click="onSubmit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapGetters } from 'vuex';

export default {
  props: ['id_divisi'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    toolSelected: null,
  }),
  computed: {
    ...mapGetters({
      dataTools: 'tool/tools',
      loading: 'tool/loading'
    }),
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        this.$store.dispatch('divisionTool/addDivisionTool', {
          id_divisi: this.id_divisi,
          id_tools: this.toolSelected
        })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Add', 'Data Added!', 'success');
            else this.$swal('Error', 'Error on add data!', 'error')
            this.$store.commit('divisionTool/ADDED_TOOL');
            this.$store.dispatch('division/getDetailDivision', this.id_divisi);
          });
      }
    },
    close() {
      this.$store.commit('divisionTool/ADDED_TOOL');
    }
  },
  mounted() {
    this.$store.dispatch('tool/getAllTool');
  }
}
</script>
