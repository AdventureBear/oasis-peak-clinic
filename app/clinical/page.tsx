'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrdersManagement from './components/OrdersManagement'
import ResultsViewer from './components/ResultsViewer'
import MedicationManagement from './components//MedicationManagement'
import PriorAuthTool from './components/PriorAuthTool'

export default function ClinicalPage() {
    const [activeTab, setActiveTab] = useState('orders')

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Clinical Management</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="priorAuth">Prior Auth</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <OrdersManagement />
                </TabsContent>
                <TabsContent value="results">
                    <ResultsViewer />
                </TabsContent>
                <TabsContent value="medications">
                    <MedicationManagement />
                </TabsContent>
                <TabsContent value="priorAuth">
                    <PriorAuthTool />
                </TabsContent>
            </Tabs>
        </div>
    )
}

