<template>
  <!-- <v-container fluid> -->
    <v-row no-gutters justify="space-between" align="center" class="ma-10">
      <v-col cols="7" v-if="$vuetify.breakpoint.smAndUp">
        <!-- <v-img
          :src="require('@/assets/home.png')"
          aspect-ratio="1.5"
          contain
          lazy-src
        >
        </v-img> -->
      </v-col>
      <v-col cols="12" sm="4" justify-self="center">
        <v-form @submit.prevent="login" data-vv-scope="form-login">
          <v-card class="elevation-3">
            <v-toolbar centered dark color="primary">
              <v-spacer></v-spacer>
              <v-toolbar-title class="ma-0">RPLGDC LABS</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="py-4">
              <ValidationProvider name="Email" rules="email|required" v-slot="{ errors }">
                <v-text-field
                  v-model="loginData.email"
                  name="email"
                  label="Email"
                  type="email"
                  :error-messages="errors[0]"
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
                :disabled="loading"
                @click="login()"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  <!-- </v-container> -->
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { extend } from 'vee-validate';
import { required, email } from "vee-validate/dist/rules";
extend('email', email);

// Override the default message.
extend('required', required);
export default {
  components: {
    ValidationProvider
  },
  data: () => ({
    tab: null,
    loginData: {
      email: '',
      password: ''
    },
    loader: null,
    loading: false,
  }),
  methods: {
    login() {

    }
  },
  created() {
    console.log(this.$vuetify.breakpoint)
  }
}
</script>
