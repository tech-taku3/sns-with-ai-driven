import { SignIn } from '@clerk/nextjs';
import { AuthLayout } from '@/components/auth';

export default function SignInPage() {
  return (
    <AuthLayout
      title="ログイン"
      subtitle="アカウントにログインしてください"
    >
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
            card: 'shadow-lg',
            headerTitle: 'text-gray-900',
            headerSubtitle: 'text-gray-600',
            socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
            formFieldInput: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
            footerActionLink: 'text-blue-600 hover:text-blue-500'
          }
        }}
        redirectUrl="/"
        signUpUrl="/sign-up"
      />
    </AuthLayout>
  );
}
