'use client';

import React, { useState } from 'react';
import { PaperAirplaneIcon, PencilSquareIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function SummaryPage() {
  const [summary, setSummary] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const localSummary = localStorage.getItem('summary');
    if (localSummary) setSummary(localSummary);
  }, []);

  const handleSend = async () => {
    if (!email || !summary) {
      setError('Provide both a summary & email address.');
      return;
    }
    setSending(true);
    setError('');
    setSent(false);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary, email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSent(true);
        setError('');
      } else {
        setError(data.error || 'Failed to send email');
      }
    } catch {
      setError('Server error sending email!');
    }
    setSending(false);
  };

  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold text-indigo-600 mb-8">
        <SparklesIcon className="w-7 h-7 text-indigo-500" />
        Edit & Share Summary
      </h1>
      <label className="block text-base font-semibold mb-2" htmlFor="summary-edit">
        Edit Your Summary
        <PencilSquareIcon className="w-5 h-5 inline text-indigo-400 ml-2" />
      </label>
      <textarea
        id="summary-edit"
        rows={10}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full mb-6 p-4 border border-gray-300 rounded-md font-mono resize-y shadow focus:ring-2 focus:ring-indigo-500"
      />
      <div className="my-6 flex items-center gap-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Recipient email (e.g., team@company.com)"
          className="flex-1 p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          disabled={sending || !summary || !email}
          onClick={handleSend}
          className="inline-flex gap-2 items-center bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-5 py-3 rounded-md disabled:opacity-60 transition-all"
        >
          <PaperAirplaneIcon className={`w-5 h-5 ${sending ? "animate-spin" : ""}`} />
          {sending ? 'Sending...' : 'Send Email'}
        </button>
      </div>
      {sent && <div className="text-green-600 font-medium mb-2">Summary sent successfully!</div>}
      {error && <div className="text-red-600 font-medium mb-2">{error}</div>}
    </main>
  );
}
