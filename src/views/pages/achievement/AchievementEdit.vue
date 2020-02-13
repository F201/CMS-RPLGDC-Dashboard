<template>
  <v-card>
    <v-card-title class="pa-5">
      <span class="headline">Edit Achievemenet</span>
    </v-card-title>
    <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
      <achievement-form v-model="formData"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="close">Close</v-btn>
        <v-btn
          color="primary darken-1"
          :readonly="invalid || !validated"
          @click="onSubmit"
        >
          Submit
        </v-btn>
      </v-card-actions>
    </ValidationObserver>
  </v-card>
</template>

<script>
import AchievementForm from './AchievementForm';
import { ValidationObserver } from 'vee-validate';

export default {
  props: ['id'],
  components: {
    ValidationObserver,
    AchievementForm
  },
  data: () => ({
    name: '',
    jabatan: '',
    order: 0,
    icon: '',
    photo: null,
    formData: null,
  }),
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        let form = new FormData();
        form.append('judul', this.formData.judul);
        form.append('tahun', this.formData.tahun);
        form.append('peringkat', this.formData.peringkat);
        form.append('nama_lomba', this.formData.nama_lomba);
        form.append('foto_achievement', this.formData.img.photo);
        this.$store.dispatch('achievement/editAchievement', { id: this.formData.id, data: form })
          .then(res => {
            if (res.data !== undefined) this.$swal('Success Edit', 'Data edited!', 'success');
            else this.$swal('Error', 'Error on edit data!', 'error')
            this.$store.commit('achievement/VIEWED');
            this.$store.dispatch('achievement/getAllAchievement');
          });
      }
    },
    close() {
      this.$store.commit('achievement/VIEWED');
    },
    fetch() {
      this.formData = {
        img: {
          readonly: true,
          ratio: 4/3
        },
        readonly: true
      };
      this.$store.dispatch('achievement/getDetailAchievement', this.id).then(data => {
        console.log(data)
        if (data) {
          this.formData = {
            id: data.achievement[0].id_achievement,
            judul: data.achievement[0].judul,
            tahun: data.achievement[0].tahun,
            peringkat: data.achievement[0].peringkat,
            nama_lomba: data.achievement[0].nama_lomba,
            img: {
              required: false,
              ratio: 4/3,
              icon: data.achievement[0].foto_achievement,
              photo: null,
            },
            readonly: false
          }
        }
      });
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>
