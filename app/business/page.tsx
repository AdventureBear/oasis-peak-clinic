'use client'

import { useState, useEffect } from 'react'
import { LikedSuggestion } from './components/LikedSuggestions'

// Mock suggestions (in a real app, this would be fetched from an API or database)
const mockSuggestions = [
    {
        id: 1,
        category: 'Efficiency',
        suggestion: 'Implement a patient self-check-in kiosk to reduce wait times and front desk workload.',
        impact: 'Could reduce patient wait times by up to 15% and free up 2 hours of staff time daily.',
    },
    {
        id: 2,
        category: 'Revenue',
        suggestion: 'Introduce telemedicine services for follow-up appointments.',
        impact: 'Potential to increase appointment capacity by 20% and generate additional $50,000 in annual revenue.',
    },
    {
        id: 3,
        category: 'Staff Well-being',
        suggestion: 'Implement a rotating "no-meeting" day for each staff member weekly.',
        impact: 'Could improve staff productivity by 10% and reduce burnout-related turnover.',
    },
    {
        id: 4,
        category: 'Efficiency',
        suggestion: 'Utilize AI-powered voice recognition for medical documentation.',
        impact: 'May save doctors an average of 30 minutes per day on paperwork.',
    },
    {
        id: 5,
        category: 'Revenue',
        suggestion: 'Develop a chronic care management program.',
        impact: 'Potential to improve patient outcomes and generate $100 per patient per month in Medicare reimbursements.',
    },
]

export default function BusinessDevelopmentPage() {
    const [likedSuggestions, setLikedSuggestions] = useState<number[]>([])

    useEffect(() => {
        // Load liked suggestions from localStorage
        const savedLikes = localStorage.getItem('likedSuggestions')
        if (savedLikes) {
            setLikedSuggestions(JSON.parse(savedLikes))
        }
    }, [])

    const likedSuggestionDetails = mockSuggestions.filter(suggestion =>
        likedSuggestions.includes(suggestion.id)
    )

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Business Development</h1>
            {likedSuggestionDetails.length > 0 ? (
                likedSuggestionDetails.map(suggestion => (
                    <LikedSuggestion key={suggestion.id} suggestion={suggestion} />
                ))
            ) : (
                <p>No liked suggestions yet. Visit the Analytics page to like some AI-generated suggestions!</p>
            )}
        </div>
    )
}

