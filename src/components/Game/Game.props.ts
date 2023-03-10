import { SetupData } from '../../models'

export interface GameProps {
  setupData: SetupData
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
  name: string
}
