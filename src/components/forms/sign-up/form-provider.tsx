import { AuthContextProvider } from '@/context/use-auth-context';
import { UseSignupForm } from '@/hooks/sign-up/use-sign-up';
import React from 'react'
import { FormProvider } from 'react-hook-form';
type Props = {
    children :React.ReactNode

}

const SignUpFormProvider = ({children}:Props)=>{
  const { methods, loading , onHandleSubmit} = UseSignupForm();

  return(
    <AuthContextProvider>
      <FormProvider{...methods} >
        <form onSubmit={onHandleSubmit} className='h-full'>
          <div className='flex flex-col h--full gap-3 justify-between'>
            <Loader loading={loading}>
              {children}
            </Loader>

          </div>


        </form>
      </FormProvider>
    </AuthContextProvider>
  )
}

export default SignUpFormProvider