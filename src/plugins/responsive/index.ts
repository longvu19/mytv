import type { App, Plugin } from "vue";
import { ref, reactive, getCurrentInstance } from "vue";
const screen = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};
const smQuery = `(max-width: ${screen.sm}px)`;
const mdQuery = `(min-width: ${screen.sm + 1}px) and (max-width: ${screen.md}px)`;
const lgQuery = `(min-width: ${screen.md + 1}px) and (max-width: ${screen.lg}px)`;
const xlQuery = `(min-width: ${screen.lg + 1}px) and (max-width: ${screen.xl}px)`;
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
  vue.config.globalProperties.$isSm.value = isSm();
  vue.config.globalProperties.$isMd.value = isMd();
  vue.config.globalProperties.$isLg.value = isLg();
  vue.config.globalProperties.$isXl.value = isXl();
  vue.config.globalProperties.$isXXL.value = isXXL();
}
export default {
  install(vue: App): void {
    vue.config.globalProperties.$isSm = ref(isSm());
    vue.config.globalProperties.$isMd = ref(isMd());
    vue.config.globalProperties.$isLg = ref(isLg());
    vue.config.globalProperties.$isXl = ref(isXl());
    vue.config.globalProperties.$isXXL = ref(isXXL());
    window.addEventListener("resize", recalculate.bind(null, vue));
  },
} as Plugin;
export {screen}
export function useResponsive(){
  const gp = reactive(getCurrentInstance()?.appContext.config.globalProperties as any);
  const responsive = reactive({ isSm: gp.$isSm, isMd: gp.$isMd, isLg: gp.$isLg, isXl: gp.$isXl, isXXL: gp.$isXXL }); 
  return responsive
}