import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import QuestionsForm from './questions'
import BookAppointmentDate from './booking-date'

type Props = {
    questions: string[]
    type: 'Appointment' | 'Payment'
    register: UseFormRegister<FieldValues>
    error: FieldErrors<FieldValues>
    onNext(): void
    step: number
    date: Date | undefined
    onBooking: React.Dispatch<React.SetStateAction<Date | undefined>>
    onBack(): void
    onSlot(slot: string): void
    slot?: string
    loading: boolean
    bookings?:
      | {
          date: Date
          slot: string
        }[]
      | undefined
    products?:
      | {
          name: string
          image: string
          price: number
        }[]
      | undefined
    amount?: number
    stripeId?: string
  }

  const PortalSteps = ({
    questions,
    type,
    register,
    error,
    onNext,
    step,
    onBooking,
    date,
    onBack,
    onSlot,
    loading,
    slot,
    bookings
  }: Props) => {
    if (step == 1) {
      return (
        <QuestionsForm
          register={register}
          error={error}
          onNext={onNext}
          questions={questions}
        />
      )
    }
  
    if (step == 2 && type == 'Appointment') {
      return (
        <BookAppointmentDate
          date={date}
          bookings={bookings}
          currentSlot={slot}
          register={register}
          onBack={onBack}
          onBooking={onBooking}
          onSlot={onSlot}
          loading={loading}
        />
      )
    }

    return (
      <div className="flex flex-col items-center gap-3">
        <h2 className="font-bold text-gray-600 text-4xl">Thank You</h2>
        <p className="text-center">
          Thank you for taking the time to fill in this form. We look forward to
          <br /> speaking to you soon.
        </p>
      </div>
    )
  }
  
  export default PortalSteps