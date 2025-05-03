import Header from '@/components/Header';
import UserHeaderNav from './UserHeaderNav';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header>
        <UserHeaderNav />
      </Header>

      <main>{children}</main>
    </>
  );
};
export default AppLayout;
