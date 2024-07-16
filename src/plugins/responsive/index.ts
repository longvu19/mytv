import type { App, Plugin } from "vue";
import { ref, reactive, getCurrentInstance, toRefs, toRef } from "vue";
const screen = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};
const smQuery = `(max-width: ${screen.sm}px)`;
const mdQuery = `(min-width: ${screen.sm + 1}px) and (max-width: ${
  screen.md
}px)`;
const lgQuery = `(min-width: ${screen.md + 1}px) and (max-width: ${
  screen.lg
}px)`;
const xlQuery = `(min-width: ${screen.lg + 1}px) and (max-width: ${
  screen.xl
}px)`;
const xxlQuery = `(min-width: ${screen.xl + 1}px)`;
function isSm() {
  return window.matchMedia(smQuery).matches;
}
function isMd() {
  return window.matchMedia(mdQuery).matches;
}
function isLg() {
  return window.matchMedia(lgQuery).matches;
}
function isXl() {
  return window.matchMedia(xlQuery).matches;
}
function isXXL() {
  return window.matchMedia(xxlQuery).matches;
}
function recalculate(vue: App) {
  vue.config.globalProperties.responsive.isSm = isSm();
  vue.config.globalProperties.responsive.isMd = isMd();
  vue.config.globalProperties.responsive.isLg = isLg();
  vue.config.globalProperties.responsive.isXl = isXl();
  vue.config.globalProperties.responsive.isXXL = isXXL();
}
export default {
  install(vue: App): void {
    vue.config.globalProperties.responsive = reactive({
      isSm: isSm(),
      isMd: isMd(),
      isLg: isLg(),
      isXl: isXl(),
      isXXL: isXXL(),
    });
    vue.config.globalProperties.$isSm = toRef(
      vue.config.globalProperties.responsive,
      "isSm"
    );
    vue.config.globalProperties.$isMd = toRef(
      vue.config.globalProperties.responsive,
      "isMd"
    );
    vue.config.globalProperties.$isLg = toRef(
      vue.config.globalProperties.responsive,
      "isLg"
    );
    vue.config.globalProperties.$isXl = toRef(
      vue.config.globalProperties.responsive,
      "isXl"
    );
    vue.config.globalProperties.$isXXL = toRef(
      vue.config.globalProperties.responsive,
      "isXXL"
    );
    window.addEventListener("resize", recalculate.bind(null, vue));
  },
} as Plugin;
export { screen };
export function useResponsive() {
  const gp = reactive(
    getCurrentInstance()?.appContext.config.globalProperties as any
  );
  return toRefs(gp);
}
