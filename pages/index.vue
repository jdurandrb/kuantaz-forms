<template>
  <v-container>
    <v-layout>
      <v-app-bar title="Kuantaz Forms"></v-app-bar>
      <v-main style="min-height: 300px">
        <!-- ONE ROW PER SECTON -->
        <!-- DYNAMIC DATA 1 -->
        <v-row no-gutters v-for="formKey in formKeys">
          <v-card width="85%" class="mx-auto" style="margin-bottom: 30px">
            <v-card-title class="primary-text">
              {{ getSections(formKey as String) }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form @submit.prevent>
                <!-- DYNAMIC DATA 2 -->
                <div v-for="form in forms[formKey].form">
                  <component
                    :is="getComponentName(form?.type)"
                    :data="form"
                    :formName="formKey"
                  />
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-row>
        <v-row no-gutters>
          <v-card width="85%" class="mx-auto" flat>
            <v-btn type="submit" class="mt-2" @click="submitData"
              >Confirmar</v-btn
            >
          </v-card>
        </v-row>
      </v-main>
    </v-layout>
  </v-container>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useFormsStore } from "~/store/main";
/* forms: '', */
const data = await useFetch(
  "https://run.mocky.io/v3/6bd01347-72e9-49da-809a-d5002ca63b2c"
);

const forms = data.data._value;
/* {
  formulario: {
    name: "Formulario 1",
    descripcion: "Este Formulario es para la prueba deKuantaz",
    form: [
      {
        question: "¿Por qué deberiamos contratarte?",
        type: "TEXTAREA",
        response: "",
      },
      {
        question: "Archivo",
        type: "FILE",
        response: "",
      },
      {
        question: "Deberiamos contratarte?",
        type: "CHECKBOX",
        items: ["Si", "No"],
        response: "",
      },
      {
        question: "Quieres trabajar?",
        type: "RADIO",
        items: ["Si", "No"],
        response: "",
      },
    ] as Object[],
  } as Object,
  formulario2: {
    name: "Formulario 2",
    descripcion: "Este Formulario es para la prueba deKuantaz",
    form: [
      {
        question: "¿Es importante trabajar en Kuantas?",
        type: "SELECT",
        items: [
          { id: 1, value: "SI" },
          { id: 2, value: "NO" },
          { id: 3, value: "QUIZAS" },
          { id: 4, value: "TALVEZ" },
        ],
        response: "",
      },
      {
        question: "¿Por qué deberiamos contratarte2?",
        type: "INPUT",
        response: "",
      },
    ] as Object[],
  } as Object,
}; */
/* const forms = await getForms(); */
const formKeys: String[] = Object.keys(forms);
const formsStore: any = useFormsStore();
const submitData = async function () {
  if (!validateFields()) return;
  await navigateTo({ path: "/results" });
};
const validateFields = function (): Boolean {
  let check = true;
  if (
    !formsStore.responses ||
    (formsStore.responses && formsStore.responses.length === 0) ||
    (formsStore.responses && Object.keys(formsStore.responses).length === 0)
  ) {
    return false;
  }
  Object.keys(formsStore.responses).forEach((response) => {
    if (
      formsStore.responses[response].value === undefined ||
      !formsStore.responses[response].value ||
      (formsStore.responses[response].value &&
        formsStore.responses[response].value.length === 0) ||
      (formsStore.responses[response].value &&
        Object.keys(formsStore.responses[response].value).length === 0)
    ) {
      check = false;
    }
  });
  return check;
};
const getForms = async function () {
  return await formsStore.getForms();
};
const getComponentName = function (formType: Object | any): String | any {
  return defineAsyncComponent(
    () => import(`../components/forms/${capitalize(formType) + "Input"}.vue`)
  );
};
const capitalize = function (word: String): String | any {
  return word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase();
};
const getSections = function (key: String) {
  return `Sección ${formKeys.indexOf(key) + 1}/${formKeys.length}`;
};
</script>
<style></style>
