'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import Section from '@/components/section-label'
import FormGenerator from '../form-generator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/loader'
import Accordion from '@/components/accordion'
import { useCompanyInfo } from '@/hooks/settings/use-settings'
import { CrossIcon } from 'lucide-react'

type Props = {
  id:string
}

const HelpDesk = ({id}: Props) => {
    const { register, errors, onAddCompanyInfo, isCompanyInfo, loading } =
      useCompanyInfo(id);
  return (
    <Card className="w-full grid grid-cols-1 lg:grid-cols-2">
    <CardContent className="p-6 border-r-[1px]">
      <CardTitle>Your company info</CardTitle>
      <form
        onSubmit={onAddCompanyInfo}
        className="flex flex-col gap-6 mt-10"
      >
        <div className="flex flex-col gap-3">
          <Section
            label="Company info"
            message="write what your chatbot should know about your business"
          />
          <FormGenerator
            inputType="input"
            register={register}
            errors={errors}
            form="company-info-form"
            name="companyInfo"
            placeholder="We make best cupcakes in town"
            type="text"
          />
        </div>
        <Button
          type="submit"
          className="bg-orange hover:bg-orange hover:opacity-70 transition duration-150 ease-in-out text-white font-semibold"
        >
          Add
        </Button>
      </form>
    </CardContent>
    <CardContent className="p-6 overflow-y-auto chat-window">
            <Loader loading={loading}>
              {isCompanyInfo?.length ? (
                isCompanyInfo.map((info, index) => (
                  <span>
                    <p
                    key={index}
                    className="font-bold"
                  >
                    {info}
                  </p>
                  {/* <Button onClick={onDeleteCompanyInfo(index) }><CrossIcon/></Button> */}
                  </span>
                ))
              ) : (
                <CardDescription>No Data</CardDescription>
              )}
            </Loader>
          </CardContent>
  </Card>
  )
}

export default HelpDesk