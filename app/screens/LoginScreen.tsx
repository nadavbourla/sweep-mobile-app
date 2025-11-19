import { FC } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { BrandHeader } from "@/components/BrandHeader"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import * as $shared from "@/theme/sharedStyles"
import type { ThemedStyle } from "@/theme/types"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const {
    themed,
    theme: { colors },
    theme,
  } = useAppTheme()

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
      backgroundColor={colors.palette.neutral100}
    >
      <ScrollView
        contentContainerStyle={themed($scrollContent)}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <BrandHeader />

        {/* Main Content */}
        <View style={themed($mainContent)}>
          <Text text="Stay Safe Online with" style={themed($headlinePart1)} />
          <Text text="Personal Data Monitoring" style={themed($headlinePart2)} />
          <Text
            text="We help you stay secure by monitoring your personal data for breaches and compromises."
            style={themed($bodyText)}
          />

          {/* How it works */}
          <Text text="How it works:" style={themed($headingSmall)} />

          {/* Step 1 */}
          <View style={themed($stepContainer)}>
            <View style={themed($stepNumber)}>
              <Text text="1" style={themed($stepNumberText)} />
            </View>
            <View style={themed($stepContent)}>
              <Text text="Enter your email" style={themed($stepTitle)} />
              <Text text="Provide your email address to monitor" style={themed($stepDescription)} />
            </View>
          </View>

          {/* Step 2 */}
          <View style={themed($stepContainer)}>
            <View style={themed($stepNumber)}>
              <Text text="2" style={themed($stepNumberText)} />
            </View>
            <View style={themed($stepContent)}>
              <Text text="Verify your identity" style={themed($stepTitle)} />
              <Text text="We'll send a verification code" style={themed($stepDescription)} />
            </View>
          </View>

          {/* Step 3 */}
          <View style={themed($stepContainer)}>
            <View style={themed($stepNumber)}>
              <Text text="3" style={themed($stepNumberText)} />
            </View>
            <View style={themed($stepContent)}>
              <Text text="Get security results" style={themed($stepTitle)} />
              <Text text="See if your data has been compromised" style={themed($stepDescription)} />
            </View>
          </View>

          {/* Features */}
          <View style={themed($featuresContainer)}>
            <View style={themed($featureItem)}>
              <View style={[themed($iconContainerMedium), themed($iconContainerGreen)]}>
                <Icon icon="check" size={24} color={colors.success} />
              </View>
              <Text text="Privacy First" style={themed($featureText)} />
            </View>
            <View style={themed($featureItem)}>
              <View style={[themed($iconContainerMedium), themed($iconContainerBlue)]}>
                <Icon icon="lock" size={24} color={colors.primary} />
              </View>
              <Text text="Secure" style={themed($featureText)} />
            </View>
            <View style={themed($featureItem)}>
              <View style={[themed($iconContainerMedium), themed($iconContainerPurple)]}>
                <Icon icon="bell" size={24} color={theme.colors.palette.purple500} />
              </View>
              <Text text="Instant" style={themed($featureText)} />
            </View>
          </View>

        </View>

        {/* Footer Button */}
        <View style={themed($footerContainer)}>
          <Button
            testID="login-button"
            text="Try Now"
            style={themed($shared.$primaryButton)}
            textStyle={themed($shared.$primaryButtonText)}
            onPress={() => navigation.navigate("EmailEntry")}
          />
          <Text text="Instant results" style={themed($instantResultsText)} />
        </View>
      </ScrollView>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $scrollContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 1,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  paddingBottom: spacing.xxl,
})


const $mainContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})

const $headlinePart1: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 28,
  fontFamily: typography.primary.bold,
  color: colors.textSecondary,
  marginBottom: spacing.xs,
  fontWeight: "700",
})

const $headlinePart2: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 28,
  fontFamily: typography.primary.bold,
  color: colors.primary,
  marginBottom: spacing.md,
  fontWeight: "700",
})

const $bodyText: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: colors.textTertiary,
  marginBottom: spacing.xl,
  lineHeight: 24,
})

const $headingSmall: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 20,
  fontFamily: typography.primary.bold,
  color: colors.textSecondary,
  marginBottom: spacing.md,
  fontWeight: "700",
})

const $stepContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  marginBottom: spacing.lg,
  alignItems: "flex-start",
})

const $stepNumber: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: colors.primary,
  justifyContent: "center",
  alignItems: "center",
  marginRight: spacing.md,
})

const $stepNumberText: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: colors.white,
  fontWeight: "700",
})

const $stepContent: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $stepTitle: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: colors.textSecondary,
  marginBottom: spacing.xxs,
  fontWeight: "600",
})

const $stepDescription: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: colors.textTertiary,
  lineHeight: 20,
})

const $featuresContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: spacing.lg,
  marginBottom: spacing.xl,
})

const $featureItem: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  flex: 1,
})

const $iconContainerMedium: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 56,
  height: 56,
  borderRadius: 28,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.sm,
})

const $iconContainerGreen: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.backgroundLightGreen,
})

const $iconContainerBlue: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.backgroundLightBlue,
})

const $iconContainerPurple: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.backgroundLightPurple,
})

const $featureText: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: colors.textSecondary,
  fontWeight: "600",
})

const $footerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
})

const $tryNowButton: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "#2563EB",
  borderRadius: 12,
  paddingVertical: 18,
  minHeight: 56,
  width: "100%",
})

const $tryNowButtonText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 18,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
  fontWeight: "700",
})

const $instantResultsText: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: colors.textTertiary,
  textAlign: "center",
  marginTop: spacing.sm,
})
