'use client'

import { PresetActions } from './actions'
import PageSwitcher from './page-switcher'
import TooltipWrapper from '@/components/tooltip-wrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { BlockType } from '@/lib/html-blocks'
import { cn } from '@/lib/utils'
import { Page, SEO } from '@prisma/client'
import {
  ChevronLeft,
  MenuIcon,
  MonitorIcon,
  SaveIcon,
  Smartphone,
  TabletIcon,
  Undo,
  Redo,
  TimerReset,
  LucideIcon,
  Option,
  Command,
  ArrowBigUp as Shift,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Display = 'desktop' | 'tablet' | 'mobile'

const IconButton = ({
  className,
  disabled,
  active,
  onClick,
  message,
  children,
  Icon,
}: {
  className?: string
  Icon: LucideIcon
  disabled?: boolean
  active?: boolean
  onClick: () => void
  message: string
  children: React.ReactNode
}) => (
  <button
    disabled={disabled}
    className={cn(
      'px-1 w-6 rounded-md max-md:hidden',
      active ? 'bg-background' : '',
      className,
      disabled ? 'pointer-events-none opacity-60' : ''
    )}
    onClick={onClick}
  >
    <TooltipWrapper
      disabled={disabled}
      message={
        <div className='flex items-center space-x-2'>
          {message}
          <code className='flex items-center text-xs p-1 bg-secondary rounded-sm h-5 text-opacity-60 ml-2 text-primary/80'>
            {children}
          </code>
        </div>
      }
    >
      <Icon className='w-4' />
    </TooltipWrapper>
  </button>
)

const Toolbar = ({
  page,
  pages,
  blocks,
  seo,
  display,
  loading,
  reset,
  undo,
  redo,
  canUndo,
  canRedo,
  setDisplay,
  setShowMenu,
  publish,
}: {
  page: Page
  pages: Page[]
  display: Display
  reset: () => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  setDisplay: (d: Display) => void
  blocks: BlockType[]
  seo: SEO
  loading: boolean
  publish: () => void
  setShowMenu: (m: (m: boolean) => boolean) => void
}) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.shiftKey && e.key === 'r') {
        e.preventDefault()
        reset()
      } else if (e.key === 's') {
        e.preventDefault()
        publish()
      } else if (e.key === 'z') {
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
    } else if (e.altKey) {
      if (e.key === 'm') {
        setDisplay('mobile')
      } else if (e.key === 'd') {
        setDisplay('desktop')
      } else if (e.key === 't') {
        setDisplay('tablet')
      }
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [redo, undo, reset, setDisplay])

  return (
    <div className='w-full flex items-center px-5 border-b border-input h-[39px] min-h-[39px] bg-secondary'>
      {/* <div className='w-2 h-2 rounded-full bg-[#ff5f57] mr-[6px]' />
          <div className='w-2 h-2 rounded-full bg-[#febb2c] mr-[6px]' />
          <div className='w-2 h-2 rounded-full bg-[#2bc840] mr-auto' /> */}
      <button className='mr-2' onClick={() => setShowMenu((prev) => !prev)}>
        <MenuIcon className='w-4' />
      </button>
      <Link
        href={`/pages`}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'rounded-none text-xs justify-start px-0 mr-auto'
        )}
      >
        <ChevronLeft className='h-4 w-4 inline' />
        <span className='max-md:hidden'>Terug naar Pagina&apos;s</span>
      </Link>
      <PageSwitcher pages={pages} page={page} mobile={display === 'mobile'} />
      <div className='ml-auto space-x-2 flex items-center'>
        <IconButton
          onClick={() => setDisplay('desktop')}
          active={display === 'desktop'}
          message='Desktop weergave'
          Icon={MonitorIcon}
        >
          <Option className='w-3 mr-[6px]' /> + D
        </IconButton>
        <IconButton
          onClick={() => setDisplay('tablet')}
          active={display === 'tablet'}
          message='Tablet weergave'
          Icon={TabletIcon}
        >
          <Option className='w-3 mr-[6px]' /> + T
        </IconButton>
        <IconButton
          onClick={() => setDisplay('mobile')}
          active={display === 'mobile'}
          message='Mobiel weergave'
          Icon={Smartphone}
        >
          <Option className='w-3 mr-[6px]' /> + M
        </IconButton>
        <IconButton
          onClick={() => undo()}
          disabled={!canUndo}
          message='Ongedaan maken'
          Icon={Undo}
        >
          <Command className='w-3 mr-[6px]' /> + Z
        </IconButton>
        <IconButton
          onClick={() => redo()}
          disabled={!canRedo}
          message='Veranderingen wissen'
          Icon={Redo}
        >
          <Command className='w-3 mr-[6px]' /> +{' '}
          <Shift className='w-3 mr-[6px] ml-[6px]' /> + Z
        </IconButton>
        <IconButton onClick={() => reset()} message='Reset' Icon={TimerReset}>
          <Command className='w-3 mr-[6px]' />
          <Shift className='w-3 mr-[6px] ml-[6px]' /> + R
        </IconButton>
      </div>
      <Button
        variant='default'
        className='py-2 h-7 px-2 ml-2'
        onClick={publish}
        disabled={loading}
      >
        <SaveIcon className='w-4' />
      </Button>

      <PresetActions
        blocks={blocks}
        page={page}
        seo={seo}
        pageIds={pages.map(({ id }) => id)}
      />
    </div>
  )
}

export default Toolbar
