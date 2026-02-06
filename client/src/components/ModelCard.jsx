// components/ModelCard.jsx
import styles from './ModelCard.module.css'

export default function ModelCard({ title, children, actions }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.actions}>{actions}</div>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
