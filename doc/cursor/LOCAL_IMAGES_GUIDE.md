# 📸 Guide: Adding Images to Your Photography Website

*Written for Java Backend Developers*

## 🎯 **Quick Overview**

This is a **React frontend** that displays a photography portfolio. Think of it like a **static photo gallery** that you can later connect to your Java backend.

## 🚀 **How to Add Images Right Now**

### **Option 1: Use the Helper Script (Recommended)**

1. **Place your image** in the appropriate folder:
   ```bash
   # Create the folder if it doesn't exist
   mkdir -p src/assets/images/gallery/family
   
   # Copy your image
   cp your-family-photo.jpg src/assets/images/gallery/family/
   ```

2. **Run the helper script**:
   ```bash
   node scripts/add-image.mjs "src/assets/images/gallery/family/your-family-photo.jpg" "Happy family outdoors"
   ```

3. **Restart your dev server**:
   ```bash
   npm run dev
   ```

### **Option 2: Manual Addition**

1. **Add import** at the top of `src/pages/Home.tsx`:
   ```typescript
   import yourFamilyPhoto from '../assets/images/gallery/family/your-family-photo.jpg';
   ```

2. **Add to gallery array** (around line 30):
   ```typescript
   const galleryImages = [
     // ... existing images
     { src: yourFamilyPhoto, alt: "Happy family outdoors" },
   ];
   ```

## 📁 **Folder Structure Explained**

```
src/assets/images/
├── gallery/           # Main portfolio images
│   ├── family/       # Family photography (12,000₽)
│   ├── baptism/      # Baptism photography (18,000₽)
│   ├── children/     # Children photography (9,000₽)
│   └── ch-wedding/   # Wedding photography (15,000₽)
├── hero/             # Hero section background
├── about/            # About section images
└── logo/             # Logo and branding
```

## 🎨 **Image Requirements**

### **Recommended Sizes**
- **Gallery images**: 1200x800px (4:3 ratio)
- **Hero images**: 1920x1080px
- **File size**: Under 500KB for web optimization

### **Supported Formats**
- **JPG/JPEG** - Best for photographs
- **PNG** - For images with transparency
- **WebP** - Modern format with better compression

### **Naming Convention**
Use descriptive names with hyphens:
- `family-session-001.jpg`
- `wedding-ceremony-001.jpg`
- `pregnancy-outdoor-001.jpg`

## 🔧 **Current vs Future Architecture**

### **Current (Frontend-Only)**
```
Your Images → src/assets/images/ → React Component → Website
```

### **Future (With Java Backend)**
```
Your Images → Java Backend → Database → REST API → React Frontend → Website
```

## 🛠️ **Java Backend Integration (Future)**

When you're ready to add your Java backend, here's what you'll need:

### **Spring Boot Controller**
```java
@RestController
@RequestMapping("/api/images")
public class ImageController {
    
    @GetMapping("/gallery")
    public ResponseEntity<List<ImageDTO>> getGalleryImages() {
        // Return images from database
        return ResponseEntity.ok(imageService.getAllImages());
    }
    
    @PostMapping("/upload")
    public ResponseEntity<ImageDTO> uploadImage(@RequestParam("file") MultipartFile file) {
        // Save image to storage and database
        return ResponseEntity.ok(imageService.saveImage(file));
    }
}
```

### **Database Entity**
```java
@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String filename;
    private String altText;
    private String category; // "family", "wedding", "pregnancy"
    private String url;
    private LocalDateTime createdAt;
}
```

### **Frontend API Call**
```typescript
// Replace hardcoded gallery with API call
const [galleryImages, setGalleryImages] = useState([]);

useEffect(() => {
  fetch('/api/images/gallery')
    .then(res => res.json())
    .then(data => setGalleryImages(data));
}, []);
```

## 📋 **Step-by-Step Example**

Let's say you want to add a family photo:

1. **Prepare your image**:
   ```bash
   # Optimize your image (recommended)
   # Use tools like TinyPNG or ImageOptim
   ```

2. **Add to project**:
   ```bash
   # Copy to appropriate folder
   cp my-family-photo.jpg src/assets/images/gallery/family/
   ```

3. **Use the script**:
   ```bash
   node scripts/add-image.mjs "src/assets/images/gallery/family/my-family-photo.jpg" "Счастливая семья на природе"
   ```

4. **Verify the changes**:
   ```bash
   # Check that the import was added
   grep "my-family-photo" src/pages/Home.tsx
   
   # Check that it's in the gallery array
   grep "Счастливая семья" src/pages/Home.tsx
   ```

5. **Test the website**:
   ```bash
   npm run dev
   # Open http://localhost:8001
   # Go to Portfolio section
   # Click on your new image
   ```

## 🎯 **Pro Tips for Java Developers**

1. **Think in terms of REST APIs**: The current setup is like having a static JSON file. Later, you'll replace it with API calls.

2. **Database normalization**: Plan your image categories (family, wedding, pregnancy) as separate tables or enum values.

3. **File storage**: Consider using AWS S3 or similar for production image storage.

4. **Image optimization**: Implement server-side image resizing and compression in your Java backend.

5. **Caching**: Use Spring Cache or Redis for frequently accessed images.

## 🚨 **Common Issues & Solutions**

### **Image not showing up?**
- Check the file path is correct
- Ensure the image file exists
- Verify the import statement was added
- Check browser console for errors

### **Image too large?**
- Compress the image before adding
- Use WebP format for better compression
- Consider using a CDN for production

### **Build errors?**
- Make sure image file exists
- Check import path is correct
- Verify file extension matches

## 📞 **Need Help?**

If you get stuck:
1. Check the browser console for errors
2. Verify file paths are correct
3. Make sure the dev server is running
4. Check that the image file exists and is readable

---

**Remember**: This is just the frontend! When you add your Java backend, you'll have much more control over image management, optimization, and delivery. 