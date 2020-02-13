<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Add Achivement Member</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <v-container>
        <v-row no-gutters justify="center">
          <v-col cols="10">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                label="Nama"
                outlined
                v-model="nama"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field
                label="Jurusan"
                outlined
                v-model="jurusan"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <ValidationProvider rules="required|numeric" v-slot="{ errors }">
              <v-text-field
                label="Angkatan"
                outlined
                type="number"
                v-model="angkatan"
                :error-messages="errors"
              ></v-text-field>
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
  props: ['id_achievement'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    nama: '',
    jurusan: '',
    angkatan: null,
  }),
  computed: {
    ...mapGetters({
      loading: 'achievMember/loading'
    }),
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        this.$store.dispatch('achievMember/addAchievMember', {
          id_achievement: this.id_achievement,
          nama_member: this.nama,
          jurusan: this.jurusan,
          angkatan: this.angkatan
        })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Add', 'Data Added!', 'success');
            else this.$swal('Error', 'Error on add data!', 'error')
            this.$store.commit('achievMember/ADDED_MEMBER');
            this.$store.dispatch('achievement/getDetailAchievement', this.id_achievement);
          });
      }
    },
    close() {
      this.$store.commit('achievMember/ADDED_MEMBER');
    }
  },
}
</script>
