import { useState } from 'react'
import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Checkbox} from "@/components/ui/checkbox";

interface AIScribeModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export function AIScribeModal({ isOpen, onClose, onConfirm }: AIScribeModalProps) {
    const [consentGiven, setConsentGiven] = useState(false)

    const handleConfirm = () => {
        if (consentGiven) {
            onConfirm()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>AI Scribe Permission</DialogTitle>
                    <DialogDescription>
                        We use an AI scribe to assist in documenting this encounter, allowing the doctor to focus entirely on you.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="consent"
                        checked={consentGiven}
                        onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                    />
                    <label
                        htmlFor="consent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I consent to the use of an AI scribe for this encounter
                    </label>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleConfirm} disabled={!consentGiven}>Start Encounter</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

