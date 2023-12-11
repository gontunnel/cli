interface StartCommandArgs {
  /* some variables for internal use */
  verbose?: boolean;
  proxy?: boolean;
  instant?: {
    name: string;
    port: string;
  };
}
