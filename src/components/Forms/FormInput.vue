<template>
  <p>
    <label class="form-label">
      {{ title }}
      <input
        :type="typeInput ? typeInput : 'text'"
        :value="modelValue"
        @input="updateInput"
        :class="['form-input', {error: errorMessage }]"
        :min="typeInput && '1930-01-01'"
        :max="typeInput && (new Date().toISOString().replace(/T.*/,'').split('-').join('-'))"
        :placeholder="placeholder"
      />
    </label>
    <span v-if="errorMessage" class="form-message">{{errorMessage}}</span>
  </p>
</template>
<script>
export default {
  name: "form-input",
  props: {
    modelValue: [String, Boolean],
    title: {type: String},
    typeInput: {type: String, required: false},
    errorMessage: [String, Boolean],
    placeholder: {type: String, Number}
  },
  methods: {
    updateInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>