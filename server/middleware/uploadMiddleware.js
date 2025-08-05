import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine subdirectory based on file type
    let uploadPath = uploadsDir;
    
    if (file.fieldname === 'propertyImages') {
      uploadPath = path.join(uploadsDir, 'properties');
    } else if (file.fieldname === 'avatar') {
      uploadPath = path.join(uploadsDir, 'avatars');
    }
    
    // Create subdirectory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Middleware for uploading property images (multiple)
export const uploadPropertyImages = upload.array('propertyImages', 10); // Max 10 images

// Middleware for uploading user avatar (single)
export const uploadUserAvatar = upload.single('avatar');

// Middleware to process uploaded files and add URLs to request body
export const processUploadedFiles = (req, res, next) => {
  // For property images
  if (req.files) {
    // Create array of image URLs
    const imageUrls = req.files.map(
      (file) => `/uploads/properties/${path.basename(file.path)}`
    );
    
    // Add to request body
    if (req.body.images) {
      // If images already exist in body, append new ones
      req.body.images = [...JSON.parse(req.body.images), ...imageUrls];
    } else {
      req.body.images = imageUrls;
    }
  }

  // For user avatar
  if (req.file) {
    req.body.avatar = `/uploads/avatars/${path.basename(req.file.path)}`;
  }

  next();
};