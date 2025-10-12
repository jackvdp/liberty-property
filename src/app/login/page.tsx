import { LoginClient } from './login-client';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-liberty-base">
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-liberty-secondary/40">
        <div className="w-full max-w-2xl">
          <LoginClient />
        </div>
      </div>
      <Footer />
    </div>
  );
}
