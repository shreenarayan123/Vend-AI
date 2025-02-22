'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "../use-toast";
import { useSignUp } from '@clerk/nextjs';
import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onCompleteUserRegistration } from "@/actions/auth";

    
    export const useSignupForm = ()=>{
        const { toast } = useToast();
        const router = useRouter();
        const [ loading , setLoading] = useState<boolean>(false);
        const { signUp, isLoaded, setActive} = useSignUp();

        
        const methods = useForm({
            resolver:zodResolver(UserRegistrationSchema),
            defaultValues: {
                type: 'owner',
                fullname: '',
                email: '',
                confirmEmail: '',
                password: '',
                confirmPassword: '',
                otp: '',
              },
            mode:'onChange'
        })

        const onGenerateOtp = async (
            email:string,
            password:string,
            onNext:React.Dispatch<React.SetStateAction<number>>
        )=>{
            if(!isLoaded) return
            try {
                await signUp.create({
                    emailAddress:email,
                    password:password
                })
            await signUp.prepareEmailAddressVerification({strategy:'email_code'});
            onNext((prev)=> prev + 1 )
            } catch (error:any) {
                toast({
                    title:'Error',
                    description:error.errors[0].LongMessage,

                })
            }
        }

        const onHandleSubmit = methods.handleSubmit(
            async (values: UserRegistrationProps) => {
              
              if (!isLoaded) return
             
              try {
                setLoading(true)
                const completeSignUp = await signUp.attemptEmailAddressVerification({
                  code: values.otp,
                })
                
        
                if (completeSignUp.status !== 'complete') {
                  
                  return { message: 'Something went wrong!' }
                  
                }
        
                if (completeSignUp.status == 'complete') {
                  if (!signUp.createdUserId) return
                  
                  const registered = await onCompleteUserRegistration(
                    values.fullname,
                    signUp.createdUserId,
                    values.type
                  )
        
                  if (registered?.status == 200 && registered.user) {
                    await setActive({
                      session: completeSignUp.createdSessionId,
                    })
        
                    setLoading(false)
                    router.push('/dashboard')
                  }
        
                  if (registered?.status == 400) {
                    toast({
                      title: 'Error',
                      description: 'Something went wrong!',
                    })
                  }
                }
              } catch (error: any) {
                toast({
                  title: 'Error',
                  description: error.errors[0].longMessage,
                })
              }
            }
          )

          return {
            methods,
            onHandleSubmit,
            onGenerateOtp,
            loading,
          }

    }