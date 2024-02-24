'use client'

import { Button } from '@acme/ui'
import React from 'react'

const CloseWindowButton = () => {
  return (
    <Button onClick={window.close}>Venster sluiten</Button>
    )
}

export default CloseWindowButton