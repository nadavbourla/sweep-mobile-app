import { FC } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface SecurityReportScreenProps extends AppStackScreenProps<"SecurityReport"> {}

interface Breach {
  id: string
  name: string
  date: string
  severity: "HIGH" | "MEDIUM" | "LOW"
  description: string
  compromisedData: string[]
}

// Mock data
const mockBreaches: Breach[] = [
  {
    id: "1",
    name: "DataCorp Breach",
    date: "March 2024",
    severity: "HIGH",
    description:
      "Large e-commerce platform exposed customer data including encrypted passwords and contact information.",
    compromisedData: ["Email", "Password", "Phone"],
  },
  {
    id: "2",
    name: "SocialMedia Leak",
    date: "January 2024",
    severity: "HIGH",
    description: "Social media platform data breach affecting millions of users worldwide.",
    compromisedData: ["Email", "Password", "Username"],
  },
  {
    id: "3",
    name: "CloudStorage Incident",
    date: "December 2023",
    severity: "MEDIUM",
    description: "Cloud storage service experienced unauthorized access to user accounts.",
    compromisedData: ["Email", "Phone"],
  },
  {
    id: "4",
    name: "Newsletter Database",
    date: "November 2023",
    severity: "LOW",
    description: "Newsletter subscription service had a minor data exposure incident.",
    compromisedData: ["Email"],
  },
]

export const SecurityReportScreen: FC<SecurityReportScreenProps> = ({ navigation, route }) => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const email = route.params?.email || "a@gmail.com"
  const breaches = mockBreaches
  const highCount = breaches.filter((b) => b.severity === "HIGH").length
  const mediumCount = breaches.filter((b) => b.severity === "MEDIUM").length
  const lowCount = breaches.filter((b) => b.severity === "LOW").length

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
          <View style={themed($headerBrand)}>
            <View style={themed($headerIconContainer)}>
              <Icon icon="lock" size={20} color="#2563EB" />
              <View style={themed($checkOverlay)}>
                <Icon icon="check" size={10} color="#FFFFFF" />
              </View>
            </View>
            <Text text="MEONTHEWEB" style={themed($brandText)} />
          </View>
          <Button
            text="New Scan"
            style={themed($newScanButton)}
            textStyle={themed($newScanButtonText)}
            onPress={() => navigation.navigate("EmailEntry")}
          />
        </View>

        {/* Scan Status */}
        <View style={themed($statusContainer)}>
          <View style={themed($statusIndicator)}>
            <View style={themed($statusDot)} />
            <Text text="Scan Complete" style={themed($statusText)} />
          </View>
          <Text text="Security Report" style={themed($reportTitle)} />
          <Text text={`Results for ${email}`} style={themed($reportSubtitle)} />
        </View>

        {/* Data Breaches Summary Card */}
        <View style={themed($summaryCard)}>
          <View style={themed($summaryHeader)}>
            <View style={themed($warningIconContainer)}>
              <View style={themed($warningTriangle)} />
            </View>
            <View style={themed($summaryTextContainer)}>
              <Text text={`${breaches.length} Data Breaches Found`} style={themed($summaryTitle)} />
              <Text
                text="Your email has been found in 4 known data breaches. We recommend taking immediate action."
                style={themed($summaryDescription)}
              />
            </View>
          </View>
          <View style={themed($severityBadgesContainer)}>
            {highCount > 0 && (
              <View style={themed($severityBadgeHigh)}>
                <Text text={`${highCount} High`} style={themed($severityBadgeText)} />
              </View>
            )}
            {mediumCount > 0 && (
              <View style={themed($severityBadgeMedium)}>
                <Text text={`${mediumCount} Medium`} style={themed($severityBadgeText)} />
              </View>
            )}
            {lowCount > 0 && (
              <View style={themed($severityBadgeLow)}>
                <Text text={`${lowCount} Low`} style={themed($severityBadgeText)} />
              </View>
            )}
          </View>
        </View>

        {/* Recent Breaches Section */}
        <Text text="Recent Breaches" style={themed($sectionTitle)} />

        {/* Breach Cards */}
        {breaches.map((breach) => {
          const borderStyle = themed(getSeverityBorderColor(breach.severity))
          const badgeStyle = themed(getSeverityBadgeStyle(breach.severity))
          return (
            <View key={breach.id} style={themed($breachCard)}>
              <View style={borderStyle} />
              <View style={themed($breachCardContent)}>
                <View style={themed($breachCardHeader)}>
                  <View style={themed($breachCardHeaderLeft)}>
                    <Text text={breach.name} style={themed($breachTitle)} />
                    <View style={themed($breachMeta)}>
                      <Icon
                        icon="bell"
                        size={14}
                        color="#6B7280"
                        containerStyle={themed($breachIconContainer)}
                      />
                      <Text text={breach.date} style={themed($breachDate)} />
                      <View style={badgeStyle}>
                        <Text text={breach.severity} style={themed($breachSeverityText)} />
                      </View>
                    </View>
                  </View>
                  <Icon icon="view" size={20} color="#10B981" />
                </View>
                <Text text={breach.description} style={themed($breachDescription)} />
                <View style={themed($compromisedDataContainer)}>
                  <Text text="Compromised Data:" style={themed($compromisedDataLabel)} />
                  <View style={themed($compromisedDataBadges)}>
                    {breach.compromisedData.map((data, index) => (
                      <View key={index} style={themed($compromisedDataBadge)}>
                        <Text text={data} style={themed($compromisedDataBadgeText)} />
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </Screen>
  )
}

// Helper functions for dynamic styles
function getSeverityBorderColor(severity: string): ThemedStyle<ViewStyle> {
  const colors = {
    HIGH: "#EF4444",
    MEDIUM: "#F59E0B",
    LOW: "#3B82F6",
  }
  return () => ({
    width: 4,
    backgroundColor: colors[severity as keyof typeof colors] || "#6B7280",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  })
}

function getSeverityBadgeStyle(severity: string): ThemedStyle<ViewStyle> {
  const colors = {
    HIGH: { bg: "#EF4444", text: "#FFFFFF" },
    MEDIUM: { bg: "#F59E0B", text: "#FFFFFF" },
    LOW: { bg: "#3B82F6", text: "#FFFFFF" },
  }
  const color = colors[severity as keyof typeof colors] || { bg: "#6B7280", text: "#FFFFFF" }
  return () => ({
    backgroundColor: color.bg,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  })
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

const $headerBrand: ThemedStyle<ViewStyle> = () => ({
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
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

const $newScanButton: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "#2563EB",
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
  minHeight: 40,
})

const $newScanButtonText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
  fontWeight: "700",
})

const $statusContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
})

const $statusIndicator: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.md,
})

