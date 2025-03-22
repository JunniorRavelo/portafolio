"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock, Mail, Tag } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Footer from "../components/Footer"

// Tipos para las citas
type Appointment = {
  id: string
  email: string
  date: Date
  time: string
  type: string
}

// Horas disponibles para agendar
const availableHours = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

// Tipos de citas
const appointmentTypes = ["Consultoría", "Desarrollo Web", "Soporte Técnico", "Automatización", "Otro"]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([
    // Algunas citas de ejemplo
    {
      id: "1",
      email: "cliente1@example.com",
      date: new Date(2025, 2, 25),
      time: "10:00",
      type: "Consultoría",
    },
    {
      id: "2",
      email: "cliente2@example.com",
      date: new Date(2025, 2, 26),
      time: "14:00",
      type: "Desarrollo Web",
    },
  ])

  // Estado para el formulario
  const [formData, setFormData] = useState({
    email: "",
    time: "",
    type: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  // Función para verificar si una hora está ocupada en una fecha específica
  const isTimeSlotBooked = (date: Date, time: string) => {
    return appointments.some(
      (appointment) =>
        format(appointment.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && appointment.time === time,
    )
  }

  // Obtener las citas para la fecha seleccionada
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) => format(appointment.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
  }

  // Manejar cambios en el formulario
  const handleFormChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })

    // Limpiar error cuando el usuario escribe
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: "",
      })
    }
  }

  // Validar el formulario
  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.email) {
      errors.email = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Correo inválido"
    }

    if (!formData.time) {
      errors.time = "La hora es requerida"
    }

    if (!formData.type) {
      errors.type = "El tipo de cita es requerido"
    }

    return errors
  }

  // Manejar el envío del formulario
  const handleSubmit = () => {
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    if (!date) return

    // Crear nueva cita
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      email: formData.email,
      date: date,
      time: formData.time,
      type: formData.type,
    }

    // Agregar la cita
    setAppointments([...appointments, newAppointment])

    // Limpiar formulario y cerrar modal
    setFormData({
      email: "",
      time: "",
      type: "",
    })
    setIsDialogOpen(false)
  }

  // Renderizar el estado de disponibilidad para cada hora
  const renderTimeSlots = () => {
    if (!date) return null

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {availableHours.map((time) => {
          const isBooked = isTimeSlotBooked(date, time)
          const appointment = appointments.find(
            (a) => format(a.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && a.time === time,
          )

          return (
            <div
              key={time}
              className={`p-4 rounded-lg border ${
                isBooked
                  ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                  : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className={`w-5 h-5 mr-2 ${isBooked ? "text-red-500" : "text-green-500"}`} />
                  <span className="font-medium">{time}</span>
                </div>
                <span
                  className={`text-sm font-medium ${isBooked ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                >
                  {isBooked ? "Ocupado" : "Disponible"}
                </span>
              </div>

              {isBooked && appointment && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {appointment.email}
                  </p>
                  <p className="flex items-center mt-1">
                    <Tag className="w-4 h-4 mr-1" />
                    {appointment.type}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Agenda una Cita
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendario */}
          <motion.div
            className="lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 dark:text-white flex items-center">
              <CalendarIcon className="w-6 h-6 mr-2 text-blue-500" />
              Selecciona una fecha
            </h2>

            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={es}
                className="rounded-md border"
                disabled={{ before: new Date() }}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Agregar Cita
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Agendar Nueva Cita</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={(e) => handleFormChange("email", e.target.value)}
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                    </div>

                    <div className="grid gap-2">
                      <Label>Día Seleccionado</Label>
                      <div className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                        {date ? format(date, "PPPP", { locale: es }) : "Selecciona una fecha"}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="time">Hora</Label>
                      <Select value={formData.time} onValueChange={(value) => handleFormChange("time", value)}>
                        <SelectTrigger className={formErrors.time ? "border-red-500" : ""}>
                          <SelectValue placeholder="Selecciona una hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableHours.map((time) => (
                            <SelectItem key={time} value={time} disabled={date ? isTimeSlotBooked(date, time) : false}>
                              {time} {date && isTimeSlotBooked(date, time) ? "(Ocupado)" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.time && <p className="text-sm text-red-500">{formErrors.time}</p>}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="type">Tipo de Cita</Label>
                      <Select value={formData.type} onValueChange={(value) => handleFormChange("type", value)}>
                        <SelectTrigger className={formErrors.type ? "border-red-500" : ""}>
                          <SelectValue placeholder="Selecciona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {appointmentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.type && <p className="text-sm text-red-500">{formErrors.type}</p>}
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={handleSubmit}
                    >
                      Agendar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Horarios */}
          <motion.div
            className="lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-6 dark:text-white flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-500" />
              Horarios {date && `para ${format(date, "d 'de' MMMM", { locale: es })}`}
            </h2>

            {renderTimeSlots()}

            {date && getAppointmentsForDate(date).length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No hay citas agendadas para esta fecha.
              </div>
            )}
          </motion.div>
        </div>

        {/* Botón para volver al inicio */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

