export default function TimeBtnExplain() {
  return (
    <div style={{ marginTop: '12px', display: 'flex' }}>
      <p
        style={{
          marginTop: '3px',
          borderLeft: '5px solid #00000040',
        }}
      >
        &nbsp;동료 매니저 시간: 예약불가
      </p>
      <p
        style={{
          marginTop: '3px',
          marginLeft: '10px',
          borderLeft: '5px solid #ffc0cb',
        }}
      >
        &nbsp;인재 시간: 예약가능
      </p>
    </div>
  );
}
