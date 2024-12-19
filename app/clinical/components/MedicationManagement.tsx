'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle } from 'lucide-react'

// Mock data for medications
const mockMedications = [
    { id: 1, patientName: 'John Doe', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2023-11-01' },
    { id: 2, patientName: 'Jane Smith', medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2023-10-15' },
    { id: 3, patientName: 'Alice Johnson', medication: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', startDate: '2023-12-01' },
]

export default function MedicationManagement() {
    const [medications, setMedications] = useState(mockMedications)
    const [newMedication, setNewMedication] = useState({ patientName: '', medication: '', dosage: '', frequency: '', startDate: '' })

    const handleAddMedication = () => {
        setMedications([...medications, { ...newMedication, id: medications.length + 1 }])
        setNewMedication({ patientName: '', medication: '', dosage: '', frequency: '', startDate: '' })
    }

    return (
        <div className="space-y-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add New Medication</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Medication</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patientName" className="text-right">
                                Patient Name
                            </Label>
                            <Input
                                id="patientName"
                                value={newMedication.patientName}
                                onChange={(e) => setNewMedication({ ...newMedication, patientName: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="medication" className="text-right">
                                Medication
                            </Label>
                            <Input
                                id="medication"
                                value={newMedication.medication}
                                onChange={(e) => setNewMedication({ ...newMedication, medication: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="dosage" className="text-right">
                                Dosage
                            </Label>
                            <Input
                                id="dosage"
                                value={newMedication.dosage}
                                onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="frequency" className="text-right">
                                Frequency
                            </Label>
                            <Input
                                id="frequency"
                                value={newMedication.frequency}
                                onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="startDate" className="text-right">
                                Start Date
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={newMedication.startDate}
                                onChange={(e) => setNewMedication({ ...newMedication, startDate: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddMedication}>Add Medication</Button>
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {medications.map((med) => (
                        <TableRow key={med.id}>
                            <TableCell>{med.patientName}</TableCell>
                            <TableCell>{med.medication}</TableCell>
                            <TableCell>{med.dosage}</TableCell>
                            <TableCell>{med.frequency}</TableCell>
                            <TableCell>{med.startDate}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm">Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center p-4 bg-yellow-100 rounded-md">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-700">Remember to check for drug interactions before prescribing new medications.</p>
            </div>
        </div>
    )
}

