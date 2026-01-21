import FirmSelector from './FirmSelector';
import { getAllFirmsOfUser } from '../queries';

const FirmSelectorContainer = async () => {
  const { allUserFirms: firms } = await getAllFirmsOfUser();

  return <FirmSelector firms={firms} />;
};
export default FirmSelectorContainer;
