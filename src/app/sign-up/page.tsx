import { SignUp } from '@clerk/nextjs';
import { AuthLayout } from '@/components/auth';

export default function SignUpPage() {
  return (
    <AuthLayout
      title="アカウントを作成"
      subtitle="新しいアカウントを作成して始めましょう"
    >
      <SignUp 
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
        signInUrl="/sign-in"
      />
    </AuthLayout>
  );
}
