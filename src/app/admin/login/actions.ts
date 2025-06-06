
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// IMPORTANT: In a real application, use an environment variable for the security key.
// For example, set ADMIN_KEY in your .env.local file.
const ADMIN_SECURITY_KEY = process.env.ADMIN_KEY || 'jayant pal ji'; 

export interface LoginFormState {
  message: string;
  type: 'success' | 'error';
}

export async function verifyAdminKey(
  prevState: LoginFormState | undefined,
  formData: FormData
): Promise<LoginFormState> {
  const key = formData.get('securityKey') as string;

  if (!key || key.trim() === '') {
    return { message: 'Security key cannot be empty.', type: 'error' };
  }

  if (key === ADMIN_SECURITY_KEY) {
    cookies().set({
      name: 'admin_session_active',
      value: 'true',
      httpOnly: true,
      path: '/admin', // Scope cookie to admin paths
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax', 
      secure: process.env.NODE_ENV === 'production', 
    });
    redirect('/admin'); 
  } else {
    return { message: 'Invalid security key.', type: 'error' };
  }
}

export async function logoutAdmin() {
  cookies().delete({ name: 'admin_session_active', path: '/admin' });
  redirect('/admin/login');
}
