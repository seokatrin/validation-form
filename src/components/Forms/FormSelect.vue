<template>
  <div class="form-select">
    <div class="form-select-title">{{ title }}</div>
    <div
      :class="['form-choose', { 'form-select-error': hasError && !modelValue }]"
      @click="toggleField(windowType.title, !windowType.value)"
    >
      <p>{{ modelValue ? modelValue : "выберите" }}</p>
      <font-awesome-icon
        :class="['icon', { open: windowType.value }]"
        :icon="['fas', 'angle-down']"
      />
    </div>
    <ul v-show="windowType.value">
      <li v-for="item in itemList" :key="item" @click="changeOption">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "form-select",
  props: {
    itemList: { type: Array },
    modelValue: { type: String },
    title: { type: String },
    multiple: { type: String, required: false },
    windowType: { type: Object },
    hasError: { type: Boolean },
  },
  methods: {
    changeOption(e) {
      if (this.multiple) {
        this.$emit("handeleMultiple", e.target.innerText);
      } else {
        this.$emit("update:modelValue", e.target.innerText);
        this.$emit("handleWindow", this.windowType.title, false);
      }
    },
    toggleField() {
      
      this.$emit("handleWindow", this.windowType.title, !this.windowType.value);
    },
  },
};
</script>