'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format, addMinutes } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, FileText, ClipboardList, ShieldCheck } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const doctors = [
    { id: 1, name: "Dr. John Smith" },
    { id: 2, name: "Dr. Sarah Johnson" },
    { id: 3, name: "Dr. Michael Lee" },
]

const currentDate = new Date(2024, 11, 19) // December 19, 2024

const appointments = [
    { id: 1, patientName: "John Doe", patientId: "12345", startTime: new Date(2024, 11, 19, 9, 0), duration: 30, doctorId: 1 },
    { id: 2, patientName: "Jane Smith", patientId: "23456", startTime: new Date(2024, 11, 19, 10, 0), duration: 30, doctorId: 1 },
    { id: 3, patientName: "Alice Johnson", patientId: "34567", startTime: new Date(2024, 11, 19, 11, 0), duration: 30, doctorId: 1 },
    { id: 4, patientName: "Bob Brown", patientId: "45678", startTime: new Date(2024, 11, 19, 14, 0), duration: 30, doctorId: 1 },
    { id: 5, patientName: "Charlie Davis", patientId: "56789", startTime: new Date(2024, 11, 19, 15, 0), duration: 30, doctorId: 1 },
    { id: 6, patientName: "Diana Evans", patientId: "67890", startTime: new Date(2024, 11, 19, 16, 0), duration: 30, doctorId: 1 },
    { id: 7, patientName: "Lunch Break", startTime: new Date(2024, 11, 19, 12, 0), duration: 60, doctorId: 1, isBreak: true },
    { id: 8, patientName: "Admin Time", startTime: new Date(2024, 11, 19, 16, 30), duration: 30, doctorId: 1, isBreak: true },
]

const messages = [
    { id: 1, from: "Patient: John Doe", subject: "Medication Question", time: "09:15 AM" },
    { id: 2, from: "Nurse: Emily White", subject: "Lab Results", time: "10:30 AM" },
    { id: 3, from: "Dr. Sarah Johnson", subject: "Patient Referral", time: "11:45 AM" },
    { id: 4, from: "Admin: Mark Thompson", subject: "Schedule Change", time: "01:20 PM" },
    { id: 5, from: "Patient: Alice Johnson", subject: "Appointment Request", time: "02:10 PM" },
    { id: 6, from: "Lab: City Hospital", subject: "Test Results", time: "03:30 PM" },
    { id: 7, from: "Dr. Michael Lee", subject: "Case Discussion", time: "04:15 PM" },
    { id: 8, from: "Patient: Bob Brown", subject: "Follow-up Question", time: "05:00 PM" },
    { id: 9, from: "Pharmacy: MedPlus", subject: "Prescription Clarification", time: "05:45 PM" },
    { id: 10, from: "System: EHR Update", subject: "New Features Available", time: "06:30 PM" },
]

const orders = [
    { id: 1, patientName: "John Doe", type: "Blood Test", urgency: "Routine" },
    { id: 2, patientName: "Jane Smith", type: "X-Ray", urgency: "Urgent" },
    { id: 3, patientName: "Alice Johnson", type: "MRI", urgency: "Routine" },
]

const results = [
    { id: 1, patientName: "John Doe", test: "Blood Test", status: "Normal" },
    { id: 2, patientName: "Jane Smith", test: "X-Ray", status: "Abnormal" },
    { id: 3, patientName: "Alice Johnson", test: "MRI", status: "Pending" },
]

const priorAuths = [
    { id: 1, patientName: "Bob Brown", procedure: "CT Scan", status: "Pending" },
    { id: 2, patientName: "Charlie Davis", procedure: "Specialist Referral", status: "Approved" },
    { id: 3, patientName: "Diana Evans", procedure: "MRI", status: "Denied" },
]

export default function DashboardPage() {
    const [selectedDoctor, setSelectedDoctor] = useState(doctors[0])

    const filteredAppointments = appointments.filter(apt => apt.doctorId === selectedDoctor.id)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Dashboard - Oasis Peak Care Partners</h1>
            <div className="mb-4">
                <Select onValueChange={(value) => setSelectedDoctor(doctors.find(d => d.id === parseInt(value)) || doctors[0])}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                        {doctors.map((doctor) => (
                            <SelectItem key={doctor.id} value={doctor.id.toString()}>{doctor.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2 lg:col-span-1 row-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="mr-2" />
                            Today's Schedule
                        </CardTitle>
                        <CardDescription>{format(currentDate, 'MMMM d, yyyy')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredAppointments.map((apt) => (
                                <div key={apt.id} className={`p-2 rounded ${apt.isBreak ? 'bg-gray-100' : 'bg-blue-100'}`}>
                                    <p className="font-semibold">{format(apt.startTime, 'h:mm a')}</p>
                                    {apt.isBreak ? (
                                        <p>{apt.patientName}</p>
                                    ) : (
                                        <Link href={`/patients/${apt.patientId}`} className="text-blue-600 hover:underline">
                                            {apt.patientName}
                                        </Link>
                                    )}
                                    <p className="text-sm text-gray-600">{apt.duration} minutes</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Mail className="mr-2" />
                            Inbox
                        </CardTitle>
                        <CardDescription>Total Messages: {messages.length}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {messages.slice(0, 5).map((message) => (
                                <div key={message.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{message.from}</p>
                                        <p className="text-sm text-gray-600">{message.subject}</p>
                                    </div>
                                    <p className="text-sm">{message.time}</p>
                                </div>
                            ))}
                        </div>
                        {messages.length > 5 && (
                            <Button variant="link" className="mt-2">View All Messages</Button>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <FileText className="mr-2" />
                            Orders to Sign
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {orders.map((order) => (
                                <div key={order.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{order.patientName}</p>
                                        <p className="text-sm text-gray-600">{order.type}</p>
                                    </div>
                                    <span className={`text-sm ${order.urgency === 'Urgent' ? 'text-red-500' : 'text-green-500'}`}>
                    {order.urgency}
                  </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ClipboardList className="mr-2" />
                            Recent Results
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {results.map((result) => (
                                <div key={result.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{result.patientName}</p>
                                        <p className="text-sm text-gray-600">{result.test}</p>
                                    </div>
                                    <span className={`text-sm ${
                                        result.status === 'Normal' ? 'text-green-500' :
                                            result.status === 'Abnormal' ? 'text-red-500' : 'text-yellow-500'
                                    }`}>
                    {result.status}
                  </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ShieldCheck className="mr-2" />
                            Prior Authorizations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {priorAuths.map((auth) => (
                                <div key={auth.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{auth.patientName}</p>
                                        <p className="text-sm text-gray-600">{auth.procedure}</p>
                                    </div>
                                    <span className={`text-sm ${
                                        auth.status === 'Approved' ? 'text-green-500' :
                                            auth.status === 'Denied' ? 'text-red-500' : 'text-yellow-500'
                                    }`}>
                    {auth.status}
                  </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

