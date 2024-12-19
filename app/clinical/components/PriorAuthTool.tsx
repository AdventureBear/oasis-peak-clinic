'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for prior authorizations
const mockPriorAuths = [
    { id: 1, patientName: 'John Doe', procedure: 'MRI', status: 'Pending', submissionDate: '2023-12-10' },
    { id: 2, patientName: 'Jane Smith', procedure: 'CT Scan', status: 'Approved', submissionDate: '2023-12-05' },
    { id: 3, patientName: 'Alice Johnson', procedure: 'Specialist Referral', status: 'Denied', submissionDate: '2023-12-08' },
]

export default function PriorAuthTool() {
    const [priorAuths, setPriorAuths] = useState(mockPriorAuths)
    const [newAuth, setNewAuth] = useState({ patientName: '', procedure: '', status: 'Pending', submissionDate: '' })

    const handleAddAuth = () => {
        setPriorAuths([...priorAuths, { ...newAuth, id: priorAuths.length + 1 }])
        setNewAuth({ patientName: '', procedure: '', status: 'Pending', submissionDate: '' })
    }

    return (
        <div className="space-y-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Submit New Prior Authorization</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit New Prior Authorization</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patientName" className="text-right">
                                Patient Name
                            </Label>
                            <Input
                                id="patientName"
                                value={newAuth.patientName}
                                onChange={(e) => setNewAuth({ ...newAuth, patientName: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="procedure" className="text-right">
                                Procedure
                            </Label>
                            <Input
                                id="procedure"
                                value={newAuth.procedure}
                                onChange={(e) => setNewAuth({ ...newAuth, procedure: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="submissionDate" className="text-right">
                                Submission Date
                            </Label>
                            <Input
                                id="submissionDate"
                                type="date"
                                value={newAuth.submissionDate}
                                onChange={(e) => setNewAuth({ ...newAuth, submissionDate: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddAuth}>Submit Authorization</Button>
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Procedure</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {priorAuths.map((auth) => (
                        <TableRow key={auth.id}>
                            <TableCell>{auth.patientName}</TableCell>
                            <TableCell>{auth.procedure}</TableCell>
                            <TableCell>{auth.status}</TableCell>
                            <TableCell>{auth.submissionDate}</TableCell>
                            <TableCell>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Update Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="denied">Denied</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Card>
                <CardHeader>
                    <CardTitle>FHIR Integration</CardTitle>
                    <CardDescription>Automated Prior Authorization Processing</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Our system is integrated with FHIR (Fast Healthcare Interoperability Resources) to streamline the prior authorization process. This integration allows for:</p>
                    <ul className="list-disc list-inside mt-2">
                        <li>Automatic submission of prior authorization requests</li>
                        <li>Real-time status updates</li>
                        <li>Faster processing times for standard procedures</li>
                    </ul>
                    <Button className="mt-4">Configure FHIR Integration</Button>
                </CardContent>
            </Card>
        </div>
    )
}

