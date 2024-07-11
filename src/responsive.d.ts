declare module "vue" {
  interface ComponentCustomProperties {
    $isSm: Ref<boolean>;
    $isMd: Ref<boolean>;
    $isLg: Ref<boolean>;
    $isXl: Ref<boolean>;
  }
}
export {};
