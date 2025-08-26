import React from 'react';
import Image from 'next/image';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { set } from 'zod';
import { Button } from './ui/button';

const OTPModal = ({ accountId, email }: { accountId: string; email: string }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {

        } catch (error) {
            console.log("Failed to verify OTP", error);
        }

        setIsLoading(false);
    };

    const handleResendOTP = async () => {
        // Resend OTP
    }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader className='relative flex justify-center'>
          <AlertDialogTitle className='h2 text-center'>Enter OTP</AlertDialogTitle>
          <Image
            src='/assets/icons/close-dark.svg'
            alt='close'
            width={20}
            height={20}
            onClick={() => setIsOpen(false)}
            className='otp-close-button'
          />
          <AlertDialogDescription className='subtitle-2 text-center text-light-100'>
            We've sent a code to <span className='pl-1 text-brand-300'>{ email }</span>
      </AlertDialogDescription>
    </AlertDialogHeader>

<InputOTP maxLength={6} value={password} onChange={setPassword}>
  <InputOTPGroup className='shad-otp'>
    <InputOTPSlot index={0} className='shad-otp-slot'/>
    <InputOTPSlot index={1} className='shad-otp-slot'/>
    <InputOTPSlot index={2} className='shad-otp-slot'/>
    <InputOTPSlot index={3} className='shad-otp-slot'/>
    <InputOTPSlot index={4} className='shad-otp-slot'/>
    <InputOTPSlot index={5} className='shad-otp-slot'/>
  </InputOTPGroup>
</InputOTP>

    <AlertDialogFooter>
        <div className='flex w-full flex-col gap-4'>
            <AlertDialogAction 
            onClick={handleSubmit}
            className="w-full rounded-2xl px-4 py-3 text-white shadow-lg
             transition-colors duration-300 active:scale-[.99]
             bg-gradient-to-r from-indigo-500 to-fuchsia-500
             hover:from-indigo-600 hover:to-fuchsia-600
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 
             hover:shadow-2xl hover:shadow-indigo-500/25"
            type="button"
          >
            Submit
            {isLoading && <Image
              src='/assets/icons/loader.svg'
              alt='loader'
              width={24}
              height={24}
              className='ml-2 animate-spin'
            />}
          </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-center text-light-100">
                Didn't receive a code?
                <Button type="button" variant="link" onClick={handleResendOTP} className='pl-1 text-brand-300'>
                    Click to Resend OTP
                </Button>
            </div>

        </div>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default OTPModal;