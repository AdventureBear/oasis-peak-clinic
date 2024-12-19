import Image from "next/image";
import SinglePatientPage from "@/app/patients/[patientId]/page";
import PatientsPage from "@/app/patients/page";
import PatientSearchForm from "@/app/patients/components/PatientSearchForm";
import Dashboard from "@/app/dashboard/page";

export default function Home() {
  return (
   <div className="">
    <Dashboard />
    </div>
  );
}
