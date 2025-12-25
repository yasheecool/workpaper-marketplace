import Header from '@/components/layout/Header';
import { FirmSelector, getFirms } from '@/feature/firm';
import Container from '@/components/layout/Container';

const FirmSelectionPage = async () => {
  const firms = await getFirms();

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

export default FirmSelectionPage;
