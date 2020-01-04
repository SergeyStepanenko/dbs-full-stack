import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, LinkText } from './styles'

const Header = () => {
  const router = useRouter()
  const { pathname } = router
  return (
    <Container>
      <Link href="/">
        <a>
          <LinkText isActive={pathname === '/'}>Home</LinkText>
        </a>
      </Link>
      <Link href="/about">
        <a>
          <LinkText isActive={pathname === '/about'}>About</LinkText>
        </a>
      </Link>
      <Link href="/shop">
        <a>
          <LinkText isActive={pathname === '/shop'}>Shop</LinkText>
        </a>
      </Link>
      <Link href="/admin">
        <a>
          <LinkText isActive={pathname === '/admin'}>Admin</LinkText>
        </a>
      </Link>
    </Container>
  )
}

export default Header
