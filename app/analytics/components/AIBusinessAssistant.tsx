import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, TrendingUp, Users, RefreshCcw, ChevronLeft, ChevronRight, Heart } from 'lucide-react'

// Mock suggestions
const mockSuggestions = [
    {
        id: 1,
        category: 'Efficiency',
        suggestion: 'Implement a patient self-check-in kiosk to reduce wait times and front desk workload.',
        impact: 'Could reduce patient wait times by up to 15% and free up 2 hours of staff time daily.',
        icon: RefreshCcw,
    },
    {
        id: 2,
        category: 'Revenue',
        suggestion: 'Introduce telemedicine services for follow-up appointments.',
        impact: 'Potential to increase appointment capacity by 20% and generate additional $50,000 in annual revenue.',
        icon: TrendingUp,
    },
    {
        id: 3,
        category: 'Staff Well-being',
        suggestion: 'Implement a rotating "no-meeting" day for each staff member weekly.',
        impact: 'Could improve staff productivity by 10% and reduce burnout-related turnover.',
        icon: Users,
    },
    {
        id: 4,
        category: 'Efficiency',
        suggestion: 'Utilize AI-powered voice recognition for medical documentation.',
        impact: 'May save doctors an average of 30 minutes per day on paperwork.',
        icon: RefreshCcw,
    },
    {
        id: 5,
        category: 'Revenue',
        suggestion: 'Develop a chronic care management program.',
        impact: 'Potential to improve patient outcomes and generate $100 per patient per month in Medicare reimbursements.',
        icon: TrendingUp,
    },
]

export function AIBusinessAssistant() {
    const [suggestions, setSuggestions] = useState(mockSuggestions)
    const [currentCategory, setCurrentCategory] = useState('All')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [likedSuggestions, setLikedSuggestions] = useState<number[]>([])

    const categories = ['All', 'Efficiency', 'Revenue', 'Staff Well-being']

    const filteredSuggestions = suggestions.filter(s => currentCategory === 'All' || s.category === currentCategory)

    useEffect(() => {
        // Load liked suggestions from localStorage
        const savedLikes = localStorage.getItem('likedSuggestions')
        if (savedLikes) {
            setLikedSuggestions(JSON.parse(savedLikes))
        }
    }, [])

    const refreshSuggestions = () => {
        // In a real application, this would fetch new suggestions from an AI service
        // For now, we'll just shuffle the existing suggestions
        setSuggestions([...suggestions].sort(() => Math.random() - 0.5))
        setCurrentIndex(0)
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
        )
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
        )
    }

    const handleLike = (id: number) => {
        const newLikedSuggestions = likedSuggestions.includes(id)
            ? likedSuggestions.filter(suggestionId => suggestionId !== id)
            : [...likedSuggestions, id]

        setLikedSuggestions(newLikedSuggestions)
        localStorage.setItem('likedSuggestions', JSON.stringify(newLikedSuggestions))
    }

    const currentSuggestion = filteredSuggestions[currentIndex]

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6" />
                    AI Business Assistant
                </CardTitle>
                <CardDescription>
                    AI-powered suggestions to improve your practice
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={currentCategory} onValueChange={setCurrentCategory}>
                    <TabsList className="grid w-full grid-cols-4">
                        {categories.map((category) => (
                            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="mt-4">
                        {currentSuggestion && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <currentSuggestion.icon className="h-5 w-5" />
                                        {currentSuggestion.category}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{currentSuggestion.suggestion}</p>
                                    <p className="text-sm text-muted-foreground mt-2">{currentSuggestion.impact}</p>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleLike(currentSuggestion.id)}
                                    >
                                        <Heart className={`h-5 w-5 ${likedSuggestions.includes(currentSuggestion.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                    </Button>
                                </CardFooter>
                            </Card>
                        )}
                    </div>
                </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                    <Button onClick={handlePrevious} variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleNext} variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <Button onClick={refreshSuggestions}>
                    Generate New Suggestions
                </Button>
            </CardFooter>
        </Card>
    )
}

