import axios from 'axios';

// Fetch multiple images based on a query
export const fetchImagesFromPexels = async (query, perPage = 5) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query,
        per_page: perPage, // Fetch multiple images
      },
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,  // Use your Pexels API key
      },
    });

    // Return the array of images
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return [];
  }
};

// Fetch a single image based on a query
export const fetchImageFromPexels = async (query) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query,
        per_page: 1, // Fetch only one image
      },
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,  
      },
    });

    
    return response.data.photos[0] || null;
  } catch (error) {
    console.error('Error fetching image from Pexels:', error);
    return null;
  }
};
