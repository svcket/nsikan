import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4y8gx2fx',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-04',
});

async function auditAssets() {
  console.log('🔍 Starting Media Audit...\n');

  const query = `*[_type in ["sanity.imageAsset", "sanity.fileAsset"]] {
    "name": originalFilename,
    "size": size,
    "url": url,
    "type": _type,
    "id": _id,
    "mimeType": mimeType
  } | order(size desc)`;

  try {
    const assets = await client.fetch(query);
    
    console.log(`Found ${assets.length} assets total.\n`);
    console.log('--- Top 20 Largest Assets ---');
    
    assets.slice(0, 20).forEach((asset, index) => {
      const sizeMB = (asset.size / (1024 * 1024)).toFixed(2);
      const type = asset.type === 'sanity.imageAsset' ? '🖼️ IMAGE' : '🎥 VIDEO';
      console.log(`${index + 1}. ${sizeMB} MB | ${type} | ${asset.name || 'Unnamed'}`);
    });

    const totalSize = assets.reduce((acc, curr) => acc + (curr.size || 0), 0);
    console.log(`\n📦 Total Media Size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
    
  } catch (error) {
    console.error('❌ Error fetching assets:', error.message);
  }
}

auditAssets();
