import axios from 'axios';

// Fetch multiple images based on a query
export const fetchHotelImagesFromUnsplash = async (query, perPage = 5) => {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: perPage,
      },
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`, // Use your Unsplash API key
      },
    });

    return response.data.results.map(photo => photo.urls.regular); // Get URLs of the images
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
};
