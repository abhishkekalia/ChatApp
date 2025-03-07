import { API_BASE_URL } from '@src/constants';
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import NetInfo from '@react-native-community/netinfo';

let isConnected: boolean = true; // Default value

// Subscribe to connection changes
const unsubscribe = NetInfo.addEventListener(state => {
  isConnected = !!state.isConnected;
});

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  if (!isConnected) {
    return Promise.reject({ message: 'No Internet Connection detected.' });
  }
  config.headers = {
    ...config.headers,
    Accept: 'application/json',
  };
  // console.log("AXIOS_REQUEST_CONFIG", config);
  return Promise.resolve(config);
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log('AXIOS_RESPONSE', JSON.stringify(response));
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    console.log('AXIOS_ERROR', JSON.stringify(error));

    const originalRequest = error.config;
    // Handle Network Error explicitly
    if (error.message === 'Network Error') {
      return Promise.reject({ message: 'No Internet Connection detected.' });
    }
    return Promise.reject(error);
  }
);

export const setUsername = async (username: string): Promise<string> => {
  try {
    const response = await api.post(`${API_BASE_URL}/chat/username`, { username });
    return response.data.userId;
  } catch (error) {
    console.error('Error setting username:', error);
    throw error;
  }
};
export const getRooms = async (): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/chat/rooms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const createRoom = async (roomName: string): Promise<string> => {
  try {
    const response = await api.post(`${API_BASE_URL}/chat/rooms`, { name: roomName });
    return response.data.roomId;
  } catch (error) {
    console.error('Error creating room:', error);
    throw error;
  }
};

export const getRoomInformationById = async (roomId: string): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/chat/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
export const getMessages = async (roomId: string): Promise<any> => {
  try {
    const response = await api.get(`${API_BASE_URL}/chat/rooms/${roomId}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Cleanup NetInfo subscription when no longer needed
export const cleanupNetInfoSubscription = () => {
  unsubscribe();
};

// Define ApiErrorResponse if not already defined
interface ApiErrorResponse {
  message: string;
  // Add other fields as needed
}