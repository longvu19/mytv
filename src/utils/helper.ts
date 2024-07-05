export function arrayToString(array: any[], separator: string = ", "): string {
  return array.map((obj) => (obj.name ? obj.name : obj)).join(separator);
}

export function debounce(func: Function, duration: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const effect = (...args : any) => {
    timeout = null;
    return func(args);
  };

  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(effect, duration);
}
