/**
 * Investigate API service for handling investigate-related API requests.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"

import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig } from "./types"

/**
 * Configuring the investigate API apisauce instance.
 * For web development, you can use a proxy server to avoid CORS issues.
 * Set EXPO_PUBLIC_USE_PROXY=true in your .env file to use http://localhost:3001
 */
const getBaseUrl = (): string => {
  // Check if we should use proxy (for web development)
  const useProxy = process.env.EXPO_PUBLIC_USE_PROXY === "true"
  if (useProxy) {
    return "http://localhost:3001/api/investigate/v1"
  }
  return "https://platform.ke-la.com/api/investigate/v1"
}

const INVESTIGATE_API_CONFIG: ApiConfig = {
  url: getBaseUrl(),
  timeout: 10000,
}

/**
 * Get the API token from environment variables.
 * In Expo, use EXPO_PUBLIC_ prefix for client-side environment variables.
 */
const getApiToken = (): string | undefined => {
  return process.env.EXPO_PUBLIC_INVESTIGATE_API_TOKEN || process.env.INVESTIGATE_API_TOKEN
}


/**
 * Response types for investigate API endpoints.
 */
export interface SearchResult {
  indexed_date: number
  email: string
  domain: string
  passwordType?: string | null
  password?: string | null
  sourceType: string
  source: string
  source_id: string
  postedDate: number
  authorized: boolean
  id: string
  sourceTypeRaw: string
  service?: string
  serviceRaw?: string
  userName?: string
}

export interface PasswordHash {
  key: string
  doc_count: number
}

export interface ServiceHost {
  key: string
  doc_count: number
}

export interface Source {
  key: string
  doc_count: number
  source_type: string
  source_id: string
}

export interface SourceType {
  key: string
  doc_count: number
}

export interface License {
  limit: number
  time_frame: string
  counter: number
  type: string
  nextRefresh: string
  subscriptions: {
    authorized: boolean
    maxSubscriptions: number
    used: number
    total: number
    personalUsed: number
    groupUsed: number
    otherGroupMembersUsed: number
    unlimited: boolean
    licenesLevel: string
  }
  date_limit: number
}

export interface InvestigateSearchResponse {
  results: SearchResult[]
  total: number
  password_hash: PasswordHash[]
  service_host: ServiceHost[]
  service_ip: unknown[]
  source: Source[]
  source_type: SourceType[]
  license: License
  isAssetsAvailable: boolean
}

export interface IndexCounter {
  name: string
  counter: number
}

export interface IndicesCountersData {
  license: License
  indices: IndexCounter[]
}

export interface IndicesCountersResponse {
  data: IndicesCountersData
}

/**
 * Payload types for API requests.
 */
export interface SearchParams {
  query: string
  entity: string // e.g., "emails", "credit_cards", "domains", "phones", "usernames"
  index: string // e.g., "instant_messaging", "leaked_credentials"
  filter?: string | number // Optional filter parameter
}

export interface GetIndicesCountersParams {
  query: string
  entity: string // e.g., "emails", "domains", "phones", "usernames", "credit_cards"
}

/**
 * Manages all requests to the Investigate API.
 */
export class InvestigateApi {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our Investigate API instance.
   */
  constructor(config: ApiConfig = INVESTIGATE_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  }

  /**
   * Searches using the investigate API.
   */
  async search(
    params: SearchParams,
  ): Promise<{ kind: "ok"; data: InvestigateSearchResponse } | GeneralApiProblem> {
    // get API token
    const token = getApiToken()
    if (!token) {
      if (__DEV__) {
        console.warn("Investigate API token not found in environment variables")
      }
      return { kind: "unauthorized" }
    }

    // build query string
    const queryParams = new URLSearchParams({
      apiToken: token,
      query: params.query,
      entity: params.entity,
      index: params.index,
    })

    // add optional filter parameter
    if (params.filter !== undefined) {
      queryParams.append("filter", String(params.filter))
    }

    // make the api call with POST
    const url = `/search?${queryParams.toString()}`
    const response: ApiResponse<InvestigateSearchResponse> = await this.apisauce.post(url)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      if (!rawData) {
        return { kind: "bad-data" }
      }

      return { kind: "ok", data: rawData }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets indices counters from the investigate API.
   */
  async getIndicesCounters(
    params: GetIndicesCountersParams,
  ): Promise<{ kind: "ok"; data: IndicesCountersResponse } | GeneralApiProblem> {
    // get API token
    const token = getApiToken()
    if (!token) {
      if (__DEV__) {
        console.warn("Investigate API token not found in environment variables")
      }
      return { kind: "unauthorized" }
    }

    // build query string
    const queryParams = new URLSearchParams({
      apiToken: token,
      query: params.query,
      entity: params.entity,
    })

    // make the api call with POST
    const url = `/counters?${queryParams.toString()}`
    const response: ApiResponse<IndicesCountersResponse> = await this.apisauce.post(url)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      if (!rawData) {
        return { kind: "bad-data" }
      }

      return { kind: "ok", data: rawData }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the Investigate API for convenience
export const investigateApi = new InvestigateApi()

