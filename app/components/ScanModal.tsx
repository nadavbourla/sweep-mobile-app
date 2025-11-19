import { FC, useState } from "react"
import { ActivityIndicator, Modal, ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { investigateApi } from "@/services/api/investigateApi"
import type { SearchParams, SearchResult } from "@/services/api/investigateApi"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface ScanModalProps {
  visible: boolean
  onClose: () => void
  onScanComplete?: (email: string, results: SearchResult[]) => void
}

export const ScanModal: FC<ScanModalProps> = ({ visible, onClose, onScanComplete }) => {
  const {
    themed,
    theme: { colors, spacing, typography },
  } = useAppTheme()

  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter an email address")
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      const params: SearchParams = {
        query: searchQuery.trim(),
        entity: "emails",
        index: "leaked_credentials",
      }

      const result = await investigateApi.search(params)

      if (result.kind === "ok") {
        const results = result.data.results || []
        setSearchResults(results)
        if (onScanComplete) {
          onScanComplete(searchQuery.trim(), results)
        }
      } else {
        setError("Failed to search. Please try again.")
        setSearchResults([])
      }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error("Search error:", e)
      }
      setError("An error occurred. Please try again.")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleClose = () => {
    setSearchQuery("")
    setSearchResults([])
    setError(null)
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={themed($modalOverlay)}>
        <Screen
          preset="auto"
          contentContainerStyle={themed($modalContent)}
          safeAreaEdges={["top", "bottom"]}
          backgroundColor={colors.palette.neutral100}
        >
          {/* Header */}
          <View style={themed($header)}>
            <Text text="New Scan" style={themed($headerTitle)} />
            <TouchableOpacity onPress={handleClose} style={themed($closeButton)}>
              <Icon icon="x" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={themed($searchContainer)}>
            <TextField
              placeholder="Enter email address"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              containerStyle={themed($textFieldContainer)}
              style={themed($textField)}
            />
            <Button
              text="Search"
              onPress={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              style={themed($searchButton)}
            />
          </View>

          {/* Error Message */}
          {error && (
            <View style={themed($errorContainer)}>
              <Text text={error} style={themed($errorText)} />
            </View>
          )}

          {/* Loading Indicator */}
          {isSearching && (
            <View style={themed($loadingContainer)}>
              <ActivityIndicator size="large" color={colors.palette.primary500} />
              <Text text="Searching..." style={themed($loadingText)} />
            </View>
          )}

          {/* Results */}
          {!isSearching && searchResults.length > 0 && (
            <ScrollView style={themed($resultsContainer)} showsVerticalScrollIndicator={false}>
              <Text text={`Found ${searchResults.length} result(s)`} style={themed($resultsTitle)} />
              {searchResults.map((result, index) => (
                <View key={result.id || index} style={themed($resultCard)}>
                  <View style={themed($resultHeader)}>
                    <Text text={result.email} style={themed($resultEmail)} />
                    <View style={themed($resultBadge)}>
                      <Text text={result.sourceType} style={themed($resultBadgeText)} />
                    </View>
                  </View>
                  <Text text={result.source} style={themed($resultSource)} />
                  {result.service && (
                    <Text text={`Service: ${result.service}`} style={themed($resultService)} />
                  )}
                  {result.passwordType && (
                    <Text text={`Password Type: ${result.passwordType}`} style={themed($resultPasswordType)} />
                  )}
                </View>
              ))}
            </ScrollView>
          )}

          {/* Empty State */}
          {!isSearching && searchResults.length === 0 && !error && searchQuery && (
            <View style={themed($emptyContainer)}>
              <Text text="No results found" style={themed($emptyText)} />
            </View>
          )}
        </Screen>
      </View>
    </Modal>
  )
}

const $modalOverlay: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
})

const $modalContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.lg,
})

const $headerTitle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 24,
  fontFamily: typography.primary.bold,
  fontWeight: "700",
})

const $closeButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
})

const $searchContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.md,
  marginBottom: spacing.md,
})

const $textFieldContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $textField: ThemedStyle<TextStyle> = () => ({})

const $searchButton: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "#2563EB",
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
  minHeight: 40,
  justifyContent: "center",
})

const $errorContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.errorBackground || "#FEE2E2",
  borderRadius: 8,
  padding: spacing.md,
  marginBottom: spacing.md,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error || "#EF4444",
  fontSize: 14,
})

const $loadingContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: spacing.xl,
})

const $loadingText: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  marginTop: spacing.md,
  fontSize: 16,
  fontFamily: typography.primary.medium,
})

const $resultsContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $resultsTitle: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 18,
  fontFamily: typography.primary.bold,
  marginBottom: spacing.md,
  fontWeight: "700",
})

const $resultCard: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: colors.palette.neutral200 || "#FFFFFF",
  borderRadius: 12,
  padding: spacing.md,
  marginBottom: spacing.md,
  borderWidth: 1,
  borderColor: colors.palette.neutral400 || "#E5E7EB",
})

const $resultHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $resultEmail: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.bold,
  fontWeight: "700",
  flex: 1,
})

const $resultBadge: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  backgroundColor: "#3B82F6",
  borderRadius: 12,
  paddingHorizontal: 8,
  paddingVertical: 4,
  marginLeft: spacing.xs,
})

const $resultBadgeText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 10,
  fontFamily: typography.primary.bold,
  color: "#FFFFFF",
  fontWeight: "700",
})

const $resultSource: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 14,
  fontFamily: typography.primary.medium,
  marginBottom: spacing.xxs,
  fontWeight: "600",
})

const $resultService: ThemedStyle<TextStyle> = ({ typography, spacing }) => ({
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
  marginBottom: spacing.xxs,
})

const $resultPasswordType: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.normal,
  color: "#6B7280",
})

const $emptyContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: spacing.xl,
})

const $emptyText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontSize: 16,
  fontFamily: typography.primary.medium,
  color: "#6B7280",
})

