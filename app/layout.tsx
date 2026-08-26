import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ variable: '--font-jetbrains-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lucid Analytics — Executive Overview',
  description: 'Real-time performance metrics for your ecosystem.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${dmSans.variable} ${jetBrainsMono.variable}`}>{children}</body></html>;
}
