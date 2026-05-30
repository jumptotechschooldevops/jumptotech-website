import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST() {
  try {
    const bucketsToEnsure = ['student-project-images', 'student-project-documents', 'student-project-videos'];
    const results: string[] = [];

    const { data: existingBuckets, error: listError } = await supabaseAdmin.storage.listBuckets();

    if (listError) {
      console.error("Error listing buckets:", listError);
      return NextResponse.json({ error: 'Failed to list buckets' }, { status: 500 });
    }

    const existingBucketNames = existingBuckets?.map(b => b.name) || [];

    for (const bucketName of bucketsToEnsure) {
      if (!existingBucketNames.includes(bucketName)) {
        console.log(`Creating bucket: ${bucketName}`);
        const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 52428800, // 50MB
        });

        if (createError) {
          console.error(`Error creating bucket ${bucketName}:`, createError);
          results.push(`Failed to create ${bucketName}`);
        } else {
          results.push(`Created ${bucketName}`);
        }
      } else {
        results.push(`Bucket ${bucketName} already exists`);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Storage init error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
