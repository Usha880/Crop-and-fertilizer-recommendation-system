export async function resolvePin(pin) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/geo/resolve?pin=${pin}`);

    if (!response.ok) {
      let errorMsg = 'Failed to resolve PIN';
      try {
        const errData = await response.json();
        if (errData.error) errorMsg = errData.error;
      } catch {}
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    console.error('resolvePin error:', error);
    throw error;
  }
}
