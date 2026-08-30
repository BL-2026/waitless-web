export type ThemeName = "default" | "forest";

export interface ThemeConfig {
  label: string;
  vars: Record<string, string>;
}

export const APP_THEME: ThemeName = "forest";

export const THEMES: Record<ThemeName, ThemeConfig> = {
  default: {
    label: "Classic",
    vars: {
      "--page-bg": "#f4efe2",
      "--screen-bg": "#f4efe2",
      "--panel-bg": "#f7f2e8",
      "--text": "#20211d",
      "--muted": "#8a8779",
      "--border": "#e2dccb",
      "--primary": "#20211d",
      "--primary-text": "#f4efe2",
      "--secondary": "#ffffff",
      "--accent": "#a5432b",
      "--success": "#2f6b5e",
      "--overlay": "rgba(0, 0, 0, 0.45)",
      "--shadow": "rgba(16, 18, 16, 0.12)",
    },
  },
  forest: {
    label: "Forest",
    vars: {
      "--page-bg": "#edf5ee",
      "--screen-bg": "#f4faf5",
      "--panel-bg": "#f0f8f2",
      "--text": "#17342b",
      "--muted": "#587163",
      "--border": "#cfe1d4",
      "--primary": "#2f6b5e",
      "--primary-text": "#f4fff8",
      "--secondary": "#eaf5ef",
      "--accent": "#9d6b3d",
      "--success": "#3d7d58",
      "--overlay": "rgba(15, 32, 24, 0.45)",
      "--shadow": "rgba(25, 66, 47, 0.12)",
    },
  },
};

export function applyTheme(themeName: ThemeName) {
  const theme = THEMES[themeName];

  Object.entries(theme.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}
