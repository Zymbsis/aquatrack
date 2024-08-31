import { toast } from 'react-toastify';
import { AXIOS_INSTANCE } from '../redux/constants';

export const getGooglOAuthUrl = async () => {
  try {
    const {
      data: {
        data: { url },
      },
    } = await AXIOS_INSTANCE.get('users/get-oauth-url');
    window.location.href = url;
  } catch (error) {
    toast.error('Error getting Google OAuth URL');
  }
};
