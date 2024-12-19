'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for orders
const mockOrders = [
    { id: 1, patientName: 'John Doe', orderType: 'Blood Test', status: 'Pending', date: '2023-12-18' },
    { id: 2, patientName: 'Jane Smith', orderType: 'X-Ray', status: 'Completed', date: '2023-12-17' },
    { id: 3, patientName: 'Alice Johnson', orderType: 'MRI', status: 'Scheduled', date: '2023-12-20' },
]

export default function OrdersManagement() {
    const [orders, setOrders] = useState(mockOrders)
    const [newOrder, setNewOrder] = useState({ patientName: '', orderType: '', status: 'Pending', date: '' })

    const handleAddOrder = () => {
        setOrders([...orders, { ...newOrder, id: orders.length + 1 }])
        setNewOrder({ patientName: '', orderType: '', status: 'Pending', date: '' })
    }

    return (
        <div className="space-y-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add New Order</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Order</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patientName" className="text-right">
                                Patient Name
                            </Label>
                            <Input
                                id="patientName"
                                value={newOrder.patientName}
                                onChange={(e) => setNewOrder({ ...newOrder, patientName: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="orderType" className="text-right">
                                Order Type
                            </Label>
                            <Input
                                id="orderType"
                                value={newOrder.orderType}
                                onChange={(e) => setNewOrder({ ...newOrder, orderType: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Input
                                id="date"
                                type="date"
                                value={newOrder.date}
                                onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddOrder}>Add Order</Button>
                </DialogContent>
            </Dialog>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.patientName}</TableCell>
                            <TableCell>{order.orderType}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

