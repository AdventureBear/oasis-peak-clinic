'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for results
const mockResults = [
    { id: 1, patientName: 'John Doe', testType: 'Blood Test', date: '2023-12-15', status: 'Normal' },
    { id: 2, patientName: 'Jane Smith', testType: 'X-Ray', date: '2023-12-16', status: 'Abnormal' },
    { id: 3, patientName: 'Alice Johnson', testType: 'MRI', date: '2023-12-17', status: 'Pending' },
]

type result =
{
    id: number,
    patientName: string,
    testType: string,
    date: string,
    status: string
}

export default function ResultsViewer() {
    const [selectedResult, setSelectedResult] = useState<result |  null>(null)

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Test Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockResults.map((result: result) => (
                        <TableRow key={result.id}>
                            <TableCell>{result.patientName}</TableCell>
                            <TableCell>{result.testType}</TableCell>
                            <TableCell>{result.date}</TableCell>
                            <TableCell>{result.status}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" onClick={() => setSelectedResult(result)}>
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedResult && (
                <Card>
                    <CardHeader>
                        <CardTitle>{selectedResult.testType} Results</CardTitle>
                        <CardDescription>Patient: {selectedResult.patientName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Date:</strong> {selectedResult.date}</p>
                        <p><strong>Status:</strong> {selectedResult.status}</p>
                        <p className="mt-4">Detailed results would be displayed here, potentially including graphs, images, or more detailed text descriptions depending on the test type.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

