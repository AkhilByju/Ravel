import { supabaseBrowser } from "../supabase/browser";
import { avatarPlaceholderUrl } from "@/constants";
import { supabaseServer } from "../supabase/server";

type CreateAccountParams = { fullName: string; email: string };

export const createAccount = async ({ fullName, email }: CreateAccountParams) => {
    const sb = supabaseBrowser();

    const { data, error } = await sb.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
            shouldCreateUser: true,
            data: { 
                full_name: fullName,
                avatar: avatarPlaceholderUrl
            }
        }
    });

    if (error) throw error;

    return { accountId: 'otp-sent' as const };
}

export const signInUser = async ({ email }: { email: string }) => {
    const sb = supabaseBrowser();

    const { error } = await sb.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
            shouldCreateUser: false,
        }
    });

    if (error) {
        if (error.message === 'No user found') {
            throw new Error('No user found with this email. Please sign up first.');
        }
        throw error;
    }

    return { accountId: 'otp-sent' as const };
}

export const verifyEmailOTP = async ({ email, otp }: { email: string; otp: string }) => {
    const sb = supabaseBrowser();

    const { data, error } = await sb.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otp,
        type: 'email',
    });
    if (error) throw error;

    return { accountId: data.session?.user.id ?? null, session: data.session };
}

export const sendEmailOTP = async ({
  email,
  mode,
  fullName,
}: {
  email: string;
  mode: "sign-in" | "sign-up";
  fullName?: string;
}) => {
  const sb = supabaseBrowser();
  const shouldCreateUser = mode === "sign-up";

  const { error } = await sb.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      shouldCreateUser,
      ...(shouldCreateUser
        ? { data: { full_name: fullName ?? "", avatar: avatarPlaceholderUrl } }
        : {}),
    },
  });
  if (error) throw error;
  return { accountId: "otp-sent" as const };
};

export const getCurrentUser = async () => {
    const sb = await supabaseServer();

    const { data, error } = await sb.auth.getUser();
    if (error) throw error;
    if (!data.user) throw new Error("User not authenticated");

    return data.user;
};