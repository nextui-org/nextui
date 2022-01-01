import React from 'react'

declare module 'react' {
  interface MetaHTMLAttributes<T> extends React.MetaHTMLAttributes<T> {
    itemprop?: string
  }
}
