import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const git = simpleGit();

async function pushToDocsRepo() {
  console.log('Preparing to push to docs repository...');

  // Ensure .nojekyll file exists
  const nojekyllPath = path.join(distDir, '.nojekyll');
  if (!fs.existsSync(nojekyllPath)) {
    fs.writeFileSync(nojekyllPath, '');
    console.log('Created .nojekyll file');
  }

  try {
    // Initialize git in the dist directory
    await git.cwd(distDir);

    // Check if .git exists, if not initialize
    if (!fs.existsSync(path.join(distDir, '.git'))) {
      await git.init();
      console.log('Initialized git repository in dist directory');
    }

    // Add all files
    await git.add('.');
    console.log('Added all files to git');

    // Commit changes
    await git.commit('Update documentation site');
    console.log('Committed changes');

    // Add remote if it doesn't exist
    try {
      await git.getRemotes();
      await git.removeRemote('origin');
    } catch (e) {
      // Remote doesn't exist, which is fine
    }

    await git.addRemote('origin', 'https://github.com/augceo/docs.git');
    console.log('Set remote origin');

    // Force push to main branch
    await git.push('origin', 'main', ['--force']);
    console.log('Pushed to docs repository successfully!');
  } catch (error) {
    console.error('Error pushing to docs repository:', error);
    process.exit(1);
  }
}

pushToDocsRepo();
