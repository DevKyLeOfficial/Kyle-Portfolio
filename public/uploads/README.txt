Put your personal files here (paths referenced from app/data/site.js):

  profile.jpg          → site.media.profile
  projects/*.png       → site.projects[].image
  certificates/*.png   → site.certificates[].image
  certificates/*.pdf   → site.certificates[].pdf (optional)

Recommended: JPG/WebP for photos, PNG for certificates, PDF under 5 MB for fast loads.

After adding files, run:  npm run dev
