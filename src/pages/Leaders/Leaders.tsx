import { useAppSelector } from '../../hooks/redux'
import { PlayerRecord } from '../../interfaces'
import styles from './Leaders.module.css'

export const Leaders = () => {
  let players = useAppSelector(state => state.players.list)

  const preparedPlayersList = (players: PlayerRecord[]): PlayerRecord[] => {
    let unique = [
      ...new Map(
        players.map((item: PlayerRecord) => [item['name'], item])
      ).values(),
    ]

    unique.sort((a: PlayerRecord, b: PlayerRecord) => a.time - b.time)
    return unique.slice(0, 10)
  }

  return (
    <div className={styles.container}>
      {preparedPlayersList(players).map(player => (
        <div key={player.name} className={styles.playerInfo}>
          <div>{player.name}</div>
          <div>{player.time} sec</div>
        </div>
      ))}
    </div>
  )
}
