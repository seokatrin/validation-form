<template>
    <div class="">
      <label class="form-types">
          {{title}}
        <input  type="checkbox" v-model="modelValue" />
      </label>
    </div>
</template>
<script>
export default {
    name: 'form-input-checkbox',
    props: {
        modelValue: [String],
        title: {
            type: String
        }
    },
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>