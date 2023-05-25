<template>
  <v-container fluid>
    <h2>
      {{ data?.question ? data.question : "Sección sin título" }}
    </h2>
    <br />
    <v-textarea v-model="response"></v-textarea>
  </v-container>
</template>
<script setup lang="ts">
import { useFormsStore } from "../../store/main";
const formsStore: any = useFormsStore();
const response = ref(null);
const props = defineProps({
  data: Object,
  formName: String,
});
const { data, formName } = toRefs(props);
const fieldName = data?.value?.question.replace(/[^a-zA-Z]/g, "").toLowerCase();

watch(response, () => {
  formsStore.responses[
    fieldName + "_" + formName?.value + "_" + data?.value?.type
  ] = {
    formName,
    value: response,
    question: data?.value?.question,
  };
});
</script>
