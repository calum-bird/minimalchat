import * as React from 'react'
import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { buttonVariants } from '@/components/ui/button'
import { IconGitHub } from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { LoginButton } from '@/components/login-button'
import CommandPanel from './command-panel'

export async function Header() {
  const session = await auth()
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center">
        <CommandPanel session={session} />
        <div className="flex items-center">
          {session?.user ? <UserMenu user={session.user} /> : <LoginButton />}
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/calum-bird/minimalchat"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconGitHub />
          <span className="ml-2 hidden md:flex">GitHub</span>
        </a>
      </div>
    </header>
  )
}
