import FirmSelector from './FirmSelector';
import { getFirmsContext } from '../queries';

const FirmSelectorContainer = async () => {
  const { allUserFirms: firms } = await getFirmsContext();

  return <FirmSelector firms={firms} />;
};
export default FirmSelectorContainer;
