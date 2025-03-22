"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock, Mail, Tag, MapPin, Video, Check } from "lucide-react"
import Link from "next/link"
import Footer from "../components/Footer"

// Tipos para las citas
type Appointment = {
  id: string
  firstName: string
  lastName: string
  email: string
  whatsapp: string
  date: Date
  time: string
  type: string
  meetingType: "presencial" | "virtual"
  // Campos para cita presencial
  city?: string
  neighborhood?: string
  address?: string
  // Campos para cita virtual
  platform?: string
  meetingLink?: string
  status: "pending" | "accepted" | "rejected"
}

// Horas disponibles para agendar según tipo de reunión
const getAvailableHours = (meetingType: string) => {
  if (meetingType === "virtual") {
    return [
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ]
  } else {
    return ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
  }
}

// Tipos de citas
const appointmentTypes = ["Consultoría", "Desarrollo Web", "Soporte Técnico", "Automatización", "Otro"]

// Ciudades disponibles
const cities = ["Cúcuta", "Patios", "Villa del Rosario", "El Zulia", "Chinacota"]

// Plataformas de reunión virtual
const platforms = ["Google Meet", "Zoom", "Microsoft Teams"]

// Zonas horarias comunes
const timeZones = [
  { value: "America/Bogota", label: "Colombia (GMT-5)" },
  { value: "America/New_York", label: "Nueva York (GMT-4)" },
  { value: "America/Chicago", label: "Chicago (GMT-5)" },
  { value: "America/Denver", label: "Denver (GMT-6)" },
  { value: "America/Los_Angeles", label: "Los Ángeles (GMT-7)" },
  { value: "Europe/London", label: "Londres (GMT+1)" },
  { value: "Europe/Paris", label: "París (GMT+2)" },
  { value: "Europe/Madrid", label: "Madrid (GMT+2)" },
  { value: "Asia/Tokyo", label: "Tokio (GMT+9)" },
  { value: "Australia/Sydney", label: "Sídney (GMT+10)" },
]

