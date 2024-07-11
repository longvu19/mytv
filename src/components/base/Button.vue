<script lang="ts" setup>
import Icon from "./Icon.vue";
withDefaults(
  defineProps<{
    primary?: boolean;
    type: "button" | "submit" | "reset";
    icon?: string | null;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    noBorder?: boolean;
  }>(),
  {
    primary: false,
    type: "button",
    icon: null,
    disabled: false,
    size: "medium",
    noBorder: false,
  }
);
</script>

<template>
  <button
    :type="type"
    class="button"
    :class="[
      {
        'button--primary': primary,
        'button--disabled': disabled,
        'button--no-border': noBorder,
      },
      `button--${size}`,
    ]"
  >
    <Icon class="button__icon" v-if="icon" :src="icon" />
    <span class="button__text" v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 40px;
  padding: 0 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  background: transparent;
  transition: background 0.25s, border 0.25s, color 0.25s;
  cursor: pointer;
  white-space: nowrap;
  text-transform: uppercase;
  outline: none;
  user-select: none;

  :deep(.icon) {
    background: white;
  }

  &:not(.button--no-border):hover {
    background: white;
    color: #111;

    :deep(.icon) {
      background: black;
    }
  }

  &--primary {
    background: white;
    color: #111;

    :deep(.icon) {
      background: black;
    }

    &:hover {
      background: #f7a05c;
      border-color: #f7a05c;

      :deep(.icon) {
        background: #111;
      }
    }
  }

  &--no-border {
    border: none;
  }
  &__icon {
    width: 20px;
    height: 20px;
  }

  &__text {
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &--small {
    height: 30px;
    padding: 0 10px;
    font-size: 0.8rem;
  }

  &--large {
    height: 50px;
    padding: 0 30px;
    font-size: 1rem;
    .button__icon {
      width: 30px;
      height: 30px;
    }
  }

  &--medium {
    height: 40px;
    padding: 0 20px;
    font-size: 0.9rem;
    .button__icon {
      width: 25px;
      height: 25px;
    }
  }
}
</style>