<template>
  <v-container fluid>
    <h2>
      {{ data?.question ? data.question : "Sección sin título" }}
    </h2>
    <br />
    <v-checkbox
      v-for="item in data?.items"
      :input-value="item"
      :label="item"
      @click="setValue(item as String)"
    ></v-checkbox>
  </v-container>
</template>
<script setup lang="ts">
import { useFormsStore } from "../../store/main";
const formsStore: any = useFormsStore();
const response: String[] = reactive([]);
const props = defineProps({
  data: Object,
  formName: String,
});
const { data, formName } = toRefs(props);

const setValue = function (item: String) {
  if (response.filter((_item) => _item === item).length === 0) {
    response.push(item);
  } else {
    response.splice(response.indexOf(item), 1);
  }
};
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
