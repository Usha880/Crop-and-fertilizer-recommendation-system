export async function getCurrentWeather(lat, lon) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/weather/current?lat=${lat}&lon=${lon}`);

    if (!response.ok) {
      let errorMsg = 'Failed to fetch weather data';
      try {
        const errData = await response.json();
        if (errData.error) errorMsg = errData.error;
      } catch {}
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('getCurrentWeather error:', error);
    throw error;
  }
}
