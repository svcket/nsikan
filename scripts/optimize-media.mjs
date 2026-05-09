import { createClient } from '@sanity/client';
import { execSync } from 'child_process';
import fs from 'fs';
import https from 'https';
import sharp from 'sharp';

const client = createClient({
  projectId: '4y8gx2fx',
  dataset: 'production',
  useCdn: false,
  token: 'skeHiU1gu5r53PcROLq4tZWUq4s3QA9XAMSpgFayoijjjKg0my2GbX4kXlghQzqy54HaqLR4v4B7vHCR4RuhEuBqXzykD9EHbCMqjks8o61SFfLnSuUijQuMWHCyrWvudgXGVJm0zV978GTJHxSzk73yVWBWxIzEpNsVRX4nsw0v5QDgnChV',
  apiVersion: '2024-05-04',
});

const DOWNLOAD_DIR = './temp_assets';
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR);

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function updateReferences(oldId, newId) {
  const query = `*[references($id)]`;
  const docs = await client.fetch(query, { id: oldId });
  
  for (const doc of docs) {
    console.log(`   🔄 Updating references in document: ${doc._id}`);
    const docStr = JSON.stringify(doc).split(oldId).join(newId);
    const updatedDoc = JSON.parse(docStr);
    await client.createOrReplace(updatedDoc);
  }
}

async function processAssets() {
  console.log('🚀 Starting Media Optimization Cleanup...\n');

  // Query for large images (> 5MB) and any videos
  const query = `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && size > 5000000] {
    _id,
    _type,
    "name": originalFilename,
    url,
    size,
    mimeType
  } | order(size desc)`;

  const assets = await client.fetch(query);
  console.log(`📦 Found ${assets.length} assets to optimize.\n`);

  for (const asset of assets) {
    const isVideo = asset.mimeType.startsWith('video/');
    const sizeMB = (asset.size / (1024 * 1024)).toFixed(2);
    console.log(`🛠️ Processing: ${asset.name} (${sizeMB} MB)`);

    const inputPath = `${DOWNLOAD_DIR}/in_${asset._id}`;
    const outputPath = `${DOWNLOAD_DIR}/out_${asset._id}${isVideo ? '.mp4' : '.webp'}`;

    try {
      // 1. Download
      await downloadFile(asset.url, inputPath);

      // 2. Optimize
      if (isVideo) {
        console.log('   📹 Compressing video with FFmpeg...');
        execSync(`ffmpeg -i ${inputPath} -vcodec libx264 -crf 28 -preset faster -vf "scale='min(1920,iw)':-2" -pix_fmt yuv420p -acodec aac -movflags +faststart ${outputPath} -y`);
      } else {
        console.log('   🖼️ Compressing image with Sharp...');
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
      }

      // 3. Upload new asset
      console.log('   ⬆️ Uploading optimized version...');
      const uploadType = isVideo ? 'file' : 'image';
      const newAsset = await client.assets.upload(uploadType, fs.createReadStream(outputPath), {
        filename: `opt_${asset.name || 'asset'}`
      });

      // 4. Update references
      await updateReferences(asset._id, newAsset._id);

      // 5. Delete old asset
      console.log('   🗑️ Deleting original asset from Sanity...');
      await client.delete(asset._id);

      // 6. Cleanup local files
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
      console.log('   ✅ Done!\n');

    } catch (error) {
      console.error(`   ❌ Failed to process ${asset.name}:`, error.message);
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    }
  }

  console.log('✨ Optimization complete!');
}

processAssets();
