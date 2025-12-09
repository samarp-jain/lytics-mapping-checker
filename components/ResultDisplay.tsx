'use client'

import { MappingResult } from '@/app/page'

interface ResultDisplayProps {
  result: MappingResult
}

function formatResult(data: any): React.ReactNode {
  if (data === null || data === undefined) {
    return <span className="text-gray-500 italic">null</span>
  }

  if (typeof data === 'string') {
    return <span className="text-blue-600 dark:text-blue-400 font-mono">{data}</span>
  }

  if (typeof data === 'number' || typeof data === 'boolean') {
    return <span className="text-purple-600 dark:text-purple-400 font-mono">{String(data)}</span>
  }

  if (Array.isArray(data)) {
    return (
      <div className="ml-4 border-l-2 border-gray-300 dark:border-gray-600 pl-4">
        {data.map((item, index) => (
          <div key={index} className="mb-2">
            <span className="text-gray-500">[{index}]:</span> {formatResult(item)}
          </div>
        ))}
      </div>
    )
  }

  if (typeof data === 'object') {
    const entries = Object.entries(data)
    if (entries.length === 0) {
      return <span className="text-gray-500 italic">{'{}'}</span>
    }
    return (
      <div className="ml-4 border-l-2 border-gray-300 dark:border-gray-600 pl-4 space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-start">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold min-w-[120px] sm:min-w-[150px]">
              {key}:
            </span>
            <div className="flex-1 sm:ml-2">{formatResult(value)}</div>
          </div>
        ))}
      </div>
    )
  }

  return <span className="text-gray-600 dark:text-gray-400">{String(data)}</span>
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Result
      </h2>
      
      {result.success ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold text-green-800 dark:text-green-300 text-lg">Success</span>
          </div>
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {formatResult(result.result)}
            </div>
          </div>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              View Raw JSON
            </summary>
            <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-x-auto bg-gray-50 dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700">
              {JSON.stringify(result.result, null, 2)}
            </pre>
          </details>
        </div>
      ) : (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-semibold text-red-800 dark:text-red-300">Error</span>
          </div>
          <p className="mt-2 text-red-700 dark:text-red-300 whitespace-pre-wrap">{result.error}</p>
        </div>
      )}
    </div>
  )
}

