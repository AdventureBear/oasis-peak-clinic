export interface Appointment {
    id: number;
    patientName: string;
    patientId?: string;
    startTime: Date;
    duration: number;
    doctorId: number;
    isBreak?: boolean;
    type?: string;
}


