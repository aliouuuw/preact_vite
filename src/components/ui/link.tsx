import React from 'react'
import { cn } from '@/lib/utils'
import { Link as RouterLink } from '@tanstack/react-router'
export function Link({ children, className, to }: { children: React.ReactNode, className: string, to: string }) {
    return (
      <>
        <RouterLink to={to} className={cn(className, 'text-sm text-blue-500 hover:text-blue-600 hover:underline')}>
          {children}
        </RouterLink>
      </>
    )
}

export default Link
