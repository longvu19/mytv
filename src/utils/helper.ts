export function arrayToString(array: any[], separator: string = ", "): string {
  return array.map((obj) => (obj.name ? obj.name : obj)).join(separator);
}

export function debounce(func: Function, duration: number, leading: boolean = false): any {
  let timeout: ReturnType<typeof setTimeout> | null;
  return (...args: any) => {
    const effect = () => {
      timeout = null;
      return func(args);
    };

    if (!timeout && leading) {
      effect()
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(effect, duration);
  };
}

export function lockScroll(state: boolean = true): void {
  document.body.style.overflow = state ? "hidden" : "";
  const app : HTMLElement|null = document.getElementById("app");
  if(app) app.style.overflow = state ? "hidden" : "";
}
