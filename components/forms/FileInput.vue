<template>
  <v-container fluid>
    <h2>
      {{ data?.question ? data.question : "Sección sin título" }}
    </h2>
    <br />
    <!-- @change="setValue($event)" -->
    <v-file-input
      @change="handleFile"
      :multiple="data?.multiple ? true : false"
      prepend-icon=""
    ></v-file-input>
  </v-container>
</template>
<script setup lang="ts">
import { useFormsStore } from "../../store/main";

const formsStore: any = useFormsStore();
const props = defineProps({
  data: Object,
  formName: String,
});
let response = reactive([]);
const { data, formName } = toRefs(props);
const fieldName = data?.value?.question.replace(/[^a-zA-Z]/g, "").toLowerCase();

const handleFile = function (event: any) {
  response = event.target.files;
  formsStore.responses[
    fieldName + "_" + formName?.value + "_" + data?.value?.type
  ] = {
    formName,
    value: response,
    question: data?.value?.question,
  };
};
</script>
