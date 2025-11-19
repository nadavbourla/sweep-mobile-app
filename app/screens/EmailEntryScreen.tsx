import { FC, useState } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { BrandHeader } from "@/components/BrandHeader"
import { Icon } from "@/components/Icon"
import { ProgressIndicator } from "@/components/ProgressIndicator"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import * as $shared from "@/theme/sharedStyles"
import type { ThemedStyle } from "@/theme/types"

interface EmailEntryScreenProps extends AppStackScreenProps<"EmailEntry"> {}

export const EmailEntryScreen: FC<EmailEntryScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const isValidEmail = email.length > 0 && email.includes("@") && email.includes(".")

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
          backgroundColor={colors.white}
    >
      <ScrollView
        contentContainerStyle={themed($scrollContent)}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <BrandHeader
          showBackButton
          onBackPress={() => navigation.goBack()}
          stepText="Step 1 of 3"
        />

        {/* Progress Indicator */}
        <ProgressIndicator
          steps={[
            { number: 1, label: "Email", status: "active" },
            { number: 2, label: "Verify", status: "inactive" },
            { number: 3, label: "Results", status: "inactive" },
          ]}
        />

        {/* Main Content Card */}
        <View style={themed($shared.$card)}>
          {/* Icon */}
          <View style={themed($shared.$iconContainerLarge)}>
            <View style={themed($envelopeIcon)}>
              <View style={themed($envelopeTop)} />
              <View style={themed($envelopeBottom)} />
            </View>
          </View>

          {/* Title */}
          <Text text="Enter Your Email" style={themed($shared.$headingMedium)} />

          {/* Description */}
          <Text
            text="We'll check if your email has appeared in any data breaches"
            style={themed($shared.$bodyText)}
          />

          {/* Email Input */}
          <View style={themed($inputContainer)}>
            <Text text="Email Address" style={themed($shared.$inputLabel)} />
            <TextField
              value={email}
              onChangeText={setEmail}
              placeholder="your.email@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              containerStyle={themed($emailInput)}
              inputWrapperStyle={themed($shared.$inputWrapper)}
              style={themed($shared.$inputText)}
            />
          </View>

          {/* Continue Button */}
          <Button
            text="Continue"
            style={themed(
              isValidEmail ? $shared.$primaryButton : $shared.$disabledButton,
            )}
            textStyle={themed(
              isValidEmail ? $shared.$primaryButtonText : $shared.$disabledButtonText,
            )}
            disabled={!isValidEmail}
            onPress={() => {
              navigation.navigate("EmailVerification", { email })
            }}
          />

          {/* Privacy Information Box */}
          <View style={themed($privacyBox)}>
            <Icon icon="lock" size={20} color={colors.primary} />
            <View style={themed($privacyTextContainer)}>
              <Text text="Your privacy is protected" style={themed($privacyTitle)} />
              <Text
                text="We use secure connections and never store your information."
                style={themed($privacyDescription)}
              />
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text
          text="By continuing, you agree to our privacy-first approach"
          style={themed($footerText)}
        />
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
  paddingTop: spacing.md,
  paddingBottom: spacing.xxl,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.xl,
})

const $backButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
  marginLeft: -spacing.xs,
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

const $checkOverlay: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  bottom: -2,
  right: -2,
  backgroundColor: "#2563EB",
  borderRadius: 8,
  width: 16,
  height: 16,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#FFFFFF",
})

const $brandText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#374151",
  fontWeight: "700",
})

const $stepIndicator: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#9CA3AF",
})

const $progressContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: spacing.xxl,
  paddingHorizontal: spacing.md,
})

const $progressStep: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $progressCircleActive: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#2563EB",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $progressCircleInactive: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#F3F4F6",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $progressNumberActive: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
  fontWeight: "700",
})

const $progressNumberInactive: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#6B7280",
  fontWeight: "700",
})

const $progressLabelActive: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#2563EB",
  fontWeight: "600",
})

const $progressLabelInactive: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#9CA3AF",
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

const $dashSegment: ThemedStyle<ViewStyle> = () => ({
  width: 4,
  height: 2,
  backgroundColor: "#D1D5DB",
  marginRight: 2,
})

const $contentCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#FFFFFF",
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

const $cardIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: "#DBEAFE",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginBottom: spacing.lg,
})

const $envelopeIcon: ThemedStyle<ViewStyle> = () => ({
  width: 32,
  height: 24,
  position: "relative",
})

const $envelopeTop: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 0,
  height: 0,
  borderLeftWidth: 16,
  borderRightWidth: 16,
  borderBottomWidth: 12,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor: colors.primary,
  borderStyle: "solid",
  position: "absolute",
  top: 0,
})

const $envelopeBottom: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 32,
  height: 16,
  backgroundColor: colors.primary,
  position: "absolute",
  bottom: 0,
  borderRadius: 2,
})

const $cardTitle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 24,
  fontFamily: typography.primary.bold,
  color: "#374151",
  textAlign: "center",
  marginBottom: spacing.sm,
  fontWeight: "700",
})

const $cardDescription: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#374151",
  textAlign: "center",
  marginBottom: spacing.xl,
  lineHeight: 24,
})

const $inputContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $inputLabel: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#374151",
  marginBottom: spacing.xs,
  fontWeight: "600",
})

const $emailInput: ThemedStyle<ViewStyle> = () => ({
  marginBottom: 0,
})

const $emailInputWrapper: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "#F3F4F6",
  borderRadius: 12,
  borderWidth: 0,
})

const $emailInputText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#374151",
  paddingVertical: 14,
  paddingHorizontal: 16,
})

const $continueButtonActive: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#2563EB",
  borderRadius: 12,
  paddingVertical: 16,
  minHeight: 52,
  width: "100%",
  marginBottom: spacing.md,
})

const $continueButtonInactive: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#F3F4F6",
  borderRadius: 12,
  paddingVertical: 16,
  minHeight: 52,
  width: "100%",
  marginBottom: spacing.md,
})

const $continueButtonTextActive: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
  fontWeight: "700",
})

const $continueButtonTextInactive: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#9CA3AF",
  fontWeight: "700",
})

const $privacyBox: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: "row",
  backgroundColor: colors.backgroundLightBlue,
  borderRadius: 12,
  padding: spacing.md,
  alignItems: "flex-start",
  marginTop: spacing.md,
})

const $privacyTextContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginLeft: spacing.sm,
})

const $privacyTitle: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 14,
  fontFamily: typography.primary.bold,
  color: colors.primary,
  marginBottom: spacing.xxs,
  fontWeight: "700",
})

const $privacyDescription: ThemedStyle<TextStyle> = ({ typography, colors }) => ({
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: colors.primary,
  lineHeight: 18,
})

const $footerText: ThemedStyle<TextStyle> = ({ typography, spacing, colors }) => ({
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: colors.textDisabled,
  textAlign: "center",
  marginTop: spacing.md,
})
