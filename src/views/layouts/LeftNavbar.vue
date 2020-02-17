<template>
  <v-navigation-drawer
    app
    :mini-variant.sync="mini"
    mini-variant-width="80"
    expand-on-hover
    dark
    color="black"
    v-model="drawer"
  > 
    <v-list-item class="my-5">
        <v-list-item-content>
          <v-row :justify="mini ? 'center' : 'left'">
            <v-img
              v-if="mini"
              :src="require('@/assets/logo_icon.png')"
              max-height="100"
              max-width="50"
              contain
            ></v-img>
            <v-img
              v-else
              class="ml-3"
              :src="require('@/assets/logo_drawer.png')"
              max-height="100"
              max-width="200"
              contain
            ></v-img>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    <v-list dense>
      <template v-for="(item, index) in menu">
        <template>
          <v-list-group
            v-if="item.children && user.status === 1"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              class="pl-10"
              v-for="(child, i) in item.children"
              :key="i"
              active-class="primary--text"
              :to="child.to"
            >
              <template>
                <v-list-item-icon v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ child.title }}
                </v-list-item-title>
              </template>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else-if="!item.children"
            :to="item.to"
            :key="index"
            active-class="primary--text"
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    selectedPopup: null,
    propsPopup: null,
    mini: true,
  }),
  computed: {
    drawer: {
      get() {
        return this.$store.getters.sidebar;
      },
      set(val) {
         this.$store.commit('set_sidebar', val)
      },
    },
    isPopUp: {
      get: function() {
        return this.$store.getters['isPopUp'];
      },
      set: function() {
        this.$store.commit('POPED_UP');
      }
    },
    ...mapGetters({
      menu: 'listMenu'
    })
  },
  methods: {
    drawerOn(e) {
      console.log(e)
    }
  }
};
</script>
