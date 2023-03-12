import { useAppSelector } from '../../hooks/redux'
import styles from './Leaders.module.css'

export const Leaders = () => {
  let players = useAppSelector(state => state.players.list)

  return (
    <div className={styles.container}>
      {players.slice(0, 10).map((player, index) => (
        <div key={player.name} className={styles.row}>
          <div className={styles.rating}>{index + 1}.</div>
          <div className={styles.name}>{player.name}</div>
          <div>{player.time} sec</div>
        </div>
      ))}
    </div>
  )
}
