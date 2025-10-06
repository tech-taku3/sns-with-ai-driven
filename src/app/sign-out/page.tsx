'use client';

import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth';

export default function SignOutPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <AuthLayout
      title="ログアウト"
      subtitle="アカウントからログアウトしますか？"
    >
      <div className="space-y-4">
        <p className="text-center text-gray-600">
          ログアウトすると、アカウントにアクセスするには再度ログインする必要があります。
        </p>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white w-full py-2 px-4 rounded-md transition-colors"
        >
          ログアウト
        </button>
      </div>
    </AuthLayout>
  );
}
