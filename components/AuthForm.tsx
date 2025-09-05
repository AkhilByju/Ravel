"use client";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createAccount } from "@/lib/supabase-actions/user.actions";
import OTPModal from "./OTPModal";
import { signInUser } from "@/lib/supabase-actions/user.actions";

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName: 
    formType === 'sign-up' 
      ? z.string().min(2).max(50) 
      : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [phase, setPhase] = useState<'email' | 'otp'>('email');

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    setAccountId(null);

    try {
      const res = 
        type === "sign-up" ? await createAccount({
        fullName: values.fullName || "",
        email: values.email 
      }) : await signInUser({email: values.email});

      if (res?.accountId === "otp-sent") {
        setPendingEmail(values.email);
        setPhase('otp');
        setAccountId('otp-sent');
        return;
      }

      setErrorMessage('Unexpected response. Please try again.');
    } catch (error) {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleOtpModalClose = () => {
    setPhase('email');
    setAccountId(null);
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">
          {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </h1>
        {type === "sign-up" && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" className="shad-input" {...field} />
                  </FormControl>
                </div>
              <FormMessage className="shad-form-message" />
            </FormItem>
          )}
        />)}
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" className="shad-input" {...field} />
                  </FormControl>
                </div>
              <FormMessage className="shad-form-message text-brand-200" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="
              w-full h-12 rounded-2xl font-bold text-white
              bg-gradient-to-r from-indigo-500 to-fuchsia-500
              shadow-lg ring-1 ring-white/20
              transition duration-300 active:scale-[.99]
              hover:from-indigo-600 hover:to-fuchsia-600
              hover:shadow-2xl hover:shadow-indigo-500/25
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
             "
          disabled={isLoading}
      >
          {type === "sign-in" ? "Sign In" : "Sign Up"}
          {isLoading && (
            <Image 
              src="/assets/icons/loader.svg"
              alt="Loading..."
              width={24}
              height={24}
              className="ml-2 animate-spin"
            />
          )}
        </Button>

        {errorMessage && (
          <p className="error-message">*{errorMessage}</p>
        )}
        <div className="flex justify-center text-sm">
          <p className="text-white/70">
            {type === "sign-in"
              ? "Don't have an account? "
              : "Already have an account? "}
          </p>
          <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
            <p className="ml-1 font-medium text-cyan-300 hover:underline">
              {type === "sign-in" ? " Sign Up" : " Sign In"}
            </p>
          </Link>
        </div>
      </form>
    </Form>
    {phase === 'otp' && accountId === 'otp-sent' && pendingEmail && <OTPModal email={form.getValues('email')} mode={type} onClose={handleOtpModalClose} />}
    </>
  )
}

export default AuthForm