<script lang="ts" setup>
import Icon from "./Icon.vue";
withDefaults(
  defineProps<{
    primary?: boolean;
    type: "button" | "submit" | "reset" | "link";
    icon?: string | null;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    noBorder?: boolean;
    fullWidth?: boolean;
    iconMasking?: boolean;
  }>(),
  {
    primary: false,
    type: "button",
    icon: null,
    disabled: false,
    size: "medium",
    noBorder: false,
    fullWidth: false,
    iconMasking: true,
  }
);
</script>

<template>
  <button v-if="type !== 'link'"
    :type="type"
    class="button"
    :class="[
      {
        'button--primary': primary,
        'button--disabled': disabled,
        'button--no-border': noBorder,
        'button--fullwidth': fullWidth,
        'button--no-mask': !iconMasking
      },
      `button--${size}`,
    ]"
  >
    <Icon class="button__icon" v-if="icon" :masking="iconMasking" :src="icon" />
    <span class="button__text" v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
  <a v-else @click.prevent class="link"><slot></slot></a>
</template>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: white;
  cursor: pointer;
  user-select: none;
  font-size: inherit;
  font-weight: 500;
  display: inline-block;
}
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
  @media (max-width: 768px) {
    height: 30px;
    padding: 0 15px;
  }

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

  &--fullwidth {
    width: 100%;
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
    font-size: inherit;
    font-weight: 500;
    text-transform: inherit;
  }

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &--small {
    height: 30px;
    padding: 0 10px;
    font-size: 0.8rem;
    @media (max-width: 768px) {
      height: 25px;
      font-size: 0.7rem;
    }
  }

  &--large {
    height: 50px;
    padding: 0 30px;
    font-size: 1rem;
    .button__icon {
      width: 30px;
      height: 30px;
    }
    @media (max-width: 768px) {
      height: 40px;
      font-size: 0.9rem;
      padding: 0 20px;
      .button__icon {
        width: 25px;
        height: 25px;
      }
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
  &--no-mask {
    :deep(.icon) {
      background: none!important;
    }
  }
}
</style>