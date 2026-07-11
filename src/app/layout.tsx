import type { Metadata } from 'next';
import { Geist, Geist_Mono, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import Cursor from '@/components/desktop/Cursor';
import { WindowManagerProvider } from '@/contexts/WindowManager';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mac',
  description: 'MacOS Portfolio Landing Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        'font-sans',
        inter.variable
      )}>
      <body className="min-h-full flex flex-col">
        <WindowManagerProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
            {children}
          </ThemeProvider>
          <Toaster position='top-right' />
        </WindowManagerProvider>
      </body>
    </html>
  );
}
