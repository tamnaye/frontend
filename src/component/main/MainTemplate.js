import SecondFloor from './secondFloorComponents/SecondFloor'
import ThirdFloor from './thirdFloorComponents/ThirdFloor'
import styles from './MainTemplate.module.css'
// import { useParams } from 'react-router-dom'
// import useFetch from '../../hooks/useFetch'

const MainTemplate = () => {
  //  classes 활용
  const userClasses = 5
  const MaxClasses = 6

  // const { id } = useParams()

  // const Data = useFetch(`http://192.168.5.60:8080/api/user/data?userId=${id}`)

  // console.log(Data)

  // const userClasses = Data.userData.classes
  // const MaxClasses = Data.maxClasses

  // console.log(userClasses)
  // console.log(MaxClasses)

  return (
    <div>
      <div className={styles.floorContainer}>
        {/* classes 활용 */}
        {userClasses === MaxClasses
          ? [<ThirdFloor key="2" className={styles.thirdFloor} />]
          : [<SecondFloor key="3" className={styles.secondFloor} />]}
      </div>
    </div>
  )
}

export default MainTemplate
