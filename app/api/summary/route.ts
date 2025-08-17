import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { transcript, prompt } = await req.json();
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY!}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful meeting notes summarizer.' },
          { role: 'user', content: `${prompt}\n\n${transcript}` }
        ],
        max_tokens: 1024,
      }),
    });

    const groqData = await groqRes.json();
    console.log('Groq response:', JSON.stringify(groqData, null, 2)); 

    if (
      !groqRes.ok ||
      !groqData.choices ||
      !Array.isArray(groqData.choices) ||
      !groqData.choices[0]?.message?.content
    ) {
      throw new Error(groqData.error?.message || 'No summary generated');
    }

    const summary = groqData.choices[0].message.content;

    const insertQuery = `
      INSERT INTO summaries (prompt, summary, transcript, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, summary
    `;
    const values = [prompt, summary, transcript];
    const result = await pool.query(insertQuery, values);
    const dbSummary = result.rows[0];
    return NextResponse.json({
      summary: dbSummary.summary,
      id: dbSummary.id,
    });
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { error: err.message || 'AI summary failed' },
      { status: 500 },
      
    );
  }
}
