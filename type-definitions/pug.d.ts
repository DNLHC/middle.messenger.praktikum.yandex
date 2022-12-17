declare module 'compile:*.pug' {
  const template: (props: Record<string, unknown>) => string;
  // eslint-disable-next-line import/no-default-export
  export default template;
}
