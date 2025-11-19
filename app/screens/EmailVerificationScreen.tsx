import { FC, useState } from "react"
import { Pressable, ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface EmailVerificationScreenProps extends AppStackScreenProps<"EmailVerification"> {}

export const EmailVerificationScreen: FC<EmailVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const [verificationCode, setVerificationCode] = useState("")
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const email = route.params?.email || ""
  
  // Email validation
  const isValidEmail = email.length > 0 && email.includes("@") && email.includes(".")
  const emailError = email && !isValidEmail ? "Please enter a valid email address" : ""
  
  const isValidCode = verificationCode.length === 6 && /^\d+$/.test(verificationCode)

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
        <View style={themed($header)}>
          <Pressable onPress={() => navigation.goBack()} style={themed($backButton)}>
            <Icon icon="caretLeft" size={24} color="#374151" />
          </Pressable>
          <View style={themed($headerBrand)}>
            <View style={themed($headerIconContainer)}>
              <Icon icon="lock" size={20} color="#2563EB" />
              <View style={themed($checkOverlay)}>
                <Icon icon="check" size={10} color="#FFFFFF" />
              </View>
            </View>
            <Text text="MEONTHEWEB" style={themed($brandText)} />
          </View>
          <Text text="Step 2 of 3" style={themed($stepIndicator)} />
        </View>

        {/* Progress Indicator */}
        <View style={themed($progressContainer)}>
          {/* Step 1 - Email (Completed) */}
          <View style={themed($progressStep)}>
            <View style={themed($progressCircleCompleted)}>
              <Icon icon="check" size={20} color="#FFFFFF" />
            </View>
            <Text text="Email" style={themed($progressLabelCompleted)} />
          </View>

          {/* Dashed Line */}
          <View style={themed($dashedLine)}>
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={i} style={themed($dashSegment)} />
            ))}
          </View>

          {/* Step 2 - Verify (Active) */}
          <View style={themed($progressStep)}>
            <View style={themed($progressCircleActive)}>
              <Text text="2" style={themed($progressNumberActive)} />
            </View>
            <Text text="Verify" style={themed($progressLabelActive)} />
          </View>

          {/* Dashed Line */}
          <View style={themed($dashedLine)}>
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={i} style={themed($dashSegment)} />
            ))}
          </View>

          {/* Step 3 - Results (Inactive) */}
          <View style={themed($progressStep)}>
            <View style={themed($progressCircleInactive)}>
              <Text text="3" style={themed($progressNumberInactive)} />
            </View>
            <Text text="Results" style={themed($progressLabelInactive)} />
          </View>
        </View>

        {/* Main Content Card */}
        <View style={themed($contentCard)}>
          {/* Icon */}
          <View style={themed($cardIconContainer)}>
            <View style={themed($envelopeIcon)}>
              <View style={themed($envelopeTopGreen)} />
              <View style={themed($envelopeBottomGreen)} />
            </View>
          </View>

          {/* Title */}
          <Text text="Check Your Email" style={themed($cardTitle)} />

          {/* Instructional Text */}
          <View style={themed($instructionContainer)}>
            <Text text="We've sent a 6-digit code to" style={themed($instructionText)} />
            {emailError ? (
              <View style={themed($errorContainer)}>
                <Text text={emailError} style={themed($errorText)} />
              </View>
            ) : (
              <Text text={email || "your email"} style={themed($emailText)} />
            )}
          </View>

          {/* Verification Code Input */}
          <View style={themed($inputContainer)}>
            <Text text="Verification Code" style={themed($inputLabel)} />
            <TextField
              value={verificationCode}
              onChangeText={(text) => {
                // Only allow digits and limit to 6 characters
                const digitsOnly = text.replace(/[^\d]/g, "").slice(0, 6)
                setVerificationCode(digitsOnly)
              }}
              placeholder="123456"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={6}
              containerStyle={themed($codeInput)}
              inputWrapperStyle={themed($codeInputWrapper)}
              style={themed($codeInputText)}
            />
            <Text text="Enter the 6-digit code from your email" style={themed($hintText)} />
          </View>

          {/* Verify & Continue Button */}
          <Button
            text="Verify & Continue"
            style={themed(
              isValidCode && isValidEmail ? $verifyButtonActive : $verifyButtonInactive,
            )}
            textStyle={themed(
              isValidCode && isValidEmail ? $verifyButtonTextActive : $verifyButtonTextInactive,
            )}
            disabled={!isValidCode || !isValidEmail}
            onPress={() => {
              if (isValidEmail) {
                navigation.navigate("SecurityReport", { email })
              }
            }}
          />

          {/* Resend Code Section */}
          <View style={themed($resendContainer)}>
            <Text text="Didn't receive the code?" style={themed($resendQuestion)} />
            <Pressable onPress={() => console.log("Resend code")}>
              <Text text="Resend Code" style={themed($resendLink)} />
            </Pressable>
          </View>

          {/* Warning Box */}
          <View style={themed($warningBox)}>
            <View style={themed($warningDot)} />
            <View style={themed($warningTextContainer)}>
              <Text text="Code expires in 10 minutes" style={themed($warningTitle)} />
              <Text
                text="For security, codes are only valid for a short time."
                style={themed($warningDescription)}
              />
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text
          text="Check your spam folder if you don't see the email"
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
  color: "#374151",
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

