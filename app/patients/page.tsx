import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PatientsPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Patients</h1>
            <div className="flex justify-between items-center mb-4">
                <Input className="max-w-sm" placeholder="Search patients..." />
                <Button>Add New Patient</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date of Birth</TableHead>
                        <TableHead>Last Visit</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell>1980-05-15</TableCell>
                        <TableCell>2023-06-01</TableCell>
                        <TableCell>
                            <Button size="sm">View</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>1992-11-22</TableCell>
                        <TableCell>2023-05-28</TableCell>
                        <TableCell>
                            <Button size="sm">View</Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Bob Johnson</TableCell>
                        <TableCell>1975-03-08</TableCell>
                        <TableCell>2023-06-05</TableCell>
                        <TableCell>
                            <Button size="sm">View</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

