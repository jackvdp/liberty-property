'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { signInWithMagicLink } from '@/lib/actions/auth.actions';

export function LoginClient() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Call the server action to send magic link
      const result = await signInWithMagicLink(email);

      if (result.success) {
        setSuccessMessage(
          `Check your email! We've sent a magic link to ${email}. Click the link in your email to log in.`
        );
        setEmail(''); // Clear the email input on success
      } else {
        setErrorMessage(result.error || 'Failed to send magic link. Please try again.');
      }
    } catch (error) {
      console.error('Error in magic link flow:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
                Enter your email and we'll send you a magic link to log in
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-8">
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

              {/* Submit Button */}
              <div className="text-center space-y-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="xl"
                  className="w-full bg-liberty-primary hover:bg-liberty-primary/90 text-liberty-base group"
                >
                  {isLoading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Magic Link
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
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
