import { patientListParser } from "./html-parser/patient-list-parser";
import { admissionListParser } from './html-parser/admission-list-parser'
import { vitalSignParser } from "./html-parser/vital-sign-parser"
export const parsers = {
    'PatientList': patientListParser,
    'PreSelect': () => { return {} },
    'AdmissionList': admissionListParser,
    'VitalSign': vitalSignParser
}

