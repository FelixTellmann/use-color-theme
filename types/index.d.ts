declare module 'use-color-theme' {
  /**
   * A config object allowing you to specify certain aspects of `useColorTheme`
   */
  export interface ColorThemeConfig {
    classNames?: string[]; // A classNamse to set "color themes". Default = "[light-theme, dark-theme]".
    element?: HTMLElement; // The element to apply the className. Default = `document.body`
    onChange?: (val?: boolean) => void; // Overide the default className handler with a custom callback.
    storageKey?: string; // Specify the `localStorage` key. Default = "colorTheme". Set to `null` to disable persistent storage.
    storageProvider?: WindowLocalStorage; // A storage provider. Default = `localStorage`.
    global?: Window; // The global object. Default = `window`.
  }

  /**
   * An object returned from a call to `useColorTheme`.
   */
  export interface ColorTheme {
    readonly value: string;
    set: (string) => void;
    toggle: () => void;
  }

  /**
   * A custom React Hook to help you implement a "dark mode" component for your application.
   */
  export default function useColorTheme(
    initialState?: boolean,
    config?: ColorThemeConfig
  ): ColorTheme;
}
