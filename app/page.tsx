'use client';

import React, { useState } from 'react';
import { ArrowPathIcon, InboxIcon, ClipboardDocumentIcon, SparklesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import './globals.css';
import SummaryPage from './summary';

export default function HomePage() {
  const [transcript, setTranscript] = useState('');
  const [prompt, setPrompt] = useState('Summarize in bullet points for executives');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          setTranscript(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const generateSummary = async () => {
    if (!transcript.trim()) {
      setError('Please upload or paste a transcript.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, prompt }),
      });
      const data = await res.json();
      if (res.ok) {
        setSummary(data.summary);
      } else {
        setError(data.error || 'Failed to generate summary');
      }
    } catch {
      setError('Server error. Try again later.');
    }
    setLoading(false);
  };

  return (
    <section className="space-y-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="flex items-center justify-center text-3xl font-extrabold text-indigo-600 mb-8 gap-2">
          <SparklesIcon className="w-9 h-9 text-indigo-500 inline-" />
          AI Meeting Notes Summarizer
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateSummary();
          }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="file-upload" className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <InboxIcon className="w-5 h-5 text-indigo-500" />
              Upload Transcript (.txt)
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".txt"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-md p-3 cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="transcript-textarea" className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <ClipboardDocumentIcon className="w-5 h-5 text-indigo-500" />
              Or Paste Transcript Text
            </label>
            <textarea
              id="transcript-textarea"
              rows={8}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting notes or transcript here..."
              className="w-full p-4 border border-gray-300 rounded-md resize-y text-gray-900 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="prompt-input" className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-indigo-500" />
              Custom Instruction / Prompt
            </label>
            <input
              id="prompt-input"
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your instruction or prompt (e.g., Summarize in bullet points)"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-900 text-base shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              spellCheck={false}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-md shadow-md flex justify-center items-center gap-2 transition focus:ring-4 focus:ring-indigo-300"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Generate Summary
              </>
            )}
          </button>

          {error && (
            <p className="text-center text-red-600 font-semibold mt-2">{error}</p>
          )}
        </form>
      </div>

      {summary && (
        <SummaryPage sum={summary}/>
      )}
    </section>
  );
}
