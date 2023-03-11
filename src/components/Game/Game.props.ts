import { SetupData } from '../../interfaces'

export interface GameProps {
  setupData: SetupData
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
  name: string
}
