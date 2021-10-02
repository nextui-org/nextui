import React from 'react'

declare global {
  declare module 'react' {
    interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
      jsx?: boolean;
      global?: boolean;
    }
  }
}

