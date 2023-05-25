<template>
  <v-layout>
    <v-app-bar title="Kuantaz Forms"></v-app-bar>
    <v-main style="min-height: 300px; margin-top: 30px">
      <!-- ONE ROW PER SECTON -->
      <!-- DYNAMIC DATA 1 -->
      <v-row no-gutters>
        <v-card
          v-for="(key, index) in keys"
          width="75%"
          class="mx-auto"
          style="margin-bottom: 30px"
        >
          <v-card-title>Sección {{ index + 1 }}/{{ keys.length }}</v-card-title>
          <v-divider />
          <v-card-text>
            <v-row
              ><v-col v-for="(header, index) in headers[key + '_header']">
                <h3>{{ header }}</h3>
                <p style="margin-left: 8px">
                  <i>{{ items[key][index].value }}</i>
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-row>
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
import { useFormsStore } from "~/store/main";
const formsStore: any = useFormsStore();
if (
  !formsStore.responses ||
  formsStore.responses.length === 0 ||
  Object.keys(formsStore.responses).length === 0
) {
  await navigateTo({ path: "/" });
}
const headers: Object = reactive({});
const items: Object = reactive({});
const keys: Array<String> = [];
Object.keys(formsStore.responses).forEach((key) => {
  const name = key.split("_")[1];
  if (!keys.includes(name)) keys.push(name);
  if (!items[name] || items[name].length === 0) items[name] = [];
  if (!headers[name + "_header"] || headers[name + "_header"].length === 0)
    headers[name + "_header"] = [];
  items[name].push(formsStore.responses[key]);
  headers[name + "_header"].push(formsStore.responses[key].question);
});
</script>
<style scoped>
.v-row {
  display: grid !important;
}
</style>
