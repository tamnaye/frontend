import SecondFloor from './secondFloorComponents/SecondFloor'
import ThirdFloor from './thirdFloorComponents/ThirdFloor'
import styles from './MainTemplate.module.css'

const MainTemplate = () => {
  return (
    <div>
      <div className={styles.floorContainer}>
        <SecondFloor className={styles.secondFloor} />
        <ThirdFloor className={styles.thirdFloor} />
      </div>
    </div>
  )
}

export default MainTemplate
