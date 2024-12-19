'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pill, Activity, Droplet, Users, User, Syringe, ClipboardList, AlertTriangle } from 'lucide-react'
import {AIScribeModal} from "@/app/encounters/components/AIScribeModal";
import {toast} from "@/hooks/use-toast";
import {EncounterModal} from "@/app/encounters/components/EncounterModal";


// Mock patient data
const patient = {
    id: '12345',
    name: 'John Doe',
    dob: '1980-05-15',
    gender: 'Male',
    contact: '(555) 123-4567',
    email: 'john.doe@email.com',
    address: '123 Main St, Anytown, USA 12345',
    insurance: 'HealthCare Insurance Co.',
    medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime' },
    ],
    labs: [
        { name: 'HbA1c', value: '6.5%', date: '2023-11-15', normalRange: '4.0-5.6%' },
        { name: 'LDL Cholesterol', value: '130 mg/dL', date: '2023-11-15', normalRange: '<100 mg/dL' },
        { name: 'eGFR', value: '75 mL/min/1.73m²', date: '2023-11-15', normalRange: '>60 mL/min/1.73m²' },
    ],
    socialHistory: {
        smoking: 'Former smoker, quit 5 years ago',
        alcohol: 'Social drinker, 1-2 drinks per week',
        exercise: 'Walks 30 minutes, 3 times a week',
        occupation: 'Office worker',
        diet: 'Trying to follow a low-carb diet',
    },
    familyHistory: [
        { relation: 'Father', condition: 'Type 2 Diabetes, Hypertension' },
        { relation: 'Mother', condition: 'Breast cancer at age 65' },
        { relation: 'Sibling', condition: 'No significant medical history' },
    ],
    vaccinations: [
        { name: 'Influenza', date: '2023-10-01' },
        { name: 'COVID-19', date: '2023-05-15' },
        { name: 'Tdap', date: '2020-03-10' },
        { name: 'Pneumococcal', date: '2022-11-20' },
    ],
    problemList: [
        { problem: 'Type 2 Diabetes Mellitus', dateOnset: '2018-07-01', status: 'Active' },
        { problem: 'Essential Hypertension', dateOnset: '2019-03-15', status: 'Active' },
        { problem: 'Hyperlipidemia', dateOnset: '2019-03-15', status: 'Active' },
        { problem: 'Obesity', dateOnset: '2015-01-01', status: 'Active' },
    ],
}

export default function PatientEncounterPage() {
    const params = useParams()
    const [activeTab, setActiveTab] = useState('overview')
    const [isAIScribeModalOpen, setIsAIScribeModalOpen] = useState(false)
    const [isEncounterModalOpen, setIsEncounterModalOpen] = useState(false)
    const [encounterStarted, setEncounterStarted] = useState(false)

    const handleStartEncounter = () => {
        setIsAIScribeModalOpen(true)
    }

    const handleConfirmAIScribe = () => {
        setIsAIScribeModalOpen(false)
        setEncounterStarted(true)
        setIsEncounterModalOpen(true)
        toast({
            title: "Encounter Started",
            description: "The AI scribe is now active and assisting with documentation.",
        })
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Patient Encounter - {patient.name}</h1>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>ID: {params.id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <p><strong>DOB:</strong> {format(new Date(patient.dob), 'MMMM d, yyyy')} ({new Date().getFullYear() - new Date(patient.dob).getFullYear()} years old)</p>
                            <p><strong>Gender:</strong> {patient.gender}</p>
                        </div>
                        <div>
                            <p><strong>Contact:</strong> {patient.contact}</p>
                            <p><strong>Email:</strong> {patient.email}</p>
                        </div>
                        <div>
                            <p><strong>Address:</strong> {patient.address}</p>
                            <p><strong>Insurance:</strong> {patient.insurance}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {patient.problemList.some(problem => problem.problem === 'Type 2 Diabetes Mellitus') && (
                <Card className="mb-6 bg-yellow-50 border-yellow-200">
                    <CardHeader>
                        <CardTitle className="flex items-center text-yellow-700">
                            <AlertTriangle className="mr-2" />
                            Diabetes Management Alert
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-yellow-700">This patient has Type 2 Diabetes. Please ensure to review their recent HbA1c levels and discuss their diabetes management plan.</p>
                    </CardContent>
                </Card>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="labs">Labs</TabsTrigger>
                    <TabsTrigger value="social">Social History</TabsTrigger>
                    <TabsTrigger value="family">Family History</TabsTrigger>
                    <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
                    <TabsTrigger value="problems">Problem List</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Active Problems</h3>
                                    <ul className="list-disc list-inside">
                                        {patient.problemList.filter(p => p.status === 'Active').map((problem, index) => (
                                            <li key={index}>{problem.problem}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Current Medications</h3>
                                    <ul className="list-disc list-inside">
                                        {patient.medications.map((med, index) => (
                                            <li key={index}>{med.name} {med.dosage}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="medications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Pill className="mr-2" />
                                Medications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Medication</TableHead>
                                        <TableHead>Dosage</TableHead>
                                        <TableHead>Frequency</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patient.medications.map((med, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{med.name}</TableCell>
                                            <TableCell>{med.dosage}</TableCell>
                                            <TableCell>{med.frequency}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="labs">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Activity className="mr-2" />
                                Recent Labs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Test</TableHead>
                                        <TableHead>Result</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Normal Range</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patient.labs.map((lab, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{lab.name}</TableCell>
                                            <TableCell>{lab.value}</TableCell>
                                            <TableCell>{format(new Date(lab.date), 'MMM d, yyyy')}</TableCell>
                                            <TableCell>{lab.normalRange}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="social">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="mr-2" />
                                Social History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(patient.socialHistory).map(([key, value]) => (
                                    <div key={key}>
                                        <p><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="family">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Users className="mr-2" />
                                Family History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Relation</TableHead>
                                        <TableHead>Medical Conditions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patient.familyHistory.map((history, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{history.relation}</TableCell>
                                            <TableCell>{history.condition}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="vaccinations">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Syringe className="mr-2" />
                                Vaccinations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Vaccine</TableHead>
                                        <TableHead>Date Administered</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patient.vaccinations.map((vaccine, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{vaccine.name}</TableCell>
                                            <TableCell>{format(new Date(vaccine.date), 'MMMM d, yyyy')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="problems">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <ClipboardList className="mr-2" />
                                Problem List
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Problem</TableHead>
                                        <TableHead>Date of Onset</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patient.problemList.map((problem, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{problem.problem}</TableCell>
                                            <TableCell>{format(new Date(problem.dateOnset), 'MMMM d, yyyy')}</TableCell>
                                            <TableCell>{problem.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-between items-center">
                <Button variant="outline" onClick={() => window.history.back()}>Back to Dashboard</Button>
                <Button onClick={handleStartEncounter} disabled={encounterStarted}>
                    {encounterStarted ? "Encounter In Progress" : "Start Encounter"}
                </Button>
            </div>

            <AIScribeModal
                isOpen={isAIScribeModalOpen}
                onClose={() => setIsAIScribeModalOpen(false)}
                onConfirm={handleConfirmAIScribe}
            />

            <EncounterModal
                isOpen={isEncounterModalOpen}
                onClose={() => setIsEncounterModalOpen(false)}
            />
        </div>
    )
}

