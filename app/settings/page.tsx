'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Account</h2>
                    <div className="space-y-2">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" placeholder="Enter your password" />
                        </div>
                        <Button>Update Account</Button>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Preferences</h2>
                    <div className="flex items-center space-x-2">
                        <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Notifications</h2>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Switch id="email-notifications" />
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="sms-notifications" />
                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        </div>
                    </div>
                </div>
                <div>
                    <Button variant="destructive">Logout</Button>
                </div>
            </div>
        </div>
    )
}


