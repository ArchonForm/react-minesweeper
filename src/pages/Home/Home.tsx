import React, { useState } from 'react'
import { Game } from '../../components/Game/Game'
import { Settings } from '../../components/Settings/Settings'
import { SetupData } from '../../models'

export const Home = () => {
  const [name, setName] = useState<string>('')
  const [setupData, setSetupData] = useState<SetupData>({
    width: 10,
    height: 10,
    mines: 10,
  })
  const [gameStarted, setGameStarted] = useState<boolean>(false)

  const handleSetData = (data: SetupData, name: string) => {
    setName(name)
    setSetupData(data)
    setGameStarted(true)
  }

  return (
    <>
      {gameStarted ? (
        <Game
          setupData={setupData}
          setGameStarted={setGameStarted}
          name={name}
        />
      ) : (
        <Settings handleSetData={handleSetData} name={name} />
      )}
    </>
  )
}
