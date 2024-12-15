'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

interface FormData {
  email: string;
  password: string;
}

export async function signup(formData: FormData) {
  console.log('This is form data', formData);
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp(formData);

  if (error) {
    console.log('error', error);
    return { error: true };
  }

  console.log(data);

  revalidatePath('/', 'layout');
  redirect('/');
}
