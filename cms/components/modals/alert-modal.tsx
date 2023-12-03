'use client'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useEffect, useState } from 'react'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title='Weet je het zeker?'
      description='Dit kan niet ongedaan gemaakt worden.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Annuleren
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          Verder
        </Button>
      </div>
    </Modal>
  )
}
