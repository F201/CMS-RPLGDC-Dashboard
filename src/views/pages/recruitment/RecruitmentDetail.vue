<template>
  <v-card>
    <v-card-title class="pa-5">
      <v-row no-gutters align="center">
        <v-col>
          <span class="headline">Detail Pendaftar</span>
        </v-col>
        <v-col align="end">
          <v-chip
            class="ma-2"
            color="green"
            text-color="white"
            v-if="status1"
          >
            <v-avatar left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            Lulus 1
          </v-chip>
          <v-chip
            class="ma-2"
            color="green"
            text-color="white"
            v-if="status2"
          >
            <v-avatar left>
              <v-icon>mdi-checkbox-marked-circle</v-icon>
            </v-avatar>
            Lulus 2
          </v-chip>
        </v-col>
      </v-row>
    </v-card-title>
    <recruitment-form v-model="formData" />
    <v-card-actions>
      <v-row no-gutters>
        <v-col align="center">
          <v-btn 
            class="mx-2" 
            color="green" 
            dark 
            v-if="!status1" 
            @click="onLolos(1)"
            :disabled="loading"
          >
            Lolos Tahap 1
          </v-btn>
          <v-btn 
            class="mx-2" 
            color="red" 
            dark 
            v-else-if="status1 && !status2" 
            outlined 
            @click="onUndo(1)"
            :disabled="loading"
          >
            Undo Tahap 1
          </v-btn>
          <v-btn 
            class="mx-2" 
            color="green" 
            dark 
            v-if="status1 && !status2" 
            outlined 
            @click="onLolos(2)"
            :disabled="loading"
          >
            Lolos Tahap 2
          </v-btn>
          <v-btn 
            class="mx-2" 
            color="red" 
            dark 
            v-else-if="status1 && status2" 
            outlined 
            @click="onUndo(2)"
            :disabled="loading"
          >
            Undo Tahap 2
          </v-btn>
        </v-col>
      </v-row>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import RecruitmentForm from './RecruitmentForm';
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  components: {
    RecruitmentForm
  },
  data: () => ({
    formData: null,
    status1: false,
    status2: false
  }),
  computed: {
    ...mapGetters({
      loading: 'recruitment/loading'
    })
  },
  methods: {
    async onLolos(step) {
      const res = (step === 1) 
        ? this.$store.dispatch('recruitment/setLulusThp1', this.id)
        : this.$store.dispatch('recruitment/setLulusThp2', this.id);
      if (res) this.$swal('Success', `Success edit status: ${this.formData.nim}`, 'success')
      else this.$swal('Error', 'Error on create data!', 'error')
      this.fetch()
    },
    async onUndo(step) {
      const res = (step === 1) 
        ? this.$store.dispatch('recruitment/undoLulusThp1', this.id)
        : this.$store.dispatch('recruitment/undoLulusThp2', this.id);
      if (res) this.$swal('Success', `Success edit status: ${this.formData.nim}`, 'success')
      else this.$swal('Error', 'Error on create data!', 'error')
      this.fetch()
    },
    fetch() {
      this.$store.dispatch('recruitment/getDetailRecruitment', this.id).then(res => {
        this.status1= res.status1,
        this.status2= res.status2,
        this.formData = {
          name: res.nama_lengkap,
          nim: res.nim,
          divisi: res.divisi,
          angkatan: res.angkatan,
          gender: res.jenis_kelamin,
          tgl: res.tanggal_lahir,
          ml: res.motivation_letter,
          cv: res.cv,
          portofolio: res.portofolio,
          img: {
            icon: res.foto_profile,
            photo: null,
            readonly: true
          },
          readonly: true
        }
      })
    }
  },
  created() {
    this.fetch()
  }
}
</script>
