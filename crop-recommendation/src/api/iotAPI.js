export async function getLatestIoTData(lat, lon) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/iot/latest?lat=${lat}&lon=${lon}`);

    if (!response.ok) {
      let errorMsg = 'Failed to fetch IoT data';
      try {
        const errData = await response.json();
        if (errData.error) errorMsg = errData.error;
      } catch {}
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('getLatestIoTData error:', error);
    throw error;
  }
}
