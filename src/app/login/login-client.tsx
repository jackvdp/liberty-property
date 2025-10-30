'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Link from 'next/link';
import { ArrowRight, Mail, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSupabaseBrowser } from '@/lib/db/supabase/client';
import { useRouter } from 'next/navigation';

type LoginStep = 'email' | 'otp';

export function LoginClient({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(initialError || '');

  // Clear initial error after a few seconds
  useEffect(() => {
    if (initialError) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [initialError]);

  // Auto-submit OTP when 6 digits are entered
  useEffect(() => {
    if (otp.length === 6 && step === 'otp') {
      handleVerifyOtp();
    }
  }, [otp, step]);

  const handleSendOtp = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const supabase = getSupabaseBrowser();
      
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
        }
      });

      if (error) {
        console.error('OTP send error:', error);
        
        if (error.message?.includes('User not found') || 
            error.message?.includes('Invalid login credentials')) {
          setErrorMessage('No account found with this email. Please register first.');
        } else if (error.message?.includes('rate limit')) {
          setErrorMessage('Too many requests. Please wait a moment and try again.');
        } else {
          setErrorMessage(error.message || 'Unable to send login code. Please try again.');
        }
      } else {
        setStep('otp');
        setSuccessMessage(`We've sent a 6-digit code to ${email}`);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    setErrorMessage('');

    try {
      const supabase = getSupabaseBrowser();
      
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'email',
      });

      if (error) {
        console.error('OTP verification error:', error);
        
        if (error.message?.includes('Token has expired')) {
          setErrorMessage('This code has expired. Please request a new one.');
        } else if (error.message?.includes('Invalid') || error.message?.includes('Token')) {
          setErrorMessage('Invalid code. Please check and try again.');
        } else {
          setErrorMessage(error.message || 'Verification failed. Please try again.');
        }
        setOtp(''); // Clear OTP on error
      } else if (data.session) {
        // Successfully logged in
        setSuccessMessage('Login successful! Redirecting...');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setOtp('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="bg-liberty-base shadow-xl border-0">
          <CardContent className="p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl lg:text-5xl font-reckless font-bold text-liberty-background mb-3">
                Welcome Back
              </h1>
              <p className="text-lg text-liberty-background/60">
                {step === 'email' 
                  ? "Enter your email to receive a login code"
                  : "Enter the 6-digit code sent to your email"
                }
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-8">
              <AnimatePresence mode="wait">
                {step === 'email' ? (
                  <motion.form
                    key="email-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSendOtp}
                    className="space-y-8"
                  >
                    {/* Email Input */}
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-0 top-4 text-liberty-background/40" size={20} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="w-full pl-8 pr-0 py-4 border-0 border-b-2 border-liberty-secondary/30 focus:border-liberty-accent focus:outline-none transition-colors bg-transparent placeholder:text-liberty-background/40 text-lg disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center space-y-6">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        size="xl"
                        className="w-full bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base group"
                      >
                        {isLoading ? (
                          'Sending Code...'
                        ) : (
                          <>
                            Send Login Code
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>

                      {/* Register Link */}
                      <p className="text-liberty-background/60">
                        Don&apos;t have an account?{' '}
                        <Link
                          href="/register"
                          className="text-liberty-accent hover:text-liberty-accent/80 font-medium underline underline-offset-4 transition-colors"
                        >
                          Register here
                        </Link>
                      </p>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="otp-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* OTP Input */}
                    <div className="flex flex-col items-center space-y-4">
                      <p className="text-sm text-liberty-background/60 text-center">
                        Code sent to <span className="font-medium text-liberty-background">{email}</span>
                      </p>
                      
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                        disabled={isLoading}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>

                      <p className="text-xs text-liberty-background/50 text-center">
                        Code expires in 60 seconds
                      </p>
                    </div>

                    {/* Back Button */}
                    <div className="text-center space-y-4">
                      <Button
                        type="button"
                        onClick={handleBackToEmail}
                        disabled={isLoading}
                        variant="outline"
                        size="lg"
                        className="w-full group"
                      >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Use a different email
                      </Button>

                      <button
                        type="button"
                        onClick={() => handleSendOtp()}
                        disabled={isLoading}
                        className="text-sm text-liberty-accent hover:text-liberty-accent/80 font-medium underline underline-offset-4 transition-colors disabled:opacity-50"
                      >
                        Didn&apos;t receive a code? Resend
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Alert variant="success">
                    <AlertDescription className="text-center">
                      {successMessage}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Alert variant="destructive">
                    <AlertDescription className="text-center">
                      {errorMessage}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
