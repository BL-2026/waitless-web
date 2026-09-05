export type ThemeName = "atlas";

export interface ThemeConfig {
  label: string;
  vars: Record<string, string>;
}

export const APP_THEME: ThemeName = "atlas";

export const THEMES: Record<ThemeName, ThemeConfig> = {
  atlas: {
    label: "Atlas",
    vars: {
      "--page-bg": "#f3eee6",
      "--screen-bg": "#f7f3ec",
      "--panel-bg": "#fffaf4",
      "--text": "#1c1814",
      "--muted": "#7a7268",
      "--border": "#e4dcd0",
      "--primary": "#1c1814",
      "--primary-text": "#f7f3ec",
      "--secondary": "#fffaf4",
      "--accent": "#9a7048",
      "--gold": "#b0895a",
      "--gold-soft": "rgba(176, 137, 90, 0.14)",
      "--success": "#3f6b58",
      "--overlay": "rgba(18, 15, 12, 0.48)",
      "--shadow": "rgba(40, 28, 16, 0.1)",
    },
  },
};

export function applyTheme(themeName: ThemeName) {
  const theme = THEMES[themeName];

  Object.entries(theme.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
