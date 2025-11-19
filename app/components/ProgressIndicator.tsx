import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface Step {
  number: number
  label: string
  status: "completed" | "active" | "inactive"
}

interface ProgressIndicatorProps {
  steps: Step[]
}

export const ProgressIndicator: FC<ProgressIndicatorProps> = ({ steps }) => {
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($progressContainer)}>
      {steps.map((step, index) => (
        <View key={step.number} style={themed($progressStepContainer)}>
          <View style={themed($progressStep)}>
            {step.status === "completed" ? (
              <View style={themed($progressCircleCompleted)}>
                <Icon icon="check" size={20} color={theme.colors.white} />
              </View>
            ) : (
              <View
                style={themed(
                  step.status === "active" ? $progressCircleActive : $progressCircleInactive,
                )}
              >
                <Text text={String(step.number)} style={themed($progressNumber)} />
              </View>
            )}
            <Text
              text={step.label}
              style={themed(
                step.status === "completed"
                  ? $progressLabelCompleted
                  : step.status === "active"
                    ? $progressLabelActive
                    : $progressLabelInactive,
              )}
            />
          </View>
          {index < steps.length - 1 && (
            <View style={themed($dashedLine)}>
              {Array.from({ length: 8 }).map((_, i) => (
                <View key={i} style={themed($dashSegment)} />
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  )
}

const $progressContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.xxl,
  paddingHorizontal: spacing.md,
})

const $progressStepContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
})

const $progressStep: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $progressCircleCompleted: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.success,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $progressCircleActive: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.primary,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $progressCircleInactive: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: colors.backgroundLight,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $progressNumber: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: colors.textSecondary,
  fontWeight: "700",
})

const $progressLabelCompleted: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: colors.success,
  fontWeight: "600",
})

const $progressLabelActive: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: colors.primary,
  fontWeight: "600",
})

const $progressLabelInactive: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: colors.textDisabled,
  fontWeight: "600",
})

const $dashedLine: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: spacing.sm,
  marginTop: -spacing.md,
  height: 2,
})

const $dashSegment: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 4,
  height: 2,
  backgroundColor: colors.palette.gray300,
  marginRight: 2,
})

