type Mat = [string, string][]

abstract class Person {
    protected firstName: string
    protected lastName: string
    protected age: number
    protected address: string

    constructor(firstName: string, lastName: string, age: number, address: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.address = address
    }
}

abstract class MedicalStaff extends Person {
    protected staffID: number
    protected position: string
    protected department: string

    constructor(firstName: string, lastName: string, age: number, address: string, staffID: number, position: string, department: string) {
        super(firstName, lastName, age, address)
        this.staffID = staffID
        this.position = position
        this.department = department
    }
}

class MedicalRecord {
    private _patient: Patient
    private _doctor: Doctor
    private _diagnosis: string
    private _prescription: string

    constructor(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string) {
        this._patient = patient
        this._doctor = doctor
        this._diagnosis = diagnosis
        this._prescription = prescription
    }
    getPatient(): Patient {
        return this._patient
    }
}

class Patient extends Person {
    private _patientID: number
    private _phoneNumber: string
    private _emergencyContact: string
    private _medicalHistory: Appointment[] = []

    constructor(firstName: string, lastName: string, age: number, address: string, patientID: number, phoneNumber: string, emergencyContact: string) {
        super(firstName, lastName, age, address)
        this._patientID = patientID
        this._phoneNumber = phoneNumber
        this._emergencyContact = emergencyContact

    }
    addMedicalHistory(medicalHistory: Appointment): void {
        this._medicalHistory.push(medicalHistory)
    }
    getPatientId(): number {
        return this._patientID
    }
    getAge(): number {
        return this.age
    }

    ShowDetails(): string {
        return `ID: ${this._patientID}, first name: ${this.firstName}, last name: ${this.lastName},`
    }
}


class Doctor extends MedicalStaff {
    private _doctorID: number
    private _specialization: string
    private _schedule: Mat = []
    private _availability: Mat = [["2023-08-28", "10:00 AM"], ["2023-08-30", "3:00 PM"], ["2023-09-05", "9:30 AM"], ["2023-09-08", "1:15 PM"], ["2023-09-10", "11:00 AM"], ["2023-09-12", "2:30 PM"]]
    private _ageRangeMax: number
    private _ageRangeMin: number

    constructor(firstName: string, lastName: string, age: number, address: string, doctorID: number, specialization: string, staffID: number, position: string, department: string, ageRangeMax: number, ageRangeMin: number) {
        super(firstName, lastName, age, address, staffID, position, department)
        this._doctorID = doctorID
        this._specialization = specialization
        this._ageRangeMin = ageRangeMin
        this._ageRangeMax = ageRangeMax
    }

    getDoctorId(): number {
        return this._doctorID
    }
    getSpecialization(): string {
        return this._specialization
    }
    getAgeRangeMin(): number {
        return this._ageRangeMin
    }
    getAgeRangeMax(): number {
        return this._ageRangeMax
    }
    getSchedule(): Mat {
        return this._schedule
    }
    getAvailability(): Mat {
        return this._availability
    }
    ShowDetails(): string {
        return `ID: ${this._doctorID}, first name: ${this.firstName}, last name: ${this.lastName}, specialization: ${this._specialization}`
    }
}

class Appointment {
    private _date: string
    private _time: string
    private _patient: Patient
    private _doctor: Doctor
    private _status: "Scheduled" | "Completed" | "Canceled"


    constructor(patient: Patient, doctor: Doctor, date: string, time: string, status: "Scheduled" | "Completed" | "Canceled") {
        this._date = date
        this._time = time
        this._patient = patient
        this._doctor = doctor
        this._status = status
    }
    getDoctor(): Doctor {
        return this._doctor
    }
    getPatient(): Patient {
        return this._patient
    }
    getTime(): string {
        return this._time
    }
    getDate(): string {
        return this._date
    }
    showDetails(): void {
        console.log(`DOCTOR: ${this._doctor.ShowDetails()} PATIENT: ${this._patient.ShowDetails()} DATE: ${this._date}, TIME: ${this._time}`)
    }
    ageRangeCheck(): boolean {
        if (this._patient.getAge() < this._doctor.getAgeRangeMin() || this._patient.getAge() > this._doctor.getAgeRangeMax()) return false
        else return true
    }
    setStatus(status: "Scheduled" | "Completed" | "Canceled"): void {
        this._status = status
    }
}

class Hospital {
    private _patients: Patient[] = []
    private _doctors: Doctor[] = []
    private _appointments: Appointment[] = []
    private _hospitalName: string = ''
    private _medicalRecords: MedicalRecord[] = []

