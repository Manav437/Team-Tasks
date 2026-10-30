// CSS variables also reach portalled menus, so both themes stay in sync.
export const selectTheme = (theme) => ({
    ...theme,
    borderRadius: 4,
    colors: {
        ...theme.colors,
        primary: "color-mix(in srgb, var(--app-focus) 15%, var(--app-panel))",
        primary75: "var(--app-muted)",
        primary50: "var(--app-raised)",
        primary25: "var(--app-raised)",
        danger: "var(--app-danger)",
        dangerLight: "var(--app-danger-bg)",
        neutral0: "var(--app-panel)",
        neutral5: "var(--app-bg)",
        neutral10: "var(--app-raised)",
        neutral20: "var(--app-border)",
        neutral30: "var(--app-focus)",
        neutral40: "var(--app-subtle)",
        neutral50: "var(--app-subtle)",
        neutral60: "var(--app-muted)",
        neutral70: "var(--app-muted)",
        neutral80: "var(--app-text)",
        neutral90: "var(--app-text)",
    },
});

export const selectOptionStyles = (base) => ({
    ...base,
    color: "var(--app-text)",
});
