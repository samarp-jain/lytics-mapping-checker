'use client'

import { useState } from 'react'
import MappingInput from '@/components/MappingInput'
import ResultDisplay from '@/components/ResultDisplay'

export interface FieldMapping {
  fieldName: string
  inputValue: string
}

export interface MappingResult {
  success: boolean
  result?: any
  error?: string
}

export default function Home() {
  const [mappings, setMappings] = useState<FieldMapping[]>([
    { fieldName: '', inputValue: '' }
  ])
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState<MappingResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheckMapping = async () => {
    if (!expression.trim()) {
      setResult({
        success: false,
        error: 'Please enter a Lytics expression'
      })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/check-mapping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression,
          mappings: mappings.filter(m => m.fieldName.trim() && m.inputValue.trim())
        }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Lytics Mapping Checker
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Test your Lytics expressions with field mappings and see the parsed results
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Lytics Expression <span className="text-red-500">*</span>
          </h2>
          <textarea
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Enter your Lytics expression here..."
            className="w-full h-20 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
          />
        </div>

        <MappingInput mappings={mappings} setMappings={setMappings} />

        <div className="flex justify-center mb-6">
          <button
            onClick={handleCheckMapping}
            disabled={loading}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking...' : 'Check Mapping'}
          </button>
        </div>

        {result && <ResultDisplay result={result} />}
      </div>
    </main>
  )
}

