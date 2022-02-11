<template>
  <form @submit.prevent="createClient" class="form">
    <div class="form-grid">
      <!-- Фамилия -->
      <form-input
        v-model="client.lastname.value"
        :title="client.lastname.title"
        :errorMessage="v$.client.lastname.$error && lastnameError"
      ></form-input>
      <!-- Имя -->
      <form-input
        v-model="client.name.value"
        :title="client.name.title"
        :errorMessage="v$.client.name.$error && nameError"
      ></form-input>
      <!-- Отчество -->
      <form-input
        v-model="client.surname.value"
        :title="client.surname.title"
        :errorMessage="v$.client.surname.$error && 'Должны быть только буквы'"
      ></form-input>
      <!-- Дата рождения -->
      <form-input
        v-model="client.birthday.value"
        typeInput="date"
        :title="client.birthday.title"
        :errorMessage="v$.client.birthday.$error && 'Заполните поле'"
      ></form-input>
      <!-- Номер телефона -->
      <form-input
        v-model="client.phoneNumber.value"
        :title="client.phoneNumber.title"
        :errorMessage="v$.client.phoneNumber.$error && phoneError"
        placeholder="7"
      ></form-input>
      <!-- Группа клиентов* -->
      <form-select
        :modelValue="client.clientsGroup.value.join(', ')"
        :title="client.clientsGroup.title"
        :itemList="clientsGroupList"
        :windowType="windowsList.clientGroupWindow"
        multiple="yes"
        @handleWindow="handleWindow"
        @handeleMultiple="handeleMultiple"
        :hasError="client.clientsGroup.hasError"
      ></form-select>
      <!-- Лечащий врач -->
      <form-select
        v-model="client.doctor.value"
        :title="client.doctor.title"
        :itemList="doctorsList"
        :windowType="windowsList.doctorsWindow"
        @handleWindow="handleWindow"
      ></form-select>
      <!-- Пол -->
      <form-input-radio
        v-model="client.gender.value"
        :itemsList="genderValues"
        :title="client.gender.title"
      ></form-input-radio>
      <!-- Не отправлять СМС -->
      <form-input-checkbox
        v-model="client.sendMsg.value"
        :title="client.sendMsg.title"
      ></form-input-checkbox>
    </div>

    <!-- ------------ADDRESS----------------- -->
    <p class="form-category">Адрес:</p>
    <!-- Индекс -->
    <div class="form-grid">
      <form-input v-model="address.index.value" 
      :title="address.index.title" 
      :errorMessage="v$.address.index.$error && 'Должны быть только цифры'">
      </form-input>
      <!-- Страна -->
      <form-input
        v-model="address.country.value"
        :title="address.country.title"
        :errorMessage="v$.address.country.$error && 'Должны быть только буквы'"
      ></form-input>
      <!-- Область -->
      <form-input
        v-model="address.region.value"
        :title="address.region.title"
        :errorMessage="v$.address.region.$error && 'Должны быть только буквы'"
      ></form-input>
      <!-- Город -->
      <form-input
        v-model="address.city.value"
        :title="address.city.title"
        :errorMessage="v$.address.city.$error && 'Заполните поле'"
      ></form-input>
      <!-- Улица -->
      <form-input
        v-model="address.street.value"
        :title="address.street.title"
      ></form-input>
      <!-- Дом -->
      <form-input
        v-model="address.home.value"
        :title="address.home.title"
      ></form-input>
    </div>

    <!-- ---------------------------CLIENTS DOCUMENT------------------ -->
    <p class="form-category">Документ:</p>
    <div class="form-grid">
      <!-- Тип документа -->
      <form-select
        v-model="clientDocument.documentType.value"
        :title="clientDocument.documentType.title"
        :itemList="documentType"
        :windowType="windowsList.documentTypeWindow"
        @handleWindow="handleWindow"
        :hasError="clientDocument.documentType.hasError"
      ></form-select>
      <!-- Серия -->
      <form-input
        v-model="clientDocument.documentSeria.value"
        :title="clientDocument.documentSeria.title"
      ></form-input>
      <!-- Номер -->
      <form-input
        v-model="clientDocument.documentNumber.value"
        :title="clientDocument.documentNumber.title"
      ></form-input>
      <!-- Кем выдан -->
      <form-input
        v-model="clientDocument.documentInfo.value"
        :title="clientDocument.documentInfo.title"
      ></form-input>
      <!-- Дата выдачи -->
      <form-input
        v-model="clientDocument.documentDate.value"
        :title="clientDocument.documentDate.title"
        typeInput="date"
        :errorMessage="
          v$.clientDocument.documentDate.$error && 'Заполните поле'
        "
      ></form-input>
    </div>

    <button class="form-btn">Создать</button>
  </form>
  <show-message v-if="isCreated">Hовый клиент создан</show-message>
</template>
<script>
import FormInput from "./Forms/FormInput.vue";
import FormSelect from "./Forms/FormSelect.vue";
import FormInputRadio from "./Forms/FormInputRadio.vue";
import FormInputCheckbox from "./Forms/FormInpitCheckbox.vue";
import ShowMessage from './ShowMessage.vue';

import useValidate from "@vuelidate/core";
import startWith7 from "../validation/startsWith7";
import checkAlpha from '../validation/checkAlpha';
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";

