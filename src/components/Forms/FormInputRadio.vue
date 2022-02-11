<template>
    <p>
      {{title}}
      <label class="form-types" v-for="item in itemsList" :key="item"> {{item}}
        <input  type="radio" v-model="modelValue" :value="item" @change="updateInput" />
      </label>
    </p>
</template>
<script>
export default {
    name: 'form-input-radio',
    props: {
        modelValue: {type: String},
        title: {type: String},
        itemsList: {type: Array}
    },
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>
<style lang="sass" scoped>

</style>