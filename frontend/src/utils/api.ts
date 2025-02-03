export async function fetchFromApi(url: string, options?: RequestInit) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`API Request Failed: ${url}`, error);
      throw error;
    }
  }
  