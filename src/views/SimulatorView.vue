<template>
  <div class="mx-2 md:mx-5 lg:mx-10 xl:mx-32 2xl:mx-60 3xl:mx-80">
    <Form></Form>
    <Dashboard v-if="showDashboard"></Dashboard>
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTaxStore } from "@/store";
import { useRoute } from "vue-router";

import Form from "@/components/Form.vue";
import Dashboard from "@/components/Dashboard.vue";
import FooterBar from "@/components/FooterBar.vue";

const store = useTaxStore();
const { showDashboard } = storeToRefs(store);

// Optional: if you're still using query param syncing,
// you can implement your own version or remove this:
const route = useRoute();
// store.setParametersFromURL(route.query); // <- Remove if method is deleted
</script>
