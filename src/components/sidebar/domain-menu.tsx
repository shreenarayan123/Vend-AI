import { useDomain } from '@/hooks/sidebar/use-domain'
import { cn } from '@/lib/utils'
import React from 'react'
import AppDrawer from '../drawer'
import { Plus } from 'lucide-react'
import { Loader } from '../loader'
import FormGenerator from '../forms/form-generator'
import UploadButton from '../upload-button'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  min?: boolean
  domains:
    | {
        id: string
        name: string
        icon: string | null
      }[]
    | null
    | undefined
}

const DomainMenu = ({min, domains}: Props) => {
  const { register, onAddDomain,loading ,errors, isDomain  } = useDomain()
  
  return (
    <div>
      <div>
        {!min  && <p>DOMAINS</p> }
        <AppDrawer
          description="add in your domain address to integrate your chatbot"
          title="Add your business domain"
          onOpen={
            <div className="cursor-pointer text-gray-500 rounded-full border-2">
              <Plus />
            </div>
          }
        >
          <Loader loading={loading}>
          <form
              className="mt-3 w-6/12 flex flex-col gap-3"
              onSubmit={onAddDomain}
            >
              <FormGenerator
                inputType="input"
                register={register}
                label="Domain"
                name="domain"
                errors={errors}
                placeholder="mydomain.com"
                type="text"
              />
              <UploadButton
                register={register}
                label="Upload Icon"
                errors={errors}
              />
              <Button
                type="submit"
                className="w-full"
              >
                Add Domain
              </Button>
            </form>
          </Loader>
        </AppDrawer>
      </div>
      <div>
        { domains &&
         domains.map((domain, key)=>(
          <Link
          href={`/settings/${domain.name.split('.')[0]}`}
          key={domain.id}
          className={cn(
            'flex items-center gap-2 px-1 py-2 rounded-lg my-1',
          !min ? 'p-2': 'py-2', 
          domain.name.split('.')[0] == isDomain && 'bg-white'
        )}
          >
            <Image
            src={`https://ucarecdn.com/${domain.icon}/`}
            alt='logo'
            width={20}
            height={20}            
            />
            {!min && <p className='text-sm' >{domain.name}</p> }
          </Link>
         ))
         }
      </div>
    </div>
  )
}

export default DomainMenu