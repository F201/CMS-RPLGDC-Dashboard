<template>
  <v-container class="py-0 px-2 pb-2">
    <v-row no-gutters justify="center">
      <v-col cols="7" offset="3">
        <v-row align="center" class="my-2">
          <v-col class="body-1" cols="auto">Tools</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn @click="addTool()" color="primary" text>Add Tool</v-btn>
          </v-col>
        </v-row>
        <v-card outlined class="pa-3">
          <v-row>
            <template v-if="toolList.tools.length <= 0">
              <v-col align="center">
                No Data Found
              </v-col>
            </template>
            <template v-else>
              <v-col align="center" cols="auto" px-1 py-1 v-for="(item, idx) in toolList.tools" :key="idx" >
                <product-tools-item :productId="id" :toolItem="item" />
              </v-col>
            </template>
            <!-- <v-col align="center" cols="auto" px-1 py-1 v-for="(item, idx) in dataProductTools" :key="idx" >
              <product-tools-item :tool="item" />
            </v-col> -->
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="isPopup" max-width="500px">
      <product-tools-add v-if="isPopup" :id_product="id"/>
    </v-dialog>
  </v-container>
</template>

<script>
import ProductToolsItem from './ProductToolsItem';
import ProductToolsAdd from './ProductToolsAdd';
import { mapGetters } from 'vuex';

export default {
  props: ['id', 'toolList'],
  components: {
    ProductToolsItem,
    ProductToolsAdd
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters({
      loading: 'productTool/loading'
    }),
    isPopup: {
      get: function() {
        return this.$store.getters['productTool/addingTool'];
      },
      set: function() {
        this.detailId = null;
        this.$store.commit('productTool/ADDED_TOOL');
      }
    },
  },
  methods: {
    addTool() {
      this.$store.commit('productTool/ADDING_TOOL');
    },
    fetch() {
      this.$store.dispatch('productTool/getProductTools', this.id);
    }
  },
  mounted() {
    // this.fetch();
  }
}
</script>

<style>

</style>