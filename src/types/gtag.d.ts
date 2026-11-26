type GtagFunction = {
  (command: "event", eventName: string, parameters?: Record<string, string>): void;
  (command: "js", date: Date): void;
  (command: "config", measurementId: string): void;
  (
    command: "consent",
    action: "update",
    parameters: { analytics_storage: "denied" },
  ): void;
};

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: GtagFunction;
  }
}

export {};
