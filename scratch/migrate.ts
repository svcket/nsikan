import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4y8gx2fx',
  dataset: 'production',
  apiVersion: '2024-05-04',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

async function migrate() {
  const projects = await client.fetch('*[_type == "project"]');
  console.log(`Found ${projects.length} projects`);

  for (const project of projects) {
    if (project.type && !project.layout) {
      console.log(`Migrating ${project.title}: type(${project.type}) -> layout`);
      await client
        .patch(project._id)
        .set({ layout: project.type })
        .unset(['type'])
        .commit();
    } else if (project.type) {
      console.log(`Cleaning up ${project.title}: unsetting type`);
      await client
        .patch(project._id)
        .unset(['type'])
        .commit();
    }
  }
}

migrate();