export default {
  components: {
    FormInput,
    FormSelect,
    FormInputRadio,
    FormInputCheckbox,
    ShowMessage
  },
  name: "client-form",
  props: {
    handleWindow: { type: Function },
    windowsList: { type: Object },
  },
  data: () => ({
    v$: useValidate(),
    doctorsList: ["Иванов", "Захаров", "Чернышева"],
    clientsGroupList: ["VIP", "Проблемные", "ОМС"],
    genderValues: ["женский", "мужской"],
    documentType: ["Паспорт", "Свидетельство о рождении", "Вод. удостоверение"],
    isCreated: false,

    client: {
      lastname:{ title: "Фамилия*", value: "" },
      name: { title: "Имя*", value: "" },
      surname: { title: "Отчество", value: "" },
      birthday: { title: "Дата рождения*", value: "" },
      phoneNumber: { title: "Номер телефона*", value: "" },
      gender: { title: "Пол:", value: "" },
      clientsGroup: { title: "Группа клиентов*", value: [], hasError: false },
      doctor: { title: "Лечащий врач", value: "" },
      sendMsg: { title: "Не отправлять СМС", value: "" },
    },
    address: {
      index: { title: "Индекс", value: "" },
      country: { title: "Страна", value: "" },
      region: { title: "Область", value: "" },
      city: { title: "Город*", value: "" },
      street: { title: "Улица", value: "" },
      home: { title: "Дом", value: "" },
    },
    clientDocument: {
      documentType: { title: "Тип документа*", value: "", hasError: false },
      documentSeria: { title: "Серия", value: "" },
      documentNumber: { title: "Номер", value: "" },
      documentInfo: { title: "Кем выдан", value: "" },
      documentDate: { title: "Дата выдачи*", value: "" },
    },
  }),
  methods: {
    createClient() {       //onSubmit event
      this.v$.$validate()

      let selectRequired = false;            // делаем оштбку если какой-то селектор не выбран
      for (let item of [this.clientDocument.documentType, this.client.clientsGroup]) {     // проверка, если какой-то обязательный селектор не выбран 
        if (item.value.length === 0) {
          item.hasError = true;       // переменная отвечает за показ ошибки в форме селектора
          selectRequired = true;  
        }
      }

      if (this.v$.$error || selectRequired) {
        return
      }       //  если есть незаполненные обязательные поля - прерываем ф-ию
      else {
        let info = [];                  //  массив с данными со всей формы
        for (let item in this.client) {
          info.push(this.client[item]);
          if(this.client[item].title === 'Группа клиентов*') {
            this.client[item].value = []
          } else {
            this.client[item].value = ''
          }
        }
        for (let item in this.address) {
          info.push(this.address[item]);
          this.address[item].value = ''
        }
        for (let item in this.clientDocument) {
          info.push(this.clientDocument[item]);
          this.clientDocument[item].value = ''
        }
        console.log(info);
        this.isCreated = true;
        this.v$.$reset()
        selectRequired = false
        setTimeout(() =>this.isCreated = false, 4000)
      }
    },

    handWindow(title, type) {
      this.$emit("handleWindow", title, type);   //  помечаем, что определенное окно селектора нужно закрыть / открыть
    },

    handeleMultiple(param) {                    //  ф-ия для того, чтобы для мultiple селектор вносить / удалять  данные с массива
      if (this.client.clientsGroup.value.includes(param)) {      //  если есть опция в массиве мultiple селектора, удаляем из массива 
        this.client.clientsGroup.value = this.client.clientsGroup.value.filter(
          (item) => item !== param             
        );
      } else {
        this.client.clientsGroup.value.push(param);    //  если нет опции в массиве мultiple селектора, добавляем в массив
      }
    },
    errorMessagesForClients(param) {             // общая ф-ия для выведения ошибок для фамилии и имени
      if(!this.v$.client[param].$error) return
      const type = this.v$.client[param].$silentErrors[0].$validator;
      return type === "required"
        ? "Заполните поле"
        : "Должны быть только буквы"
    }
  },
  computed: {       
   //  ОШИБКИ ДЛЯ ПОЛЕЙ
    phoneError() {          //  текстовое сообщение для формы телефона на основе ошибки 
      if(!this.v$.client.phoneNumber.$error) return
      const type = this.v$.client.phoneNumber.$silentErrors[0].$validator;
      return type === "required"
        ? "Заполните поле"
        : type === "numeric"
        ? "Должны быть только цифры"
        : type === "startWith7"
        ? "Номер должен начинаться с цифры 7"
        : "Должно быть 11 цифр";
    },
    lastnameError(){
      return this.errorMessagesForClients('lastname')
    },
    nameError() {
      return this.errorMessagesForClients('name')
    },
    clientsGroupError() {
      if (this.client.clientsGroup.value.length > 0)      // убираем ошибку для clientsGroup селектора, если опция была выбрана
        this.client.clientsGroup.hasError = false;
      return;
    },
    documentTypeError() {
      if (this.clientDocument.documentType.value)       // убираем ошибку для documentType селектора, если опция была выбрана
        this.clientDocument.documentType.hasError = false;
      return;
    }
  },

  validations() {
    return {
      client: {
        lastname: { value: { required, checkAlpha } },
        name: { value: { required, checkAlpha } },
        surname: {value: { checkAlpha }},
        birthday: { value: { required } },
        phoneNumber: { value: { required, numeric, startWith7, minLength: minLength(11), maxLength: maxLength(11)}},
        clientsGroup: { value: { required } },
      },
      address: {
        index: { value: { numeric } },
        country: { value: { checkAlpha } },
        region: { value: { checkAlpha } },
        city: { value: { required } },
      },
      clientDocument: {
        documentType: { value: { required } },
        documentDate: { value: { required } },
      },
    };
  },
};
</script>











