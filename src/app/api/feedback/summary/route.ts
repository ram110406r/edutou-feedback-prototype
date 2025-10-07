import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'feedbacks.json');

async function readFeedbacks() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET - Return analytics summary
export async function GET() {
  try {
    const feedbacks = await readFeedbacks();
    
    const totalFeedbacks = feedbacks.length;
    const averageRating = totalFeedbacks > 0
      ? feedbacks.reduce((sum: number, f: any) => sum + f.rating, 0) / totalFeedbacks
      : 0;
    
    // Rating distribution
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: feedbacks.filter((f: any) => f.rating === rating).length,
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalFeedbacks,
        averageRating: Number(averageRating.toFixed(2)),
        ratingDistribution,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch summary' },
      { status: 500 }
    );
  }
}