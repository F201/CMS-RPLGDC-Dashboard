<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Add Activities Division</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <v-container>
        <v-row no-gutters justify="center">
          <v-col cols="10">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-select
                :items="dataDivision"
                v-model="divSelected"
                item-text="nama_divisi"
                item-value="id_divisi"
                label="Division"
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
          :loading="loading"
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
  props: ['id_activities'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    divSelected: '',
  }),
  computed: {
    ...mapGetters({
      dataDivision: 'division/divisions',
      loading: 'division/loading'
    }),
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        this.$store.dispatch('actDivision/addActDivision', {
          id_divisi: this.divSelected,
          id_activities: this.id_activities
        })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Add', 'Data Added!', 'success');
            else this.$swal('Error', 'Error on add data!', 'error')
            this.$store.commit('actDivision/ADDED_DIVISION');
            this.$store.dispatch('activities/getDetailActivities', this.id_activities);
          });
      }
    },
    close() {
      this.$store.commit('actDivision/ADDED_DIVISION');
    }
  },
  mounted() {
    this.$store.dispatch('division/getAllDivision');
  }
}
</script>
