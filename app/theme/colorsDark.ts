const palette = {
  neutral900: "#FFFFFF",
  neutral800: "#F4F2F1",
  neutral700: "#D7CEC9",
  neutral600: "#B6ACA6",
  neutral500: "#978F8A",
  neutral400: "#564E4A",
  neutral300: "#3C3836",
  neutral200: "#191015",
  neutral100: "#000000",

  primary600: "#F4E0D9",
  primary500: "#E8C1B4",
  primary400: "#DDA28E",
  primary300: "#D28468",
  primary200: "#C76542",
  primary100: "#A54F31",

  secondary500: "#DCDDE9",
  secondary400: "#BCC0D6",
  secondary300: "#9196B9",
  secondary200: "#626894",
  secondary100: "#41476E",

  accent500: "#FFEED4",
  accent400: "#FFE1B2",
  accent300: "#FDD495",
  accent200: "#FBC878",
  accent100: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  // Security/Data Monitoring App Colors
  blue50: "#EFF6FF",
  blue100: "#DBEAFE",
  blue500: "#3B82F6",
  blue600: "#2563EB",
  blue700: "#1E40AF",

  green50: "#F0FDF4",
  green100: "#D1FAE5",
  green500: "#10B981",
  green600: "#059669",

  purple50: "#F5F3FF",
  purple100: "#EDE9FE",
  purple500: "#8B5CF6",

  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  red50: "#FEF2F2",
  red100: "#FEE2E2",
  red500: "#EF4444",
  red600: "#DC2626",

  yellow50: "#FFFBEB",
  yellow100: "#FEF3C7",
  yellow200: "#FDE68A",
  yellow500: "#F59E0B",
  yellow600: "#D97706",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
  /**
   * Primary brand color (blue)
   */
  primary: palette.blue600,
  /**
   * Success/Complete color (green)
   */
  success: palette.green500,
  /**
   * Warning color (yellow/orange)
   */
  warning: palette.yellow500,
  /**
   * High severity/Error color (red)
   */
  danger: palette.red500,
  /**
   * Medium severity color (orange)
   */
  medium: palette.yellow500,
  /**
   * Low severity color (blue)
   */
  low: palette.blue500,
  /**
   * White color
   */
  white: palette.neutral900,
  /**
   * Text primary color
   */
  textPrimary: palette.neutral900,
  /**
   * Text secondary color
   */
  textSecondary: palette.neutral800,
  /**
   * Text tertiary color
   */
  textTertiary: palette.neutral600,
  /**
   * Text disabled color
   */
  textDisabled: palette.neutral400,
  /**
   * Background light colors
   */
  backgroundLight: palette.neutral200,
  backgroundLightBlue: palette.blue100,
  backgroundLightGreen: palette.green100,
  backgroundLightPurple: palette.purple100,
  backgroundLightRed: palette.red100,
  backgroundLightYellow: palette.yellow100,
} as const
