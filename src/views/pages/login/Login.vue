<template>
  <!-- <v-container fluid> -->
    <v-row no-gutters justify="center" align="center" class="ma-10">
      <!-- <v-col cols="7" v-if="$vuetify.breakpoint.smAndUp">
        <v-img
          :src="require('@/assets/home.png')"
          aspect-ratio="1.5"
          contain
          lazy-src
        >
        </v-img>
      </v-col> -->
      <v-col cols="7" md="4" justify-self="center">
        <ValidationObserver ref="obs" v-slot="{ invalid, validated }">
          <v-form @submit.prevent="login">
            <v-card class="elevation-3 pa-5">
              <!-- <v-toolbar centered dark color="primary">
                <v-spacer></v-spacer>
                <v-toolbar-title class="ma-0">RPLGDC LABS</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar> -->
              <v-row class="logo-wrapper mb-5 pa-5 display-1 font-weight-medium" justify="center" align="center">
                <v-col align="center">
                  <img src="@/assets/logo.png" alt="" width="70%" />
                </v-col>
              </v-row>
              <v-card-text class="py-4">
                <ValidationProvider name="Email" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="loginData.username"
                    name="username"
                    label="Username"
                    :error-messages="errors[0]"
                    outlined
                    required
                  />
                </ValidationProvider>
                <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                  <v-text-field
                    v-model="loginData.password"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    outlined
                    :error-messages="errors"
                    required
                  />
                </ValidationProvider>
              </v-card-text>
              <v-card-actions class="pa-4">
                <v-btn
                  color="primary"
                  type="submit"
                  block
                  lg
                  :loading="loading"
                  :disabled="invalid || !validated"
                  @click="login()"
                >
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </ValidationObserver>
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapGetters } from 'vuex';

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    tab: null,
    loginData: {
      username: '',
      password: ''
    },
    
  }),
  computed: {
    ...mapGetters({
      loading: 'auth/loading'
    }),
    nextUrl() {
      return this.$route.query.next || '/' 
    }
  },
  methods: {
    async login() {
      const isValid = await this.$refs.obs.validate();
      if (isValid) {
        let credentials = this.loginData;
        this.$store.dispatch('auth/login', credentials).then(data => {
          if (data.status === 'error') {
            this.$swal('Failed Login', `Wrong Credential!`, 'error').then(() => {
              this.loginData.password = '';
            });
          } else {
            this.$router.push(this.nextUrl);
          }
        });
      }
    }
  },
  created() {
    // // console.log(this.$vuetify.breakpoint)
  }
}
</script>
