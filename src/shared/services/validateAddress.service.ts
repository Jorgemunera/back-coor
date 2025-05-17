import axios from "axios";
import { config } from "../config/config";

export const validateAddress = async (address: string): Promise<boolean> => {
  try {
    const token = config.locationIQ.apiKey;
    const url = `https://us1.locationiq.com/v1/search.php?key=${token}&q=${encodeURIComponent(address)}&format=json&limit=1`;

    const response = await axios.get(url);
    return response.data.length > 0;
  } catch (err) {
    console.error('Error validating address (LocationIQ):', err);
    return false;
  }
};
