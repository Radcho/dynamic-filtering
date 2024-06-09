export const mergeClasses = (...classes: (string | undefined | null | 0 | false)[]): string => {
  return classes.filter((cssClass) => Boolean(cssClass)).join(' ');
};
