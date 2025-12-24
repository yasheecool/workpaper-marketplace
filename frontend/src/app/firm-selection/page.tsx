import { FirmSelectionPage } from '@/feature/firm-selection';
import { getFirms } from '@/feature/firm-selection/queries';

const page = async () => {
  const firms = await getFirms();

  return <FirmSelectionPage firms={firms} />;
};
export default page;
