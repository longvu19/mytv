import type { App, Plugin } from "vue";
const { sm, md, lg, xl } = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};
function isSm() {
  return window.matchMedia(`(max-width: ${sm}px)`).matches;
}
function isMd() {
  return window.matchMedia(
    `(min-width: ${sm + 1}px) and (max-width: ${md}px)`
  ).matches;
}
function isLg() {
  return window.matchMedia(
    `(min-width: ${md + 1}px) and (max-width: ${lg}px)`
  ).matches;
}
function isXl() {
  return window.matchMedia(
    `(min-width: ${lg + 1}px) and (max-width: ${xl}px)`
  ).matches;
}
function isXXL() {
  return window.matchMedia(`(min-width: ${xl + 1}px)`).matches;
}
function recalculate(vue: App) {
  vue.config.globalProperties.$isSm = isSm();
  vue.config.globalProperties.$isMd = isMd();
  vue.config.globalProperties.$isLg = isLg();
  vue.config.globalProperties.$isXl = isXl();
  vue.config.globalProperties.$isXXL = isXXL();
  const { $isSm, $isMd, $isLg, $isXl, $isXXL } = vue.config.globalProperties;
  console.log($isSm, $isMd, $isLg, $isXl, $isXXL);
  
}
export default {
  install(vue: App): void {
    recalculate(vue);
    window.addEventListener("resize", recalculate.bind(null, vue));
  }
} as Plugin;
