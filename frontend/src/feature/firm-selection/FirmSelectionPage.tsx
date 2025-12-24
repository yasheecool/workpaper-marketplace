import Header from '@/components/layout/Header';
import FirmSelector from './components/FirmSelector';
import Container from '@/components/layout/Container';
import { type FirmWithVendorFlag } from '@/types/domain/firm';

const FirmSelection = async ({ firms }: { firms: FirmWithVendorFlag[] }) => {
  return (
    <>
      <Header disableNavigation={true} />

      <main className='h-[calc(100vh-140px)] bg-base-200 py-14 text-base-content'>
        <Container styles='max-w-4xl bg-white border-[0.5px] rounded-sm py-8 px-16 flex flex-col gap-8'>
          <FirmSelector firms={firms} />
        </Container>
      </main>
    </>
  );
};
export default FirmSelection;
