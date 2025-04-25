import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, readFile } from 'fs/promises';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'work.json');

export async function GET() {
  try {
    const data = await readFile(DATA_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(request) {
  try {
    const project = await request.json();
    
    let projects = [];
    try {
      const data = await readFile(DATA_FILE, 'utf8');
      projects = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet
    }
    
    const newProject = {
      id: Date.now().toString(),
      ...project,
      createdAt: new Date().toISOString()
    };
    
    projects.push(newProject);
    await writeFile(DATA_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json(newProject);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();
    
    const data = await readFile(DATA_FILE, 'utf8');
    let projects = JSON.parse(data);
    
    projects = projects.map(project => 
      project.id === id ? { ...project, ...updates } : project
    );
    
    await writeFile(DATA_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    const data = await readFile(DATA_FILE, 'utf8');
    let projects = JSON.parse(data);
    
    projects = projects.filter(project => project.id !== id);
    
    await writeFile(DATA_FILE, JSON.stringify(projects, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}