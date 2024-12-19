'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AIBusinessAssistant } from "./components/AIBusinessAssistant"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Legend, Cell } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const monthlyRevenueData = [
    { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
]

const appointmentTypesData = [
    { name: "Check-up", value: 400 },
    { name: "Follow-up", value: 300 },
    { name: "New Patient", value: 200 },
    { name: "Specialist", value: 100 },
]

const professionalDevelopmentData = [
    { category: "Continuing Education", hours: 120 },
    { category: "Workshops", hours: 80 },
    { category: "Conferences", hours: 40 },
    { category: "Online Courses", hours: 100 },
]

const appreciationEventsData = [
    { date: "2023-05-06", event: "Nurses Week Celebration", description: "Catered lunch and gift cards for all nursing staff" },
    { date: "2023-07-15", event: "Summer BBQ", description: "Team building event with games and food for all staff" },
    { date: "2023-09-30", event: "Employee Appreciation Day", description: "Recognition ceremony and personalized gifts" },
    { date: "2023-12-20", event: "Holiday Party", description: "End-of-year celebration with dinner and awards" },
]

const lifestyleOutcomesData = {
    hba1cImprovement: [
        { month: "Jan", value: 0.2 },
        { month: "Feb", value: 0.3 },
        { month: "Mar", value: 0.4 },
        { month: "Apr", value: 0.5 },
        { month: "May", value: 0.6 },
        { month: "Jun", value: 0.7 },
    ],
    exerciseAdoption: [
        { name: "Significant Increase", value: 30 },
        { name: "Moderate Increase", value: 45 },
        { name: "No Change", value: 20 },
        { name: "Decrease", value: 5 },
    ],
    weightManagement: [
        { month: "Jan", averageLoss: 1.2 },
        { month: "Feb", averageLoss: 1.5 },
        { month: "Mar", averageLoss: 1.8 },
        { month: "Apr", averageLoss: 2.1 },
        { month: "May", averageLoss: 2.3 },
        { month: "Jun", averageLoss: 2.5 },
    ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPage() {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Analytics</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="outcomes">Lifestyle Outcomes</TabsTrigger>
                    <TabsTrigger value="appointments">Appointment Types</TabsTrigger>
                    <TabsTrigger value="staff">Staff Development & Appreciation</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,234</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Appointments This Month</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">345</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">12 min</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Avg. HbA1c Improvement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0.7%</div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="revenue">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Revenue</CardTitle>
                            <CardDescription>Revenue trends over the past 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    total: {
                                        label: "Revenue",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                                className="h-[400px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyRevenueData}>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="outcomes">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Average HbA1c Improvement</CardTitle>
                                <CardDescription>Monthly average decrease in HbA1c levels</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        value: {
                                            label: "HbA1c Decrease",
                                            color: "hsl(var(--chart-2))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={lifestyleOutcomesData.hba1cImprovement}>
                                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Exercise Adoption</CardTitle>
                                <CardDescription>Reported changes in exercise habits</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        value: {
                                            label: "Patients",
                                            color: "hsl(var(--chart-3))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={lifestyleOutcomesData.exerciseAdoption}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {lifestyleOutcomesData.exerciseAdoption.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Average Weight Loss</CardTitle>
                                <CardDescription>Monthly average weight loss per patient (in kg)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        averageLoss: {
                                            label: "Average Weight Loss (kg)",
                                            color: "hsl(var(--chart-4))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={lifestyleOutcomesData.weightManagement}>
                                            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="averageLoss" fill="var(--color-averageLoss)" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="appointments">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appointment Types Distribution</CardTitle>
                            <CardDescription>Breakdown of appointment types</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    value: {
                                        label: "Appointments",
                                        color: "hsl(var(--chart-5))",
                                    },
                                }}
                                className="h-[400px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={appointmentTypesData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={150}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {appointmentTypesData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="staff">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Professional Development</CardTitle>
                                <CardDescription>Hours spent on various professional development activities</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        hours: {
                                            label: "Hours",
                                            color: "hsl(var(--chart-6))",
                                        },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={professionalDevelopmentData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="hours"
                                                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {professionalDevelopmentData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee Appreciation Events</CardTitle>
                                <CardDescription>Upcoming and past appreciation events</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Event</TableHead>
                                            <TableHead>Description</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {appreciationEventsData.map((event, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{event.date}</TableCell>
                                                <TableCell>{event.event}</TableCell>
                                                <TableCell>{event.description}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="mt-8">
                <AIBusinessAssistant />
            </div>
        </div>
    )
}

