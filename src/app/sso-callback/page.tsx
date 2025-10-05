import { redirect } from 'next/navigation';

export default function SSOCallbackPage() {
  // Clerk will handle the SSO callback automatically
  // This page serves as a fallback redirect
  redirect('/');
}
