const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = {
  "html": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "css": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  "tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "git": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  "github": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  "vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
  "api": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"
};

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

Object.entries(icons).forEach(([name, url]) => {
  https.get(url, (res) => {
    const file = fs.createWriteStream(path.join(dir, `${name}.svg`));
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}.svg`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${name}: ${err.message}`);
  });
});
