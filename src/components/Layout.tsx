import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../context/authContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logOut } = useAuth();

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {user ? (
          <LogOutContainer>
            <p onClick={logOut}>logout</p>
            <p>{user.name}</p>
          </LogOutContainer>
        ) : (
          <Link href='/login'>
            <p>login</p>
          </Link>
        )}
      </Header>
      {children}
    </>
  );
};
export default Layout;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const LogOutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
