import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import { BagLink, HeaderContainer } from '../styles/components/header'
import { useShoppingCart } from 'use-shopping-cart'
import { Handbag } from 'phosphor-react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { CartModal } from './CartModal'

export const Header = () => {
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="home" />
      </Link>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <BagLink empty={!cartCount}>
            <Handbag size={24} weight="bold" />
            {cartCount ? <span>{cartCount}</span> : ''}
          </BagLink>
        </Dialog.Trigger>
        <Dialog.Portal>
          <CartModal />
        </Dialog.Portal>
      </Dialog.Root>
    </HeaderContainer>
  )
}