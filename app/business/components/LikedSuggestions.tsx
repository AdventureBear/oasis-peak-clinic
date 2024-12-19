import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageCircle, PlayCircle } from 'lucide-react'

interface Suggestion {
    id: number
    category: string
    suggestion: string
    impact: string
}

interface LikedSuggestionProps {
    suggestion: Suggestion
}

export function LikedSuggestion({ suggestion }: LikedSuggestionProps) {
    const [showChat, setShowChat] = useState(false)

    // Mock action plan steps
    const actionPlan = [
        "Research potential solutions and vendors",
        "Conduct a cost-benefit analysis",
        "Present findings to the board for approval",
        "Implement a pilot program",
        "Evaluate results and adjust as needed"
    ]

    // Mock related podcast episodes
    const relatedPodcasts = [
        { title: "Implementing New Technologies in Healthcare", duration: "45 min" },
        { title: "Improving Patient Experience through Innovation", duration: "30 min" },
        { title: "Balancing Efficiency and Quality Care", duration: "38 min" }
    ]

    return (
        <Card className="w-full mb-6">
            <CardHeader>
                <CardTitle>{suggestion.category}</CardTitle>
                <CardDescription>{suggestion.suggestion}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{suggestion.impact}</p>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="action-plan">
                        <AccordionTrigger>View Action Plan</AccordionTrigger>
                        <AccordionContent>
                            <ol className="list-decimal list-inside">
                                {actionPlan.map((step, index) => (
                                    <li key={index} className="mb-2">{step}</li>
                                ))}
                            </ol>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Related Podcasts:</h4>
                    <ul className="space-y-2">
                        {relatedPodcasts.map((podcast, index) => (
                            <li key={index} className="flex items-center">
                                <PlayCircle className="h-4 w-4 mr-2" />
                                <span>{podcast.title} ({podcast.duration})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => setShowChat(!showChat)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Business Coach
                </Button>
            </CardFooter>
            {showChat && (
                <div className="p-4 bg-muted">
                    <p>Chat interface with your business coach would appear here.</p>
                </div>
            )}
        </Card>
    )
}

