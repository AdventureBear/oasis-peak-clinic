import Link from 'next/link'
import { Calendar, Users, FileText, BarChart, Cog, TrendingUp } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="font-bold text-xl">
                            Oasis Peak Care Partners
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <NavItem href="/appointments" icon={<Calendar className="w-5 h-5 mr-1" />}>
                            Appointments
                        </NavItem>
                        <NavItem href="/patients" icon={<Users className="w-5 h-5 mr-1" />}>
                            Patients
                        </NavItem>
                        <NavItem href="/clinical" icon={<FileText className="w-5 h-5 mr-1" />}>
                            Clinical
                        </NavItem>
                        <NavItem href="/analytics" icon={<BarChart className="w-5 h-5 mr-1" />}>
                            Analytics
                        </NavItem>
                        <NavItem href="/business-development" icon={<TrendingUp className="w-5 h-5 mr-1" />}>
                            Business Dev
                        </NavItem>
                        <NavItem href="/settings" icon={<Cog className="w-5 h-5 mr-1" />}>
                            Settings
                        </NavItem>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function NavItem({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <Link href={href} className="flex items-center px-3 py-2 rounded hover:bg-blue-600 transition-colors">
            {icon}
            <span>{children}</span>
        </Link>
    )
}

