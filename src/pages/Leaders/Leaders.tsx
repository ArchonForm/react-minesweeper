import styles from './Leaders.module.css'

export const Leaders = () => {
  const players = [
    {
      name: 'John',
      time: 100,
    },
    {
      name: 'Pit',
      time: 2,
    },
    {
      name: 'Ivan',
      time: 1,
    },
  ]
  return (
    <div className={styles.container}>
      {players.map(player => (
        <div className={styles.playerInfo}>
          <div>{player.name}</div>
          <div>{player.time} sec</div>
        </div>
      ))}
    </div>
  )
}
