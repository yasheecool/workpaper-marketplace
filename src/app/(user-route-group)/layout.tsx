import Header from '@/components/Header';
import UserHeaderNav from './UserHeaderNav';

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  // try {
  //   const state = useAppStore.getState();
  //   console.log(state);
  //   // const res = await api.get('/');
  //   // console.log(res);
  // } catch (err) {
  //   console.log(err);
  // }

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
