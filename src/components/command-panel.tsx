'use client'

import 'react-cmdk/dist/cmdk.css'
import CommandPalette, {
  filterItems,
  getItemIndex,
  useHandleOpenCommandPalette
} from 'react-cmdk'
import { useState } from 'react'
import { SidebarList } from './sidebar-list'
import { Session } from 'next-auth/types'
import React from 'react'
import { useRouter } from 'next/navigation'

interface CommandPanelProps {
  session: Session
}

export default function CommandPanel(props: CommandPanelProps) {
  const { session } = props

  const [page, setPage] = useState<'root' | 'chats'>('root')
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState('')

  const router = useRouter()

  useHandleOpenCommandPalette(setOpen)

  const filteredItems = filterItems(
    [
      {
        heading: 'Home',
        id: 'home',
        items: [
          {
            id: 'new',
            children: 'New Chat',
            icon: 'PlusIcon',
            closeOnSelect: true,
            onClick: () => {
              router.push('/')
            }
          },
          {
            id: 'chats',
            children: 'Browse Chats',
            icon: 'ChatBubbleLeftIcon',
            closeOnSelect: false,
            onClick: () => {
              setPage('chats')
            }
          }
        ]
      }
    ],
    search
  )

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map(list => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>

      <CommandPalette.Page id="chats">
        {session?.user ? (
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            {/* @ts-ignore */}
            <SidebarList userId={session?.user?.id || 'test'} />
          </React.Suspense>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )}
      </CommandPalette.Page>
    </CommandPalette>
  )
}
