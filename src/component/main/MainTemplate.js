import SecondFloor from './secondFloorComponents/SecondFloor'
import ThirdFloor from './thirdFloorComponents/ThirdFloor'
import styles from './MainTemplate.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import useFetch from '../../hooks/useFetch'

const MainTemplate = () => {
  //  classes 활용
  // const userClasses = 5
  // const MaxClasses = 6

  const { id } = useParams()

  const [userClasses, setUserClasses] = useState('')
  const [maxClasses, setMaxClasses] = useState('')

  useEffect(() => {
    fetch(`http://192.168.5.100:8080/api/user/data?userId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserClasses(data.userData.classes)
        setMaxClasses(data.maxClasses)
      })
  }, [`http://192.168.5.100:8080/api/user/data?userId=${id}`])

  return (
    <div>
      <div className={styles.floorContainer}>
        {/* classes 활용 */}
        {userClasses === 0 ? (
          [
            <SecondFloor key="3" className={styles.secondFloor} />,
            <ThirdFloor key="2" className={styles.thirdFloor} />,
          ]
        ) : userClasses === maxClasses ? (
          <ThirdFloor key="2" className={styles.thirdFloor} />
        ) : (
          <SecondFloor key="3" className={styles.secondFloor} />
        )}
      </div>
    </div>
  )
}

export default MainTemplate