const $progressCircleCompleted: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "#10B981",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.xs,
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

const $progressLabelCompleted: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#10B981",
  fontWeight: "600",
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

const $envelopeTopGreen: ThemedStyle<ViewStyle> = () => ({
  width: 0,
  height: 0,
  borderLeftWidth: 16,
  borderRightWidth: 16,
  borderBottomWidth: 12,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor: "#10B981",
  borderStyle: "solid",
  position: "absolute",
  top: 0,
})

const $envelopeBottomGreen: ThemedStyle<ViewStyle> = () => ({
  width: 32,
  height: 16,
  backgroundColor: "#10B981",
  position: "absolute",
  bottom: 0,
  borderRadius: 2,
})

const $cardTitle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 24,
  fontFamily: typography.primary.bold,
  color: "#374151",
  textAlign: "center",
  marginBottom: spacing.md,
  fontWeight: "700",
})

const $instructionContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginBottom: spacing.xl,
})

const $instructionText: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#374151",
  textAlign: "center",
  marginBottom: spacing.xs,
  lineHeight: 24,
})

const $emailText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#374151",
  textAlign: "center",
  fontWeight: "700",
})

const $errorContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
  paddingHorizontal: spacing.md,
})

const $errorText: ThemedStyle<TextStyle> = ({ typography, colors, spacing }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: colors.danger,
  textAlign: "center",
  marginTop: spacing.xs,
  fontWeight: "600",
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

const $codeInput: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

const $codeInputWrapper: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "#F3F4F6",
  borderRadius: 12,
  borderWidth: 0,
})

const $codeInputText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 20,
  fontFamily: typography.primary.bold,
  color: "#374151",
  paddingVertical: 16,
  paddingHorizontal: 16,
  textAlign: "center",
  letterSpacing: 4,
  fontWeight: "700",
})

const $hintText: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#374151",
  marginTop: spacing.xs,
  lineHeight: 18,
})

const $verifyButtonActive: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#2563EB",
  borderRadius: 12,
  paddingVertical: 16,
  minHeight: 52,
  width: "100%",
  marginBottom: spacing.md,
})

const $verifyButtonInactive: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#F3F4F6",
  borderRadius: 12,
  paddingVertical: 16,
  minHeight: 52,
  width: "100%",
  marginBottom: spacing.md,
})

const $verifyButtonTextActive: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
  fontWeight: "700",
})

const $verifyButtonTextInactive: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  color: "#9CA3AF",
  fontWeight: "700",
})

const $resendContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing.md,
  flexWrap: "wrap",
})

const $resendQuestion: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#374151",
  marginRight: spacing.xs,
})

const $resendLink: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  fontFamily: typography.primary.bold,
  color: "#2563EB",
  fontWeight: "700",
  textDecorationLine: "underline",
})

const $warningBox: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  backgroundColor: "#FEF3C7",
  borderRadius: 12,
  padding: spacing.md,
  borderWidth: 1,
  borderColor: "#FDE68A",
  alignItems: "flex-start",
})

const $warningDot: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#F59E0B",
  marginTop: spacing.xxs,
  marginRight: spacing.sm,
})

const $warningTextContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $warningTitle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 14,
  fontFamily: typography.primary.bold,
  color: "#D97706",
  marginBottom: spacing.xxs,
  fontWeight: "700",
})

const $warningDescription: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 13,
  fontFamily: typography.primary.normal,
  color: "#D97706",
  lineHeight: 18,
})

const $footerText: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#374151",
  textAlign: "center",
  marginTop: spacing.md,
})
