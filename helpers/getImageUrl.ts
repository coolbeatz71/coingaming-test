import { IMAGES_URL } from '@constants/platform';

const getImageUrl = (): string | undefined => IMAGES_URL || undefined;

export default getImageUrl;
