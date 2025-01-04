import { useRouter } from "next/router";
import { useState } from "react";
import { useToast } from "../use-toast";
import { useSignUp } from '@clerk/nextjs';
import { Resolver } from "dns";
import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onCompleteRegistration } from "@/actions/auth";

    
    export const UseSignupForm = ()=>{
        const { toast } = useToast();
        const router = useRouter();
        const [ loading , setLoading] = useState<boolean>();
        const { signUp, isLoaded, setActive} = useSignUp();
        const methods = useForm({
            resolver:zodResolver(UserRegistrationSchema),
            defaultValues:{
                type:'owner'
            },
            mode:'onChange'
        })

        const onGenereateOtp = async (
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

        const onHandleSubmit = async (values:UserRegistrationProps)=>{
            if(!isLoaded) return
            try {
                setLoading(true);
                const completeSignUp = await signUp.attemptEmailAddressVerification({code:values.otp});
                if(completeSignUp.status !== 'complete'){
                    return { message:'Something went wrong'}
                }
                if(completeSignUp.status == 'complete'){
                    if(!signUp.createdUserId) return

                    const registered = await onCompleteRegistration(
                        values.fullname,
                        signUp.createdUserId,
                        values.type
                    )

                    if(registered?.status == 200 && registered.user){
                        await setActive({
                            session:completeSignUp.createdSessionId,
                        })

                        setLoading(false);
                        router.push('/dashboard')
                    }
                    if(registered?.status == 400){
                        toast({
                            title:"Error",
                            description:'Something went wrong'
                        })
                    }
                }
            } catch (error:any) {
                toast({
                    title:'Error',
                    description:error.errors[0].longMessage,
                })
                
            }

        }

        return {
            methods, onGenereateOtp, onHandleSubmit, loading
        }

    }