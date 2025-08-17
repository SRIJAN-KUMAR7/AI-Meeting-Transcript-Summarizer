
import React from 'react';
import './globals.css';
export const metadata = {
  title: 'AI Meeting Notes Summarizer',
  description: 'Upload, summarize, edit, and share your meeting notes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-white shadow p-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-indigo-600 cursor-default">
            AI Meeting Notes Summarizer
          </h1>
        </header>
        <main className="flex-grow container mx-auto p-6 max-w-4xl">
          {children}
        </main>
        <footer className="bg-white shadow p-4 text-center text-sm text-gray-500">
          &copy; 2025 AI Notes Summarizer
        </footer>
      </body>
    </html>
  );
}
