import { useState } from 'react'
import Image from 'next/image'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart'
import { X } from 'phosphor-react'
import axios from 'axios'

import {
  BodyCart,
  CartContent,
  CartList,
  FooterCart,
  Item,
  ItemDescription,
  ItemImage,
  DialogClose,
  DialogContent,
} from '../styles/components/cartModal'

export const CartModal = () => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const {
    cartDetails,
    formattedTotalPrice,
    cartCount,
    decrementItem,
    incrementItem,
  } = useShoppingCart()

  const cartEntries = Object.values(cartDetails ?? {})

  const handleBuyProduct = async () => {
    const lineItems = cartEntries.map((entry) => {
      return { price: entry.price_id, quantity: entry.quantity }
    })
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkoutSession', {
        lineItems,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
    }
  }

  return (
    <DialogContent>
      <DialogClose>
        <X size={24} />
      </DialogClose>
      <CartContent>
        <strong>Bag</strong>

        {cartEntries.length > 0 ? (
          <CartList>
            <BodyCart>
              {Object.values(cartDetails ?? {}).map((entry) => (
                <Item key={entry.id}>
                  {entry.image ? (
                    <ItemImage>
                      <Image
                        width={100}
                        height={100}
                        src={entry.image}
                        alt={entry.description}
                      />
                    </ItemImage>
                  ) : null}
                  <ItemDescription>
                    <p>{entry.name}</p>
                    <strong>
                      {entry.quantity} x{' '}
                      {formatCurrencyString({
                        value: entry.price,
                        currency: entry.currency,
                      })}{' '}
                      = {entry.formattedValue}
                    </strong>
                    <div>
                      <button onClick={() => decrementItem(entry.id)}>
                        Remove
                      </button>
                      <button onClick={() => incrementItem(entry.id)}>
                        Add
                      </button>
                    </div>
                  </ItemDescription>
                </Item>
              ))}
            </BodyCart>
            <FooterCart>
              <p>
                <span>Quantity</span> <span>{cartCount}</span>
              </p>
              <p>
                <span>Total</span> <span>{formattedTotalPrice}</span>
              </p>
              <button
                onClick={handleBuyProduct}
                disabled={isCreatingCheckoutSession}
              >
                Finish
              </button>
            </FooterCart>
          </CartList>
        ) : (
          <p>Cart is empty.</p>
        )}
      </CartContent>
    </DialogContent>
  )
}