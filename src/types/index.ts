declare global {
  interface Window {
    $: typeof $;
    jQuery: typeof $;
  }
}

export type UseJQueryOptions = {
  version?: string;
  cdnUrl?: string;
  onError?: (event: Event) => void;
  onLoadSuccess?: () => void;
  autoInject?: boolean;
};
