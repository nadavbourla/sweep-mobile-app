import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"

import { Icon, PressableIcon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface BrandHeaderProps {
  showBackButton?: boolean
  onBackPress?: () => void
  rightElement?: React.ReactNode
  stepText?: string
}

export const BrandHeader: FC<BrandHeaderProps> = ({
  showBackButton = false,
  onBackPress,
  rightElement,
  stepText,
}) => {
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($header)}>
      {showBackButton && onBackPress && (
        <PressableIcon
          icon="caretLeft"
          size={24}
          color={theme.colors.textSecondary}
          containerStyle={themed($backButton)}
          onPress={onBackPress}
        />
      )}
      <View style={themed($headerBrand)}>
        <View style={themed($headerIconContainer)}>
          <Icon icon="lock" size={20} color={theme.colors.primary} />
          <View style={themed($checkOverlay)}>
            <Icon icon="check" size={10} color={theme.colors.white} />
          </View>
        </View>
        <Text text="MEONTHEWEB" style={themed($brandText)} />
      </View>
      {rightElement || (stepText && <Text text={stepText} style={themed($stepIndicator)} />)}
    </View>
  )
}

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.xl,
})

const $backButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  marginLeft: -spacing.xs,
  marginRight: spacing.sm,
})

const $headerBrand: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
  marginLeft: spacing.sm,
})

const $headerIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "relative",
  width: 28,
  height: 28,
  marginRight: spacing.xs,
  justifyContent: "center",
  alignItems: "flex-start",
})

const $checkOverlay: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: -2,
  right: -2,
  backgroundColor: colors.primary,
  borderRadius: 8,
  width: 16,
  height: 16,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: colors.white,
})

const $brandText: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: colors.textSecondary,
  fontWeight: "700",
})

const $stepIndicator: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: colors.textTertiary,
})

