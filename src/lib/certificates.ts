export interface Certificate {
  name: string;
  image: string;
}

// Dynamically match all image files inside the public/CERTIFICATE directory
const certModules = import.meta.glob('/public/CERTIFICATE/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true });

export const certificatesList: Certificate[] = Object.keys(certModules).map((path) => {
  const filename = path.split('/').pop() || '';
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  
  // Format title: replace hyphens/underscores with spaces, and clean up extra spaces
  const title = nameWithoutExt
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    name: title,
    image: filename
  };
});
