import { NextResponse } from 'next/server';
import { writeFile, mkdir, readFile, unlink } from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
  }
}

// Get the current CV
export async function GET() {
  try {
    const cvInfoPath = path.join(UPLOAD_DIR, 'cv-info.json');
    
    try {
      const data = await readFile(cvInfoPath, 'utf8');
      const cvInfo = JSON.parse(data);
      return NextResponse.json(cvInfo);
    } catch (error) {
      // If file doesn't exist or can't be read, return empty info
      return NextResponse.json({ filename: null, uploadDate: null });
    }
  } catch (error) {
    console.error('Error getting CV info:', error);
    return NextResponse.json(
      { error: 'Failed to get CV information' },
      { status: 500 }
    );
  }
}

// Upload a new CV
export async function POST(request) {
  try {
    await ensureUploadDir();
    
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and Word documents are allowed.' },
        { status: 400 }
      );
    }
    
    // Get file extension
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    // Create a unique filename
    const filename = `cv-${Date.now()}.${fileExt}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    
    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);
    
    // Save CV info
    const cvInfo = {
      filename,
      originalName: file.name,
      uploadDate: new Date().toISOString(),
      path: `/uploads/${filename}`
    };
    
    await writeFile(
      path.join(UPLOAD_DIR, 'cv-info.json'),
      JSON.stringify(cvInfo, null, 2)
    );
    
    return NextResponse.json(cvInfo);
  } catch (error) {
    console.error('Error uploading CV:', error);
    return NextResponse.json(
      { error: 'Failed to upload CV' },
      { status: 500 }
    );
  }
}

// Delete the current CV
export async function DELETE() {
  try {
    const cvInfoPath = path.join(UPLOAD_DIR, 'cv-info.json');
    
    // Read the current CV info
    let cvInfo;
    try {
      const data = await readFile(cvInfoPath, 'utf8');
      cvInfo = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or can't be read, return success (nothing to delete)
      return NextResponse.json({ success: true, message: 'No CV found to delete' });
    }
    
    // Delete the CV file if it exists
    if (cvInfo && cvInfo.filename) {
      const filePath = path.join(UPLOAD_DIR, cvInfo.filename);
      try {
        await unlink(filePath);
      } catch (fileError) {
        console.error('Error deleting CV file:', fileError);
        // Continue even if file deletion fails
      }
    }
    
    // Delete the CV info file
    try {
      await unlink(cvInfoPath);
    } catch (infoError) {
      console.error('Error deleting CV info file:', infoError);
      // Continue even if info deletion fails
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'CV deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting CV:', error);
    return NextResponse.json(
      { error: 'Failed to delete CV' },
      { status: 500 }
    );
  }
}