'use client'

import { FieldMapping } from '@/app/page'

interface MappingInputProps {
  readonly mappings: FieldMapping[]
  readonly setMappings: (mappings: FieldMapping[]) => void
}

export default function MappingInput({ mappings, setMappings }: MappingInputProps) {
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Field Mappings
        </h2>
        <button
          onClick={addMapping}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          + Add Field
        </button>
      </div>

      <div className="space-y-4">
        {mappings.map((mapping, index) => {
          const fieldNameId = `field-name-${index}`
          const inputValueId = `input-value-${index}`
          return (
            <div
              key={`mapping-${index}`}
              className="flex gap-4 items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex-1">
                <label htmlFor={fieldNameId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Field Name <span className="text-red-500">*</span>
                </label>
                <input
                  id={fieldNameId}
                  type="text"
                  value={mapping.fieldName}
                  onChange={(e) => updateMapping(index, 'fieldName', e.target.value)}
                  placeholder="e.g., user.email"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label htmlFor={inputValueId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Input Value <span className="text-red-500">*</span>
                </label>
                <input
                  id={inputValueId}
                  type="text"
                  value={mapping.inputValue}
                  onChange={(e) => updateMapping(index, 'inputValue', e.target.value)}
                  placeholder="e.g., john@example.com"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              {mappings.length > 1 && (
                <button
                  onClick={() => removeMapping(index)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors mt-6"
                >
                  Remove
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

