<template>
  <v-container fluid>
    <h2>
      {{ data?.question ? data.question : "Sección sin título" }}
    </h2>
    <br />
    <v-radio-group>
      <v-radio
        v-for="item in items"
        @change="updateRadio($event)"
        :value="item"
        :label="item"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>
<script setup lang="ts">
import { useFormsStore } from "../../store/main";

const formsStore: any = useFormsStore();
const props = defineProps({
  data: Object,
  formName: String,
});
let response = ref(null);
const { data, formName } = toRefs(props);
const items = data?.value?.items;

const updateRadio = function (event: any) {
  response = event?.target?.value;
  const fieldName = data?.value?.question
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase();
  formsStore.responses[
    fieldName + "_" + formName?.value + "_" + data?.value?.type
  ] = {
    formName,
    value: response,
    question: data?.value?.question,
  };
};
</script>
