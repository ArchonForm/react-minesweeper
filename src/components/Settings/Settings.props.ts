import { SetupData } from '../../models'

export interface SettingsProps {
  handleSetData: (data: SetupData, name: string) => void
  name: string
}
