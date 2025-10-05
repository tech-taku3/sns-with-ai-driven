import { SignOutButton } from '@clerk/nextjs';
import { AuthLayout } from '@/components/auth';

export default function SignOutPage() {
  return (
    <AuthLayout
      title="ログアウト"
      subtitle="アカウントからログアウトしますか？"
    >
      <div className="space-y-4">
        <p className="text-center text-gray-600">
          ログアウトすると、アカウントにアクセスするには再度ログインする必要があります。
        </p>
        <SignOutButton 
          redirectUrl="/"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-red-600 hover:bg-red-700 text-white w-full',
            }
          }}
        />
      </div>
    </AuthLayout>
  );
}
