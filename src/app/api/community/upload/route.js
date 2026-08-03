import { NextResponse } from 'next/server';
import { uploadImageToCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const userId = formData.get('userId');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isVideo = file.type.startsWith('video/');
    const folder = isVideo ? 'taranggoa/community/videos' : 'taranggoa/community/posts';
    const publicId = isVideo ? `comm_vid_${Date.now()}` : `comm_img_${Date.now()}`;

    const result = await uploadImageToCloudinary(buffer, folder, publicId);

    return NextResponse.json({ 
      url: `${result.secure_url}?v=${Date.now()}`,
      resource_type: result.resource_type || (isVideo ? 'video' : 'image')
    });
  } catch (error) {
    console.error('Community Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}