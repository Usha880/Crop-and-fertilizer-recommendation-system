// Sends lat/lon to backend and fetches crop and fertilizer recommendations
export async function getCropRecommendation(lat, lon) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/recommend/crop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lat, lon })
    });

    if (!response.ok) {
      // Attempt to parse backend error message
      let errorMessage = 'Failed to get crop recommendation';
      try {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          errorMessage = errorData.error;
        }
      } catch (_) {
        // Do nothing if JSON parsing fails
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('getCropRecommendation error:', error);
    throw error;
  }
}
