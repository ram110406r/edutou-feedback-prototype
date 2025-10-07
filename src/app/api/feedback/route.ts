import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'feedbacks.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read feedbacks from JSON file
async function readFeedbacks() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write feedbacks to JSON file
async function writeFeedbacks(feedbacks: any[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(feedbacks, null, 2));
}

// GET - List all feedbacks
export async function GET() {
  try {
    const feedbacks = await readFeedbacks();
    return NextResponse.json({ success: true, data: feedbacks });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
}

// POST - Submit new feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, rating, comment, anonymous } = body;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const feedbacks = await readFeedbacks();
    
    const newFeedback = {
      id: Date.now(),
      name: anonymous ? 'Anonymous' : (name || 'Anonymous'),
      rating: Number(rating),
      comment: comment || '',
      anonymous: Boolean(anonymous),
      created_at: new Date().toISOString(),
    };

    feedbacks.push(newFeedback);
    await writeFeedbacks(feedbacks);

    return NextResponse.json({ success: true, data: newFeedback }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}