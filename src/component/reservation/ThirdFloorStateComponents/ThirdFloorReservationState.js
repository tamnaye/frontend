import ThirdFloorNaRoomState from './ThirdFloorNaRoomState'
import ThirdFloorMeetingRoomState from './ThirdFloorMeetingRoomState'

const ThirdFloorReservationState = () => {
  return (
    <div>
      <ThirdFloorMeetingRoomState />
      <ThirdFloorNaRoomState />
    </div>
  )
}

export default ThirdFloorReservationState
