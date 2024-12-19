'use client'

import React, { useState } from 'react'
import { format, addMinutes, isSameDay, setHours,  } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentModal } from './components/AppointmentModal'
import {Appointment} from "@/types/types";


const doctors = [
    { id: 1, name: "Dr. John Smith" },
    { id: 2, name: "Dr. Sarah Johnson" },
    { id: 3, name: "Dr. Michael Lee" },
]

const currentDate = new Date(2024, 11, 19) // December 19, 2024

// Hard-coded appointment data with staggered lunch breaks and admin times
const hardCodedAppointments = [
    { id: 1, patientName: "John Doe", startTime: new Date(2024, 11, 19, 9, 0), duration: 30, doctorId: 1 },
    { id: 2, patientName: "Jane Smith", startTime: new Date(2024, 11, 19, 10, 0), duration: 30, doctorId: 1 },
    { id: 3, patientName: "Alice Johnson", startTime: new Date(2024, 11, 19, 11, 0), duration: 30, doctorId: 2 },
    { id: 4, patientName: "Bob Brown", startTime: new Date(2024, 11, 19, 14, 0), duration: 30, doctorId: 2 },
    { id: 5, patientName: "Charlie Davis", startTime: new Date(2024, 11, 19, 15, 0), duration: 30, doctorId: 3 },
    { id: 6, patientName: "Diana Evans", startTime: new Date(2024, 11, 19, 16, 0), duration: 30, doctorId: 3 },
    // Staggered lunch breaks
    { id: 7, patientName: "Lunch Break", startTime: new Date(2024, 11, 19, 12, 0), duration: 60, doctorId: 1, isBreak: true },
    { id: 8, patientName: "Lunch Break", startTime: new Date(2024, 11, 19, 12, 15), duration: 60, doctorId: 2, isBreak: true },
    { id: 9, patientName: "Lunch Break", startTime: new Date(2024, 11, 19, 12, 30), duration: 60, doctorId: 3, isBreak: true },
    // Staggered admin times
    { id: 10, patientName: "Admin Time", startTime: new Date(2024, 11, 19, 16, 30), duration: 30, doctorId: 1, isBreak: true },
    { id: 11, patientName: "Admin Time", startTime: new Date(2024, 11, 19, 16, 45), duration: 30, doctorId: 2, isBreak: true },
    { id: 12, patientName: "Admin Time", startTime: new Date(2024, 11, 19, 17, 0), duration: 30, doctorId: 3, isBreak: true },
]

export default function AppointmentsPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(currentDate)

    const timeSlots = Array.from({ length: 14 }, (_, i) => i + 8) // 8 AM to 9 PM

    const getAppointmentsForSlot = (hour: number, doctorId: number) => {
        const slotStart = setHours(selectedDate, hour)
        const slotEnd = addMinutes(slotStart, 60)
        return hardCodedAppointments.filter(apt =>
            isSameDay(apt.startTime, selectedDate) &&
            apt.startTime >= slotStart &&
            apt.startTime < slotEnd &&
            apt.doctorId === doctorId
        )
    }

    const getAppointmentColor = (appointment: Appointment): string => {
        if (appointment.isBreak) {
            return appointment.patientName === "Lunch Break" ? "bg-yellow-200" : "bg-gray-200"
        }
        const colors = ['bg-blue-200', 'bg-green-200', 'bg-red-200', 'bg-purple-200', 'bg-pink-200']
        return colors[appointment.id % colors.length]
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Appointments</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => date && setSelectedDate(date)}
                            className="rounded-md border"
                        />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Daily Schedule: {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                        <tr>
                                            <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Time
                                            </th>
                                            {doctors.map(doctor => (
                                                <th key={doctor.id} className="w-32 px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {doctor.name.split(' ')[1]}
                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {timeSlots.map(hour => (
                                            <tr key={hour}>
                                                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                                                    {format(setHours(new Date(), hour), 'h a')}
                                                </td>
                                                {doctors.map(doctor => (
                                                    <td key={doctor.id} className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 relative h-12">
                                                        {getAppointmentsForSlot(hour, doctor.id).map((apt: Appointment) => (
                                                            <div
                                                                key={apt.id}
                                                                className={`${getAppointmentColor(apt)} absolute left-0 right-0 rounded-sm overflow-hidden`}
                                                                style={{
                                                                    height: `${(apt.duration / 60) * 100}%`,
                                                                    top: `${(apt.startTime.getMinutes() / 60) * 100}%`
                                                                }}
                                                                title={`${apt.patientName}: ${format(apt.startTime, 'h:mm a')} - ${format(addMinutes(apt.startTime, apt.duration), 'h:mm a')}`}
                                                            >
                                                                <div className="text-xs p-1 truncate">
                                                                    {apt.patientName}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-6">
                <AppointmentModal />
            </div>
        </div>
    )
}

