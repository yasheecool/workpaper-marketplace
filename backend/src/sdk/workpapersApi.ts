import { BaseContent } from '../types';
import content from '../../prisma/content.json';

class WorkpapersAPI {
  getContent(firmId: string, filters?: unknown): Promise<BaseContent[]> {
    const availableContent = content
      .filter((c) => c.ownerFirmId === firmId)
      .map((c) => {
        const { ownerFirmId, ...rest } = c;
        return rest as unknown as BaseContent;
      });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(availableContent);
      }, 500);
    });
  }

  //   This is a temporary implementation which should be replaced with the actual API call, the promise always resolves to true
  subscribeToContent(
    firmId: string,
    subscriberId: string,
    contentId: string
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Firm ${firmId} subscribed to content ${contentId} by user ${subscriberId}`,
        });
      }, 500);
    });
  }
}

const workpapersApi = new WorkpapersAPI();

export default workpapersApi;
