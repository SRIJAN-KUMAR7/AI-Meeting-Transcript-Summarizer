import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db'; 

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: 'Transcript text is required' },
        { status: 400 }
      );
    }

    const insertQuery = `
      INSERT INTO transcripts (text, created_at)
      VALUES ($1, NOW())
      RETURNING id, created_at
    `;
    const values = [text];
    const result = await pool.query(insertQuery, values);
    return NextResponse.json({
      id: result.rows[0].id,
      createdAt: result.rows,
      message: 'Transcript saved successfully'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to save transcript' },
      { status: 500 }
    );
  }
}
