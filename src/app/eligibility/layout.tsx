import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eligibility Check | Liberty Bell',
  description: 'Determine if your building qualifies for Right to Manage or Collective Enfranchisement with our quick eligibility checker.',
};

export default function EligibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
