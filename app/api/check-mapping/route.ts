import { NextRequest, NextResponse } from 'next/server'

const LYTICS_API_URL = 'https://api.lytics.io/v2/schema/expression/evaluate'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { expression, mappings, data: directData } = body

    if (!expression) {
      return NextResponse.json(
        { success: false, error: 'Expression is required' },
        { status: 400 }
      )
    }

    const authToken = process.env.LYTICS_AUTH_TOKEN
    if (!authToken) {
      return NextResponse.json(
        { success: false, error: 'Lytics auth token is not configured. Please set LYTICS_AUTH_TOKEN in your .env file.' },
        { status: 500 }
      )
    }

    let data: Record<string, any> = {}

    // If direct data is provided (from JSON input), use it directly
    if (directData && typeof directData === 'object' && !Array.isArray(directData)) {
      data = directData
    } else if (mappings && Array.isArray(mappings)) {
      // Convert mappings array to object format for Lytics API
      // Format: { fieldName1: value1, fieldName2: value2, ... }
      // Supports arrays: if inputValue is a JSON array string, parse it
      const parseInputValue = (value: string): any => {
        const trimmedValue = value.trim()
        
        // Try to parse as JSON if it looks like an array or object
        if ((trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) ||
            (trimmedValue.startsWith('{') && trimmedValue.endsWith('}'))) {
          try {
            return JSON.parse(trimmedValue)
          } catch {
            // If parsing fails, use as string
            return value
          }
        }
        
        // Try to parse as boolean
        if (trimmedValue === 'true' || trimmedValue === 'false') {
          return trimmedValue === 'true'
        }
        
        // Try to parse as number
        if (trimmedValue !== '' && !Number.isNaN(Number(trimmedValue))) {
          return Number(trimmedValue)
        }
        
        // Default to string
        return value
      }
      
      mappings.forEach((mapping: { fieldName: string; inputValue: string }) => {
        if (mapping.fieldName.trim() && mapping.inputValue.trim()) {
          data[mapping.fieldName] = parseInputValue(mapping.inputValue)
        }
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Either mappings array or data object is required' },
        { status: 400 }
      )
    }

    // Call Lytics API
    const lyticsResponse = await fetch(LYTICS_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': authToken,
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        expression,
        data,
      }),
    })

    if (!lyticsResponse.ok) {
      const errorText = await lyticsResponse.text()
      return NextResponse.json(
        {
          success: false,
          error: `Lytics API error: ${lyticsResponse.status} ${lyticsResponse.statusText}. ${errorText}`,
        },
        { status: lyticsResponse.status }
      )
    }

    const result = await lyticsResponse.json()
    return NextResponse.json({ success: true, result })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 500 }
    )
  }
}

