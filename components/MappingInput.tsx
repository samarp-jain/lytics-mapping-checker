'use client'

import { FieldMapping } from '@/app/page'

interface MappingInputProps {
  readonly mappings: FieldMapping[]
  readonly setMappings: (mappings: FieldMapping[]) => void
  readonly jsonInput: string
  readonly setJsonInput: (json: string) => void
  readonly inputMode: 'fields' | 'json'
  readonly setInputMode: (mode: 'fields' | 'json') => void
}

// Reusable Tooltip Component
function InfoTooltip({ content }: { readonly content: React.ReactNode }) {
  return (
    <div className="relative group inline-block">
      <svg
        className="w-4 h-4 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-help transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-80 p-3 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
        {content}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
      </div>
    </div>
  )
}

export default function MappingInput({ 
  mappings, 
  setMappings, 
  jsonInput, 
  setJsonInput,
  inputMode,
  setInputMode
}: MappingInputProps) {
  const updateMapping = (index: number, field: keyof FieldMapping, value: string) => {
    const newMappings = [...mappings]
    newMappings[index] = { ...newMappings[index], [field]: value }
    setMappings(newMappings)
  }

  const addMapping = () => {
    setMappings([...mappings, { fieldName: '', inputValue: '' }])
  }

  const removeMapping = (index: number) => {
    if (mappings.length > 1) {
      setMappings(mappings.filter((_, i) => i !== index))
    }
  }

  const clearAllFields = () => {
    setMappings([{ fieldName: '', inputValue: '' }])
  }

  const clearJsonInput = () => {
    setJsonInput('')
  }

  const fieldInputTooltip = (
    <>
      <p className="mb-2 font-semibold">Field Input Format:</p>
      <p className="mb-2">For arrays, enter them in JSON format:</p>
      <code className="block bg-gray-800 dark:bg-gray-900 p-2 rounded mb-2 text-xs whitespace-pre-wrap break-all">
        {`[1, 0, 1, 1]`}
      </code>
      <p className="mb-2">For multiple fields, add more field mappings using the "+ Add Field" button.</p>
      <p className="text-gray-300 dark:text-gray-400 text-xs">Each field-value pair will be combined into a single data object.</p>
    </>
  )

  const jsonInputTooltip = (
    <>
      <p className="mb-2 font-semibold">Multiple Objects Format:</p>
      <p className="mb-2">If sending data in multiple objects, send it in array format:</p>
      <code className="block bg-gray-800 dark:bg-gray-900 p-2 rounded mb-2 text-xs whitespace-pre-wrap break-all">
        {`{"flag": [1,0,1,1]}`}
      </code>
      <p className="mb-2">Or in the JSON format as given:</p>
      <code className="block bg-gray-800 dark:bg-gray-900 p-2 rounded text-xs whitespace-pre-wrap break-all">
        {`{"flag": [1, 0, 1, 1], "name": "test"}`}
      </code>
    </>
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Field Mappings
          </h2>
          <InfoTooltip content={inputMode === 'fields' ? fieldInputTooltip : jsonInputTooltip} />
        </div>
        {inputMode === 'fields' && (
          <div className="flex gap-2">
            <button
              onClick={clearAllFields}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
              title="Clear all fields"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
            <button
              onClick={addMapping}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              + Add Field
            </button>
          </div>
        )}
      </div>

      {/* Tab Interface */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setInputMode('fields')}
          className={`px-6 py-3 font-medium transition-colors relative ${
            inputMode === 'fields'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Field Input
          {inputMode === 'fields' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
          )}
        </button>
        <button
          onClick={() => setInputMode('json')}
          className={`px-6 py-3 font-medium transition-colors relative ${
            inputMode === 'json'
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          JSON Input
          {inputMode === 'json' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"></span>
          )}
        </button>
      </div>

      {/* Field Input Mode */}
      {inputMode === 'fields' && (
        <div className="space-y-4">
          {mappings.map((mapping, index) => {
            const fieldNameId = `field-name-${index}`
            const inputValueId = `input-value-${index}`
            return (
              <div
                key={`mapping-${index}`}
                className="flex gap-4 items-start p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                <div className="flex-1">
                  <label htmlFor={fieldNameId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Field Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={fieldNameId}
                    type="text"
                    value={mapping.fieldName}
                    onChange={(e) => updateMapping(index, 'fieldName', e.target.value)}
                    placeholder="e.g., flag"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor={inputValueId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Input Value <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={inputValueId}
                    type="text"
                    value={mapping.inputValue}
                    onChange={(e) => updateMapping(index, 'inputValue', e.target.value)}
                    placeholder="e.g., [1, 0, 1, 1] or 'text value'"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white transition-all"
                  />
                </div>
                {mappings.length > 1 && (
                  <button
                    onClick={() => removeMapping(index)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors mt-8 shadow-sm hover:shadow-md"
                    aria-label="Remove field"
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* JSON Input Mode */}
      {inputMode === 'json' && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="json-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              JSON Data <span className="text-red-500">*</span>
            </label>
            <button
              onClick={clearJsonInput}
              className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center gap-1.5"
              title="Clear JSON input"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          </div>
          <textarea
            id="json-input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"flag": [1, 0, 1, 1]}'
            className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white font-mono text-sm resize-none transition-all"
          />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Paste your JSON data here. Example: <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">{`{"flag": [1, 0, 1, 1]}`}</code>
          </p>
        </div>
      )}
    </div>
  )
}

