abstract class Person {
    protected firstName: string
    protected lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }
}


class Patient extends Person {
    _patientID: number

    constructor(firstName: string, lastName: string, patientID: number) {
        super(firstName, lastName)
        this._patientID = patientID
    }

    ShowDetails(): string {
        return `ID: ${this._patientID}, first name: ${this.firstName}, last name: ${this.lastName},`
    }
}


class Doctor extends Person {
    _doctorID: number
    private _specialization: string

    constructor(firstName: string, lastName: string, doctorID: number, specialization: string) {
        super(firstName, lastName)
        this._doctorID = doctorID
        this._specialization = specialization
    }

    ShowDetails(): string {
        return `ID: ${this._doctorID}, first name: ${this.firstName}, last name: ${this.lastName}, specialization: ${this._specialization}`
    }
}

class Appointment {
    date: string
    time: string
    patient: Patient
    doctor: Doctor


    constructor(patient: Patient, doctor: Doctor, date: string, time: string) {
        this.date = date
        this.time = time
        this.patient = patient
        this.doctor = doctor
    }

    showDetails(): void {
        console.log(`DOCTOR: ${this.doctor.ShowDetails()} PATIENT: ${this.patient.ShowDetails()} DATE: ${this.date}, TIME: ${this.time}`)
    }
}

class Hospital {
    private _patients: Patient[] = []
    private _doctors: Doctor[] = []
    private _appointments: Appointment[] = []
    private _hospitalName: string = ''

    addPatient(patient: Patient) {
        this._patients.push(patient)
    }
    addDoctor(doctor: Doctor) {
        this._doctors.push(doctor)
    }
    addAppointment(appointment: Appointment) {
        this._appointments.push(appointment)
    }
    addHospitalName(hospitalName: string) {
        this._hospitalName = hospitalName
    }
    showingAllQueues() {
        this._appointments.forEach(appointment => {
            appointment.showDetails()
        });
    }
    showingAppointmentsOfOneDoctor(id: number) {
        this._appointments.forEach(appointment => {
            if (appointment.doctor._doctorID === id) appointment.showDetails()
        });
    }
    showingAppointmentsOfOnePatient(id: number) {
        this._appointments.forEach(appointment => {
            if (appointment.patient._patientID === id) appointment.showDetails()
        });
    }
    showingAppointmentsToday() {
        const currentDate: Date = new Date()
        let dateToday: string = `${currentDate.getFullYear()}-`
        const month: number = currentDate.getMonth() + 1
        if (Math.floor(month / 10) === 1) dateToday += `${month}-${currentDate.getDate()}`
        else dateToday += `0${month}-${currentDate.getDate()}`
            console.log(dateToday);

            // לבדוק איך מקבלים את התאריך בתור ולשנות בהתאם
            this._appointments.forEach(appointment => {
                if (appointment.date === dateToday) appointment.showDetails()
            });
    }
}

const patient1 = new Patient("John", "Doe", 1);
const doctor1 = new Doctor("Dr. Sarah", "Smith", 101, "Cardiology");
const appointment1 = new Appointment(patient1, doctor1, "2023-08-25", "10:00 AM");

const patient2 = new Patient("Alice", "Johnson", 2);
const doctor2 = new Doctor("Dr. Michael", "Brown", 102, "Pediatrics");
const appointment2 = new Appointment(patient2, doctor2, "2023-08-26", "11:30 AM");

const patient3 = new Patient("Emily", "Williams", 3);
const doctor3 = new Doctor("Dr. David", "Miller", 103, "Dermatology");
const appointment3 = new Appointment(patient3, doctor3, "2023-08-27", "2:00 PM");

const patient4 = new Patient("Daniel", "Smith", 4);
const doctor4 = new Doctor("Dr. Jessica", "Wilson", 104, "Orthopedics");
const appointment4 = new Appointment(patient4, doctor4, "2023-08-28", "9:00 AM");

const patient5 = new Patient("Sophia", "Anderson", 5);
const doctor5 = new Doctor("Dr. Christopher", "Taylor", 105, "Ophthalmology");
const appointment5 = new Appointment(patient5, doctor5, "2023-08-29", "3:30 PM");

const patient6 = new Patient("William", "Martin", 6);
const doctor6 = new Doctor("Dr. Olivia", "Clark", 106, "Neurology");
const appointment6 = new Appointment(patient6, doctor6, "2023-08-30", "12:15 PM");

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


hospital.showingAppointmentsOfOneDoctor(101)
hospital.showingAppointmentsOfOnePatient(4)
hospital.showingAppointmentsToday()
hospital.showingAllQueues()
