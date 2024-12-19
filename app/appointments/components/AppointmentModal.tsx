import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const physicians = [
    { id: 1, name: "Dr. John Smith" },
    { id: 2, name: "Dr. Sarah Johnson" },
    { id: 3, name: "Dr. Michael Lee" },
    { id: 4, name: "Dr. Emily Brown" },
]

export function AppointmentModal() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add New Appointment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Appointment</DialogTitle>
                    <DialogDescription>
                        Enter the details for the new appointment here. Click save when you&#39;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="patientName" className="text-right">
                            Patient Name
                        </Label>
                        <Input id="patientName" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="physician" className="text-right">
                            Physician
                        </Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a physician" />
                            </SelectTrigger>
                            <SelectContent>
                                {physicians.map((physician) => (
                                    <SelectItem key={physician.id} value={physician.id.toString()}>
                                        {physician.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                            Date
                        </Label>
                        <div className="col-span-3">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                            Time
                        </Label>
                        <Input id="time" type="time" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                            Duration (min)
                        </Label>
                        <Input id="duration" type="number" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save Appointment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

