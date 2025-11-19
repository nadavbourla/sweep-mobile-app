import type { ThemedStyle, ThemedStyleArray } from "./types"
import type { TextStyle, ViewStyle } from "react-native"

/**
 * Shared style constants used across multiple screens
 */

// Card styles
export const $card: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.white,
  borderRadius: 16,
  padding: spacing.xl,
  marginBottom: spacing.xl,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
})

export const $cardSmall: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.white,
  borderRadius: 12,
  padding: spacing.md,
  marginBottom: spacing.md,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
})

// Button styles
export const $primaryButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.primary,
  borderRadius: 12,
  paddingVertical: 16,
  minHeight: 52,
  width: "100%",
})

export const $primaryButtonText: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: colors.white,
  fontWeight: "700",
})

export const $disabledButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.backgroundLight,
  borderRadius: 12,
  paddingVertical: 16,
  minHeight: 52,
  width: "100%",
})

export const $disabledButtonText: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: colors.textDisabled,
  fontWeight: "700",
})

// Text styles
export const $headingLarge: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 32,
  fontFamily: typography.primary.bold,
  color: colors.textPrimary,
  marginBottom: spacing.xs,
  fontWeight: "700",
})

export const $headingMedium: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 24,
  fontFamily: typography.primary.bold,
  color: colors.textPrimary,
  marginBottom: spacing.sm,
  fontWeight: "700",
})

export const $headingSmall: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 20,
  fontFamily: typography.primary.bold,
  color: colors.textPrimary,
  marginBottom: spacing.md,
  fontWeight: "700",
})

export const $bodyText: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: colors.textSecondary,
  lineHeight: 24,
  marginBottom: spacing.md,
})

export const $bodyTextSmall: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: colors.textSecondary,
  lineHeight: 20,
})

export const $captionText: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: colors.textTertiary,
})

// Icon container styles
export const $iconContainerLarge: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: colors.backgroundLightBlue,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginBottom: spacing.lg,
})

export const $iconContainerMedium: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: 56,
  height: 56,
  borderRadius: 28,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.sm,
})

export const $iconContainerGreen: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.backgroundLightGreen,
})

export const $iconContainerBlue: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.backgroundLightBlue,
})

export const $iconContainerPurple: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.backgroundLightPurple,
})

// Badge styles
export const $badge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderRadius: 16,
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginRight: spacing.xs,
  marginBottom: spacing.xxs,
})

export const $badgeText: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 12,
  fontFamily: typography.primary.bold,
  color: colors.white,
  fontWeight: "700",
})

export const $badgeHigh: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.danger,
})

export const $badgeMedium: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.medium,
})

export const $badgeLow: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.low,
})

// Input styles
export const $inputLabel: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: colors.textSecondary,
  marginBottom: spacing.xs,
  fontWeight: "600",
})

export const $inputWrapper: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.backgroundLight,
  borderRadius: 12,
  borderWidth: 0,
})

export const $inputText: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: colors.textSecondary,
  paddingVertical: 14,
  paddingHorizontal: 16,
})