// Función simplificada para convertir hora
const convertTime = (time: string, fromOffset: number, toOffset: number) => {
  if (!time) return time

  try {
    const [hours, minutes] = time.split(":").map(Number)
    if (isNaN(hours) || isNaN(minutes)) return time

    const offsetDiff = toOffset - fromOffset

    // Calcular la nueva hora
    let newHours = hours + offsetDiff

    // Ajustar para día anterior/siguiente si es necesario
    if (newHours < 0) newHours += 24
    if (newHours >= 24) newHours -= 24

    return `${newHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  } catch (error) {
    console.error("Error converting time:", error)
    return time
  }
}

// Mapa de offsets de zona horaria
const timeZoneOffsets: Record<string, number> = {
  "America/Bogota": -5,
  "America/New_York": -4,
  "America/Chicago": -5,
  "America/Denver": -6,
  "America/Los_Angeles": -7,
  "Europe/London": 1,
  "Europe/Paris": 2,
  "Europe/Madrid": 2,
  "Asia/Tokyo": 9,
  "Australia/Sydney": 10,
}

export default function AppointmentsPage() {
  // Estado para controlar si el componente está montado
  const [isMounted, setIsMounted] = useState(false)

  // Estados básicos
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Citas de ejemplo
  const [appointments, setAppointments] = useState<Appointment[]>([])

  // Estado del formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    time: "",
    type: "",
    meetingType: "presencial",
    city: "",
    neighborhood: "",
    address: "",
    platform: "",
    meetingLink: "",
    timeZone: "America/Bogota",
  })

  // Inicializar el componente después de montarlo
  useEffect(() => {
    setIsMounted(true)

    // Inicializar la fecha y las citas de ejemplo solo después de montar
    if (!date) {
      setDate(new Date())
    }

    if (appointments.length === 0) {
      setAppointments([
        {
          id: "1",
          firstName: "Juan",
          lastName: "Pérez",
          email: "cliente1@example.com",
          whatsapp: "+573201234567",
          date: new Date(2025, 2, 25),
          time: "10:00",
          type: "Consultoría",
          meetingType: "presencial",
          city: "Cúcuta",
          neighborhood: "Centro",
          address: "Calle 10 #5-45",
          status: "accepted",
        },
        {
          id: "2",
          firstName: "María",
          lastName: "González",
          email: "cliente2@example.com",
          whatsapp: "+573109876543",
          date: new Date(2025, 2, 26),
          time: "14:00",
          type: "Desarrollo Web",
          meetingType: "virtual",
          platform: "Google Meet",
          meetingLink: "https://meet.google.com/abc-defg-hij",
          status: "pending",
        },
      ])
    }

    return () => {
      setIsMounted(false)
    }
  }, [])

  // Función para verificar si una hora está ocupada en una fecha específica
  const isTimeSlotBooked = (checkDate: Date | undefined, time: string) => {
    if (!checkDate) return false
    return appointments.some(
      (appointment) =>
        format(appointment.date, "yyyy-MM-dd") === format(checkDate, "yyyy-MM-dd") && appointment.time === time,
    )
  }

  // Obtener las citas para la fecha seleccionada
  const getAppointmentsForDate = (checkDate: Date | undefined) => {
    if (!checkDate) return []
    return appointments.filter(
      (appointment) => format(appointment.date, "yyyy-MM-dd") === format(checkDate, "yyyy-MM-dd"),
    )
  }

  // Manejar cambios en el formulario
  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Limpiar error cuando el usuario escribe
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  // Validar el formulario
  const validateForm = () => {
    const errors: Record<string, string> = {}

    // Validaciones básicas
    if (!formData.firstName) errors.firstName = "El nombre es requerido"
    if (!formData.lastName) errors.lastName = "El apellido es requerido"

    if (!formData.email) {
      errors.email = "El correo es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Correo inválido"
    }

    if (!formData.whatsapp) {
      errors.whatsapp = "El número de WhatsApp es requerido"
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.whatsapp.replace(/\s/g, ""))) {
      errors.whatsapp = "Formato inválido. Ej: +573201234567"
    }

    if (!formData.time) errors.time = "La hora es requerida"
    if (!formData.type) errors.type = "El tipo de cita es requerido"

    // Validaciones específicas según el tipo de encuentro
    if (formData.meetingType === "presencial") {
      if (!formData.city) errors.city = "La ciudad es requerida"
      if (!formData.neighborhood) errors.neighborhood = "El barrio es requerido"
      if (!formData.address) errors.address = "La dirección es requerida"
    } else if (formData.meetingType === "virtual") {
      if (!formData.platform) errors.platform = "La plataforma es requerida"
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
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      date: date,
      time: formData.time,
      type: formData.type,
      meetingType: formData.meetingType as "presencial" | "virtual",
      status: "pending",
    }

    // Agregar campos específicos según el tipo de encuentro
    if (formData.meetingType === "presencial") {
      newAppointment.city = formData.city
      newAppointment.neighborhood = formData.neighborhood
      newAppointment.address = formData.address
    } else if (formData.meetingType === "virtual") {
      newAppointment.platform = formData.platform
      newAppointment.meetingLink = formData.meetingLink
    }

    // Agregar la cita
    setAppointments((prev) => [...prev, newAppointment])

    // Cerrar el diálogo de formulario y mostrar confirmación
    setIsDialogOpen(false)
    setIsConfirmationOpen(true)
  }

  // Cerrar el diálogo de confirmación y limpiar el formulario
  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      whatsapp: "",
      time: "",
      type: "",
      meetingType: "presencial",
      city: "",
      neighborhood: "",
      address: "",
      platform: "",
      meetingLink: "",
      timeZone: "America/Bogota",
    })
  }

  // Si el componente no está montado, mostrar un estado de carga
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Cargando...</p>
        </div>
      </div>
    )
  }

  // Renderizar el estado de disponibilidad para cada hora
  const renderTimeSlots = () => {
    if (!date) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Selecciona una fecha para ver los horarios disponibles.
        </div>
      )
    }

    // Mostrar todos los horarios posibles (virtuales y presenciales)
    const allHours = Array.from(new Set([...getAvailableHours("presencial"), ...getAvailableHours("virtual")])).sort()

    if (allHours.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No hay horarios disponibles para esta fecha.
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {allHours.map((time) => {
          const isBooked = isTimeSlotBooked(date, time)
          const appointment = appointments.find(
            (a) => format(a.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") && a.time === time,
          )
          const isVirtualAvailable = getAvailableHours("virtual").includes(time)
          const isPresencialAvailable = getAvailableHours("presencial").includes(time)

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
                  className={`text-sm font-medium ${
                    isBooked ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {isBooked ? "Ocupado" : "Disponible"}
                </span>
              </div>

              {!isBooked && (
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                  {isVirtualAvailable && (
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mr-2">
                      Virtual
                    </span>
                  )}
                  {isPresencialAvailable && (
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                      Presencial
                    </span>
                  )}
                </div>
              )}

              {isBooked && appointment && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {appointment.firstName} {appointment.lastName}
                  </p>
                  <p className="flex items-center mt-1">
                    <Tag className="w-4 h-4 mr-1" />
                    {appointment.type}
                  </p>
                  <p className="flex items-center mt-1">
                    {appointment.meetingType === "presencial" ? (
                      <>
                        <MapPin className="w-4 h-4 mr-1" />
                        Presencial - {appointment.city}
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-1" />
                        Virtual - {appointment.platform}
                      </>
                    )}
                  </p>
                  <p className="flex items-center mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        appointment.status === "accepted"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {appointment.status === "accepted" ? "Aceptada" : "Pendiente"}
                    </span>
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
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Agenda una Cita
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendario */}
          <div className="lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white flex items-center">
              <CalendarIcon className="w-6 h-6 mr-2 text-blue-500" />
              Selecciona una fecha
            </h2>

            <div className="flex justify-center">
              {date && (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={es}
                  className="rounded-md border"
                  disabled={{ before: new Date() }}
                />
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Agregar Cita
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Agendar Nueva Cita</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Información personal */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Tu nombre"
                          value={formData.firstName}
                          onChange={(e) => handleFormChange("firstName", e.target.value)}
                          className={formErrors.firstName ? "border-red-500" : ""}
                        />
                        {formErrors.firstName && <p className="text-sm text-red-500">{formErrors.firstName}</p>}
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Tu apellido"
                          value={formData.lastName}
                          onChange={(e) => handleFormChange("lastName", e.target.value)}
                          className={formErrors.lastName ? "border-red-500" : ""}
                        />
                        {formErrors.lastName && <p className="text-sm text-red-500">{formErrors.lastName}</p>}
                      </div>
                    </div>

                    {/* Información de contacto */}
                    <div className="grid gap-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="+573201234567"
                        value={formData.whatsapp}
                        onChange={(e) => handleFormChange("whatsapp", e.target.value)}
                        className={formErrors.whatsapp ? "border-red-500" : ""}
                      />
                      {formErrors.whatsapp && <p className="text-sm text-red-500">{formErrors.whatsapp}</p>}
                    </div>

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

                    {/* Información de la cita */}
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
                          {getAvailableHours(formData.meetingType).map((time) => (
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

                    {/* Tipo de encuentro */}
                    <div className="grid gap-2">
                      <Label>Tipo de Encuentro</Label>
                      <RadioGroup
                        value={formData.meetingType}
                        onValueChange={(value) => handleFormChange("meetingType", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="presencial" id="presencial" />
                          <Label htmlFor="presencial" className="cursor-pointer">
                            Presencial
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="virtual" id="virtual" />
                          <Label htmlFor="virtual" className="cursor-pointer">
                            Virtual
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Campos específicos para encuentro presencial */}
                    {formData.meetingType === "presencial" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="city">Ciudad</Label>
                          <Select value={formData.city} onValueChange={(value) => handleFormChange("city", value)}>
                            <SelectTrigger className={formErrors.city ? "border-red-500" : ""}>
                              <SelectValue placeholder="Selecciona una ciudad" />
                            </SelectTrigger>
                            <SelectContent>
                              {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.city && <p className="text-sm text-red-500">{formErrors.city}</p>}
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="neighborhood">Barrio</Label>
                          <Input
                            id="neighborhood"
                            type="text"
                            placeholder="Nombre del barrio"
                            value={formData.neighborhood}
                            onChange={(e) => handleFormChange("neighborhood", e.target.value)}
                            className={formErrors.neighborhood ? "border-red-500" : ""}
                          />
                          {formErrors.neighborhood && <p className="text-sm text-red-500">{formErrors.neighborhood}</p>}
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="address">Dirección</Label>
                          <Input
                            id="address"
                            type="text"
                            placeholder="Calle, número, apartamento, etc."
                            value={formData.address}
                            onChange={(e) => handleFormChange("address", e.target.value)}
                            className={formErrors.address ? "border-red-500" : ""}
                          />
                          {formErrors.address && <p className="text-sm text-red-500">{formErrors.address}</p>}
                        </div>
                      </>
                    )}

                    {/* Campos específicos para encuentro virtual */}
                    {formData.meetingType === "virtual" && (
                      <>
                        <div className="grid gap-2">
                          <Label htmlFor="platform">Plataforma</Label>
                          <Select
                            value={formData.platform}
                            onValueChange={(value) => handleFormChange("platform", value)}
                          >
                            <SelectTrigger className={formErrors.platform ? "border-red-500" : ""}>
                              <SelectValue placeholder="Selecciona una plataforma" />
                            </SelectTrigger>
                            <SelectContent>
                              {platforms.map((platform) => (
                                <SelectItem key={platform} value={platform}>
                                  {platform}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors.platform && <p className="text-sm text-red-500">{formErrors.platform}</p>}
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="meetingLink">Enlace de la Reunión (opcional)</Label>
                          <Input
                            id="meetingLink"
                            type="url"
                            placeholder="https://meet.google.com/..."
                            value={formData.meetingLink}
                            onChange={(e) => handleFormChange("meetingLink", e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div className="grid gap-2 mt-4">
                      <Label htmlFor="timeZone">Zona Horaria</Label>
                      <Select value={formData.timeZone} onValueChange={(value) => handleFormChange("timeZone", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona tu zona horaria" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeZones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        Los horarios mostrados están en hora de Colombia (GMT-5).
                        {formData.timeZone !== "America/Bogota" && formData.time && (
                          <span className="block font-medium mt-1">
                            {formData.time} (COL) ={" "}
                            {convertTime(
                              formData.time,
                              timeZoneOffsets["America/Bogota"],
                              timeZoneOffsets[formData.timeZone],
                            )}{" "}
                            en tu zona horaria
                          </span>
                        )}
                      </p>
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

              {/* Diálogo de confirmación */}
              <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      Cita Agendada
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-gray-700 dark:text-gray-300">
                      La agenda fue enviada, a la espera de ser aceptada.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={handleConfirmationClose}
                    >
                      Aceptar
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Horarios */}
          <div className="lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
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
          </div>
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

