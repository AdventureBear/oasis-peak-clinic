import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Mic, MicOff, Pause, Play, Square, Clock, Pill, FileText, Stethoscope, FlaskRoundIcon as Flask } from 'lucide-react'

interface EncounterModalProps {
    isOpen: boolean
    onClose: () => void
}

export function EncounterModal({ isOpen, onClose }: EncounterModalProps) {
    const [isRecording, setIsRecording] = useState(true)
    const [encounterTime, setEncounterTime] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isOpen) {
            interval = setInterval(() => {
                setEncounterTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Active Encounter</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {isRecording ? (
                                <Mic className="h-6 w-6 text-red-500 animate-pulse" />
                            ) : (
                                <MicOff className="h-6 w-6 text-gray-500" />
                            )}
                            <span>{isRecording ? "Recording" : "Paused"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5" />
                            <span>{formatTime(encounterTime)}</span>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-2">
                        <Button onClick={toggleRecording}>
                            {isRecording ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                            {isRecording ? "Pause" : "Resume"} AI Scribe
                        </Button>
                        <Button variant="destructive">
                            <Square className="h-4 w-4 mr-2" />
                            Stop Encounter
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Create Note
                        </Button>
                        <Button variant="outline">
                            <Stethoscope className="h-4 w-4 mr-2" />
                            Record Vitals
                        </Button>
                        <Button variant="outline">
                            <Pill className="h-4 w-4 mr-2" />
                            Prescribe Med
                        </Button>
                        <Button variant="outline">
                            <Flask className="h-4 w-4 mr-2" />
                            Order Lab Test
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

