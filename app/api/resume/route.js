import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, readFile } from 'fs/promises';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'resume.json');

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');
    
    const data = await readFile(DATA_FILE, 'utf8');
    const entries = JSON.parse(data);
    
    if (section) {
      return NextResponse.json({
        entries: entries.filter(entry => entry.section === section)
      });
    }
    
    return NextResponse.json({ entries });
  } catch (error) {
    return NextResponse.json({ entries: [] });
  }
}

export async function POST(request) {
  try {
    const entry = await request.json();
    
    let entries = [];
    try {
      const data = await readFile(DATA_FILE, 'utf8');
      entries = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet
    }
    
    const newEntry = {
      id: Date.now().toString(),
      ...entry,
      createdAt: new Date().toISOString()
    };
    
    entries.push(newEntry);
    await writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
    
    return NextResponse.json(newEntry);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create entry' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();
    
    const data = await readFile(DATA_FILE, 'utf8');
    let entries = JSON.parse(data);
    
    entries = entries.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    );
    
    await writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    const data = await readFile(DATA_FILE, 'utf8');
    let entries = JSON.parse(data);
    
    entries = entries.filter(entry => entry.id !== id);
    
    await writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete entry' },
      { status: 500 }
    );
  }
}