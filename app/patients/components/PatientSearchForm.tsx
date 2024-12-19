'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PatientSearchForm() {
    const [searchName, setSearchName] = useState('')
    const [limit, setLimit] = useState(10)
    const [results, setResults] = useState<string[]>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Sumbitted search query")
        // Here you would typically make an API call with searchName and limit
        // For this example, we'll just set some dummy results
        setResults([`Searched for "${searchName}" with limit ${limit}`])
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-4">
                <Input
                    type="text"
                    placeholder="Search for patient"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="flex-grow"
                />
                <Button type="submit">Enter</Button>
                <div className="flex items-center space-x-2">
                    <label htmlFor="limit" className="text-sm font-medium">Limit:</label>
                    <div className="flex items-center">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => setLimit(prev => Math.max(1, prev - 1))}
                        >
                            -
                        </Button>
                        <Input
                            type="number"
                            id="limit"
                            value={limit}
                            onChange={(e) => setLimit(Number(e.target.value))}
                            className="w-16 h-8 text-center rounded-none"
                            min="1"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => setLimit(prev => prev + 1)}
                        >
                            +
                        </Button>
                    </div>
                </div>
            </form>

            <div className="mt-4 p-4 border rounded-md min-h-[100px]">
                <h2 className="text-lg font-semibold mb-2">Results:</h2>
                {results.length > 0 ? (
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{result}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No results to display</p>
                )}
            </div>
        </div>
    )
}

