const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadFile = async (url, outputDir) => {
  try {
    const fileName = path.basename(url);
    const outputPath = path.join(outputDir, fileName);

    console.log(`Starting download: ${fileName}`);

    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream'
    });
    
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Downloaded: ${fileName}`);
        resolve();
      });
      writer.on('error', (err) => {
        console.error(`Error writing file: ${fileName}`);
        reject(err);
      });
    });
  } catch (error) {
    console.error(`Failed to download ${url}:`, error.message);
  }
};

const outputDir = './GSOD_Files';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const baseUrl = 'https://www.ncei.noaa.gov/data/global-summary-of-the-day/archive/';
const years = Array.from({ length: 2024 - 1929 + 1 }, (_, i) => 1929 + i); 
const urls = years.map((year) => `${baseUrl}${year}.tar.gz`);

const downloadFiles = async (urls) => {
  for (const url of urls) {
    await downloadFile(url, outputDir); 
  }
  console.log('All downloads complete.');
};

downloadFiles(urls);