// AppLink.tsx
import React from 'react'
import { IS_NEXT } from '@/shared/use/appConfig'

let LinkComponent: React.ComponentType<any>

if (IS_NEXT) {
  const NextLink = (await import('next/link')).default
  LinkComponent = NextLink
} else {
  // Usar el Link de react-router-dom
  const ReactRouterLink = (await import('react-router-dom')).Link
  LinkComponent = ReactRouterLink
}

export const AppLink = ({ to, ...props }: any) => {
  const linkProps = IS_NEXT ? { href: to } : { to }
  return <LinkComponent {...linkProps} {...props} />
}
