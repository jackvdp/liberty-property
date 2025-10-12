import { LoginClient } from './login-client';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

type SearchParams = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: SearchParams) {
  const params = await (searchParams || Promise.resolve({}));
  const error = params.error;

  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-liberty-secondary/40">
        <div className="w-full max-w-2xl">
          <LoginClient initialError={error} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
