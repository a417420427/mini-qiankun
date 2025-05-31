export interface MicroAppProps {
  container: HTMLElement;
  globalState: Record<string, any>;
  setGlobalState: (state: Record<string, any>) => void;
  onGlobalStateChange: (fn: (state: any) => void) => () => void;
}

export interface LoadMicroAppOptions {
  entry: string;
  container: HTMLElement;
  sandbox?: boolean;
}

export declare function loadMicroApp(
  options: LoadMicroAppOptions
): Promise<() => void>;

export declare function setGlobalState(state: Record<string, any>): void;

export declare function onGlobalStateChange(
  fn: (state: any) => void
): () => void;
