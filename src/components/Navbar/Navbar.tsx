import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to='/' className={styles.link}>
        Game
      </Link>
      <Link to='/leaders' className={styles.link}>
        Leaders
      </Link>
    </nav>
  )
}
