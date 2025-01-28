const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;
const cors = require("cors");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = req.body.folder;
      const dir = path.join(__dirname, 'filestorage', folder);
  
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
  
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const customName = req.body.customName || 'file'; // Default name if none provided
      const timestamp = Date.now();
      const extension = path.extname(file.originalname); // Extract file extension
      const fileName = `${customName}-${timestamp}${extension}`;
      cb(null, fileName);
    },
  });
  

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'filestorage')));

app.get('/', (req, res) => {
  const baseDir = path.join(__dirname, 'filestorage');
  const folders = ['cv', 'docs', 'resumes', 'writeUps'];

  const files = {};
  folders.forEach(folder => {
    const folderPath = path.join(baseDir, folder);
    if (fs.existsSync(folderPath)) {
      files[folder] = fs.readdirSync(folderPath);
    } else {
      files[folder] = [];
    }
  });

  res.json({ folders, files });//

});

app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});
app.get('/download/:folder/:fileName', (req, res) => {
    const { folder, fileName } = req.params;
    const filePath = path.join(__dirname, 'filestorage', folder, fileName);
  
    if (fs.existsSync(filePath)) {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error("Error while downloading file:", err);
          res.status(500).send("Failed to download the file.");
        }
      });
    } else {
      res.status(404).send("File not found.");
    }
  });
app.delete('/delete/:folder/:fileName', (req, res) => {
  const folder = req.params.folder;
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'filestorage', folder, fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.send(`File "${fileName}" has been deleted from "${folder}".`);
  } else {
    res.status(404).send(`File "${fileName}" not found in "${folder}".`);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