const $statusDot: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#10B981",
  marginRight: spacing.xs,
})

const $statusText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  color: "#10B981",
  fontWeight: "600",
})

const $reportTitle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 32,
  fontFamily: typography.primary.bold,
  color: "#111827",
  marginBottom: spacing.xs,
  fontWeight: "700",
})

const $reportSubtitle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
  lineHeight: 24,
})

const $summaryCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#FEE2E2",
  borderRadius: 12,
  padding: spacing.lg,
  marginBottom: spacing.xl,
})

const $summaryHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  marginBottom: spacing.md,
})

const $warningIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.md,
  justifyContent: "flex-start",
  paddingTop: spacing.xxs,
})

const $warningTriangle: ThemedStyle<ViewStyle> = () => ({
  width: 0,
  height: 0,
  borderLeftWidth: 8,
  borderRightWidth: 8,
  borderBottomWidth: 12,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderBottomColor: "#EF4444",
  borderStyle: "solid",
})

const $summaryTextContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $summaryTitle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 20,
  fontFamily: typography.primary.bold,
  color: "#111827",
  marginBottom: spacing.xs,
  fontWeight: "700",
})

const $summaryDescription: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#374151",
  lineHeight: 20,
})

const $severityBadgesContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xs,
})

const $severityBadgeHigh: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#EF4444",
  borderRadius: 16,
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginRight: spacing.xs,
  marginBottom: spacing.xxs,
})

const $severityBadgeMedium: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#F59E0B",
  borderRadius: 16,
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginRight: spacing.xs,
  marginBottom: spacing.xxs,
})

const $severityBadgeLow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#3B82F6",
  borderRadius: 16,
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginRight: spacing.xs,
  marginBottom: spacing.xxs,
})

const $severityBadgeText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
  fontWeight: "700",
})

const $sectionTitle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 20,
  fontFamily: typography.primary.bold,
  color: "#111827",
  marginBottom: spacing.md,
  fontWeight: "700",
})

const $breachCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
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

const $breachCardContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.md,
  position: "relative",
})

const $breachCardHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: spacing.sm,
})

const $breachCardHeaderLeft: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $breachTitle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 18,
  fontFamily: typography.primary.bold,
  color: "#111827",
  marginBottom: spacing.xs,
  fontWeight: "700",
})

const $breachMeta: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

const $breachIconContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.xxs,
})

const $breachDate: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
  marginRight: spacing.xs,
})

const $breachSeverityText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 10,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
  fontWeight: "700",
})

const $breachDescription: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 14,
  fontFamily: typography.primary.normal,
  color: "#374151",
  marginBottom: spacing.md,
  lineHeight: 20,
})

const $compromisedDataContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

const $compromisedDataLabel: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: "#6B7280",
  marginBottom: spacing.xs,
  fontWeight: "600",
})

const $compromisedDataBadges: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xs,
})

const $compromisedDataBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#F3F4F6",
  borderRadius: 12,
  paddingHorizontal: 10,
  paddingVertical: 4,
  marginRight: spacing.xs,
  marginBottom: spacing.xxs,
})

const $compromisedDataBadgeText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#374151",
})
