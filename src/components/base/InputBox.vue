<template>
  <label class="label" for="{{id}}" v-if="label">{{ label }}</label>
  <div class="input-box" :class="{ 'input-box--bg-transparent': props.bgTransparent }">
    <input v-if="inputModifier.lazy" v-model.lazy="inputValue" v-bind="inputProps" />
    <input v-else v-model="inputValue" v-bind="inputProps" />
    <Icon :src="icon" v-if="icon" class="input-box__icon" @click="iconClickHandler" />
  </div>
</template>
<script lang="ts" setup>
  import Icon from "./Icon.vue";
  import type { InputProps } from "../../services/types";
  import { computed } from "vue";
  const [inputValue, inputModifier] = defineModel<string>();
  const emits = defineEmits<{
    (e: "focus"): void,
    (e: "blur"): void
  }>();

  const props = withDefaults(defineProps<InputProps>(), {
    type: "text",
    label: "",
    placeholder: "",
    modelValue: "",
    icon: "",
    iconSize: "30px",
    required: true,
    bgTransparent: false,
    iconClickHandler: () => { },
  });
  const inputFocusHandler = () => {
    emits("focus");
  }
  const inputBlurHandler = () => {
    emits("blur");
  }
  const inputProps = computed(() => {
    return {
      class: "input-box__input",
      id: props.id,
      type: props.type,
      required: props.required,
      placeholder: props.placeholder,
      autocomplete: "off",
      onblur: inputBlurHandler,
      onfocus: inputFocusHandler
    }
  })
</script>
<style lang="scss" scoped>
  .label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-weight: 300;
    text-transform: uppercase;
    color: #fff;
  }

  .input-box {
    position: relative;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    border: 1px solid #424242b0;
    padding-right: 5px;
    transition: border 0.25s;
    background: #161616;

    &--bg-transparent {
      background: transparent;
    }

    &__input {
      height: 100%;
      padding: 0 10px;
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      font-size: 0.9rem;
      flex-grow: 1;
      transition: color 0.25s;

      @media (max-width: 768px) {
        font-size: 1rem;
      }

      &::placeholder {
        color: #424242b0;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: #fff !important;
      }
    }

    &__icon {
      width: v-bind(iconSize);
      height: v-bind(iconSize);
      background: #424242b0;
      transition: background 0.25s;
      cursor: pointer;
    }

    &:focus-within {
      border: 1px solid #df5f2d;

      .input-box__icon {
        background: #df5f2d;
      }

      .input-box__input {
        color: white;
      }
    }
  }
</style>