    addPatient(patient: Patient): void {
        this._patients.push(patient)
    }
    addDoctor(doctor: Doctor): void {
        this._doctors.push(doctor)
    }
    addAppointment(appointment: Appointment): void {
        if (!appointment.ageRangeCheck()) console.log('The doctor does not treat this age, please contact another doctor');
        let flag: boolean = false
        let i: number = 0
        appointment.getDoctor().getAvailability().forEach((turn, index) => {
            if (turn.includes(appointment.getTime()) && turn.includes(appointment.getDate())) {
                flag = true
                i = index
            }
        })
        if (flag) {
            this._appointments.push(appointment)
            appointment.getDoctor().getSchedule().push([appointment.getTime(), appointment.getDate()])
            appointment.getDoctor().getAvailability().splice(i, 1)
        }
        else console.log('The queue is busy');
    }
    addHospitalName(hospitalName: string): void {
        this._hospitalName = hospitalName
    }
    addMedicalRecord(medicalRecord: MedicalRecord): void {
        this._medicalRecords.push(medicalRecord)
    }
    showingAllQueues(): void {
        this._appointments.forEach(appointment => {
            appointment.showDetails()
        });
    }
    showingAppointmentsOfOneDoctor(id: number): void {
        this._appointments.forEach(appointment => {
            const doctorId: number = appointment.getDoctor().getDoctorId()
            if (doctorId === id) appointment.showDetails()
        });
    }
    SearchForADoctorBySpecialty(specialization: string): Doctor[] {
        const doctors = this._doctors.filter((doctor) => {
            doctor.getSpecialization() === specialization;
        });
        return doctors
    }
    showingAppointmentsOfOnePatient(id: number): void {
        this._appointments.forEach(appointment => {
            const patientId: number = appointment.getPatient().getPatientId()
            if (patientId === id) appointment.showDetails()
        });
    }
    showingAppointmentsToday(): void {
        const currentDate: Date = new Date()
        let dateToday: string = `${currentDate.getFullYear()}-`
        const month: number = currentDate.getMonth() + 1
        if (Math.floor(month / 10) === 1) dateToday += `${month}-${currentDate.getDate()}`
        else dateToday += `0${month}-${currentDate.getDate()}`
        this._appointments.forEach(appointment => {
            if (appointment.getDate() === dateToday) appointment.showDetails()
        });
    }
    createMedicalRecord(medicalRecord: MedicalRecord): void {
        this._medicalRecords.push(medicalRecord)
    }
    getMedicalRecords(id: number): MedicalRecord[] {
        const medicalRecords = this._medicalRecords.filter((medicalRecord) => {
            medicalRecord.getPatient().getPatientId() === id;
        });
        return medicalRecords
    }
    getDoctorSchedule(id: number): number[] | void {
        const doctor = this._doctors.filter((doctor) => {
            doctor.getDoctorId() === id
            return doctor.getSchedule()
        })
    }
    getDoctorAvailability(id: number): string[] | void {
        const doctor = this._doctors.filter((doctor) => {
            doctor.getDoctorId() === id
            return doctor.getAvailability()
        })
    }
}
const patient1 = new Patient("John", "Doe", 30, "123 Main St", 1, "555-1234", "Jane Smith");
const doctor1 = new Doctor("Dr. Sarah", "Smith", 40, "789 Oak St", 101, "Cardiology", 201, "Cardiologist", "Cardiology", 40, 30);
const appointment1 = new Appointment(patient1, doctor1, "2023-08-28", "10:00 AM", "Scheduled");

const patient2 = new Patient("Alice", "Johnson", 25, "456 Elm St", 2, "555-5678", "Bob Brown");
const doctor2 = new Doctor("Dr. Michael", "Brown", 45, "890 Maple St", 102, "Pediatrics", 202, "Pediatrician", "Pediatrics", 50, 25);
const appointment2 = new Appointment(patient2, doctor2, "2023-08-30", "3:00 PM", "Completed");

const patient3 = new Patient("Emily", "Williams", 28, "567 Pine St", 3, "555-9876", "David Johnson");
const doctor3 = new Doctor("Dr. Jessica", "Wilson", 38, "901 Birch St", 103, "Orthopedics", 203, "Orthopedic Surgeon", "Orthopedics", 60, 25);
const appointment3 = new Appointment(patient3, doctor3, "2023-09-05", "9:30 AM", "Canceled");

const patient4 = new Patient("Daniel", "Smith", 35, "678 Cedar St", 4, "555-4321", "Jessica Martinez");
const doctor4 = new Doctor("Dr. Christopher", "Taylor", 50, "123 Spruce St", 104, "Ophthalmology", 204, "Ophthalmologist", "Ophthalmology", 70, 30);
const appointment4 = new Appointment(patient4, doctor4, "2023-09-08", "1:15 PM", "Scheduled");

const patient5 = new Patient("Sophia", "Anderson", 40, "789 Walnut St", 5, "555-3456", "William Johnson");
const doctor5 = new Doctor("Dr. David", "Miller", 55, "234 Cedar St", 105, "Neurology", 205, "Neurologist", "Neurology", 60, 40);
const appointment5 = new Appointment(patient5, doctor5, "2023-09-10", "11:00 AM", "Completed");

const patient6 = new Patient("James", "Martin", 40, "890 Oak St", 6, "555-6789", "Olivia White");
const doctor6 = new Doctor("Dr. Olivia", "Clark", 42, "345 Birch St", 106, "Dermatology", 206, "Dermatologist", "Dermatology", 50, 30);
const appointment6 = new Appointment(patient6, doctor5, "2023-09-10", "11:00 AM", "Scheduled");



const hospital = new Hospital()

hospital.addPatient(patient1)
hospital.addPatient(patient2)
hospital.addPatient(patient3)
hospital.addPatient(patient4)
hospital.addPatient(patient5)
hospital.addPatient(patient6)

hospital.addDoctor(doctor1)
hospital.addDoctor(doctor2)
hospital.addDoctor(doctor3)
hospital.addDoctor(doctor4)
hospital.addDoctor(doctor5)
hospital.addDoctor(doctor6)

hospital.addAppointment(appointment1)
hospital.addAppointment(appointment2)
hospital.addAppointment(appointment3)
hospital.addAppointment(appointment4)
hospital.addAppointment(appointment5)
hospital.addAppointment(appointment6)


// hospital.showingAppointmentsOfOneDoctor(101)
// hospital.showingAppointmentsOfOnePatient(4)
// hospital.showingAppointmentsToday()
// hospital.showingAllQueues()