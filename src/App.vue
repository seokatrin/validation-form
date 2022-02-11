<template >
  <div class="client" @click="checkWindow">
    <div class="client-wrapper">
      <h1>{{ title }}</h1>
      <div class="client-form">
        <client-form :windowsList="windowsList" :handleWindow="handleWindow"></client-form>
      </div>
    </div>
  </div>
</template>

<script>
import ClientForm from "./components/ClientForm.vue";

export default {
  name: "App",
  components: {
    ClientForm,
  },
  data() {
    return {
      title: "Новый клиент",
      windowsList: {
      doctorsWindow: {title: 'doctorsWindow', value: false},
      clientGroupWindow: {title: 'clientGroupWindow', value: false},
      documentTypeWindow: {title: 'documentTypeWindow', value: false}
      }
    };
  },
  methods: {
    handleWindow(window, type){
      for(let item in this.windowsList) {
          this.windowsList[item].value = false
        }
      this.windowsList[window].value = type
    },
    checkWindow(e) {
      if(!e.target.closest('.form-select')) {
        for(let item in this.windowsList) {
          this.windowsList[item].value = false
        }
      } 
    }
  }
};
</script>

<style lang="scss">
@import "./assets/styles/styles.scss";

</style>
