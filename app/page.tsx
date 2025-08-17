// 'use client';

// import React, { useState } from 'react';
// import './globals.css'


// export default function HomePage() {
//   const [transcript, setTranscript] = useState('');
//   const [prompt, setPrompt] = useState('Summarize in bullet points for executives');
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState('');
//   const [error, setError] = useState('');
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setError('');
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const text = event.target?.result;
//         if (typeof text === 'string') {
//           setTranscript(text);
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   const generateSummary = async () => {
//     if (!transcript.trim()) {
//       setError('Please upload or paste a transcript.');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     try {
//       const res = await fetch('/api/summarize', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ transcript, prompt }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setSummary(data.summary);
//       } else {
//         setError(data.error || 'Failed to generate summary');
//       }
//     } catch (err) {
//       setError('Server error. Try again later.');
//     }
//     setLoading(false);
//   };

//   return (
//     // <section className="space-y-8 bg-red-500">
//     //   <div>
//     //     <label className="block text-sm font-medium mb-1" htmlFor="file-upload">
//     //       Upload Transcript (.txt)
//     //     </label>
//     //     <input
//     //       type="file"
//     //       id="file-upload"
//     //       accept=".txt"
//     //       onChange={handleFileChange}
//     //       className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2 cursor-pointer"
//     //     />
//     //   </div>

//     //   <div>
//     //     <label className="block text-sm font-medium mb-1" htmlFor="transcript-textarea">
//     //       Or Paste Transcript Text
//     //     </label>
//     //     <textarea
//     //       id="transcript-textarea"
//     //       rows={8}
//     //       value={transcript}
//     //       onChange={(e) => setTranscript(e.target.value)}
//     //       className="w-full p-3 border border-gray-300 rounded resize-y"
//     //       placeholder="Paste your meeting notes or transcript here..."
//     //     ></textarea>
//     //   </div>

//     //   <div>
//     //     <label className="block text-sm font-medium mb-1" htmlFor="prompt-input">
//     //       Custom Instruction/Prompt
//     //     </label>
//     //     <input
//     //       id="prompt-input"
//     //       type="text"
//     //       value={prompt}
//     //       onChange={(e) => setPrompt(e.target.value)}
//     //       className="w-full p-3 border border-gray-300 rounded"
//     //       placeholder="Enter your instruction or prompt (e.g., Summarize in bullet points)"
//     //     />
//     //   </div>

//     //   <button
//     //     onClick={generateSummary}
//     //     disabled={loading}
//     //     className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition disabled:opacity-50"
//     //   >
//     //     {loading ? 'Generating...' : 'Generate Summary'}
//     //   </button>

//     //   {error && (
//     //     <p className="text-red-600 font-semibold mt-2 text-center">{error}</p>
//     //   )}

//     //   {summary && (
//     //     <div className="mt-8">
//     //       <h2 className="text-xl font-bold mb-2">Generated Summary</h2>
//     //       <textarea
//     //         value={summary}
//     //         onChange={(e) => setSummary(e.target.value)}
//     //         rows={10}
//     //         className="w-full p-4 border border-gray-300 rounded font-mono whitespace-pre-wrap"
//     //       ></textarea>
//     //     </div>
//     //   )}
//     // </section>
//     <div className='bg-red-600'>
//       HI there
//     </div>
//   );
// }
export default function Page() {
  return (
    <div className="bg-indigo-600 text-white p-6 rounded-lg text-center font-bold text-xl">
      Tailwind CSS is working!
    </div>
  );
}
