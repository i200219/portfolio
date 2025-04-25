import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile, readFile } from 'fs/promises';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'services.json');

export async function GET() {
  try {
    const data = await readFile(DATA_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ services: [] });
  }
}

export async function POST(request) {
  try {
    const service = await request.json();
    
    // Read existing services
    let services = [];
    try {
      const data = await readFile(DATA_FILE, 'utf8');
      services = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet
    }
    
    // Add new service with ID
    const newService = {
      id: Date.now().toString(),
      ...service,
      createdAt: new Date().toISOString()
    };
    
    services.push(newService);
    
    // Save updated services
    await writeFile(DATA_FILE, JSON.stringify(services, null, 2));
    
    return NextResponse.json(newService);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, ...updates } = await request.json();
    
    // Read existing services
    const data = await readFile(DATA_FILE, 'utf8');
    let services = JSON.parse(data);
    
    // Update service
    services = services.map(service => 
      service.id === id ? { ...service, ...updates } : service
    );
    
    // Save updated services
    await writeFile(DATA_FILE, JSON.stringify(services, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    
    // Read existing services
    const data = await readFile(DATA_FILE, 'utf8');
    let services = JSON.parse(data);
    
    // Remove service
    services = services.filter(service => service.id !== id);
    
    // Save updated services
    await writeFile(DATA_FILE, JSON.stringify(services, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}