export {};

declare global {
  interface Window {
    gtag: (command: string, ...params: unknown[]) => void;
  }
}
