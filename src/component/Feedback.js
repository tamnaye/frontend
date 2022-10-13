//styles
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
//hooks
import { useEffect, useState} from 'react';
import useUrl from '../hooks/useUrl';
import { fetchGet, fetchPostJson } from '../hooks/fetchUrl';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const myUrl = useUrl();
  const navigate = useNavigate();

  //--useState 상태관리--//
  //GET : feedback data
  const [feedbackDatas, setFeedbackDatas] = useState([]);
  //GET : userRole data | userRole이 DEV인 경우 : 개발자들은 삭제기능 없애고 전체 데이터 읽어옴
  const [userRole, setUserRole] = useState('');
  
  //input값
  const [feedbacks, setFeedbacks] = useState('');
  //console.log('feedbacks 초기값:', feedbacks);

  //input값 가져오는 첫번째 방법 1) useState 사용
  const onChangeContent = (e) => {
    setFeedbacks(e.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault(); //form의 전제 새로고침 기능 막음
    const arr = [...feedbackDatas];
    //console.log('feedbacks 입력 값:', feedbacks);

    //feadback POST
    const postUrl = `http://${myUrl}/api/feedback`;
    if (feedbacks === '') {
      alert('내용을 입력해 주세요!');
    } else {
      const object = {
        content: feedbacks,
      };
      fetchPostJson(postUrl, object, navigate).then((data) => {
        if (data.message) {
          alert('피드백이 등록되었습니다, 감사합니다 :)');
          arr.push(feedbacks);
          setFeedbackDatas(arr);
          setFeedbacks(''); //빈 값 상태 변경 됨
          //console.log('feedbacks 입력 후:', arr);
        }
      });
    }
  };


  //feedback GET
  const url = `http://${myUrl}/api/feedback`;
  useEffect(() => {
    fetchGet(url, navigate).then((data) => {
      setFeedbackDatas(data?.feedbackData);
      setUserRole(data?.userRole);
    });
  }, [url, navigate]);

  //Delete feedback POST
  const deleteFeedback = (deleteItem, index) => {
    const arr = [...feedbackDatas];
    const postUrl = `http://${myUrl}/api/feedback/deletion`;
    const object = {
      content: deleteItem,
    };
    fetchPostJson(postUrl, object, navigate).then((data) => {
      alert(data.message);
      //복제한 배열에서 삭제한 데이터 제거 후 state를 새로고침
      arr.splice(index, 1);
      setFeedbackDatas(arr);
    });
  };

  return (
    <Container style={{ marginTop: '60px' }}>
      <div>
        <Form>
          <p style={{ fontWeight: 'bold' }}>아래에 작성해 주세요!</p>
          <InputGroup style={{ marginTop: '10px' }}>
            <InputGroup.Text>문의사항</InputGroup.Text>
            <Form.Control
              placeholder='최대 300글자 입력 가능'
              as='textarea'
              aria-label='With textarea'
              maxLength='300'
              value={feedbacks}
              onChange={(e) => {
                onChangeContent(e);
              }}
            />
          </InputGroup>
          <Button
            style={{
              display: 'block',
              margin: '30px auto',
              fontSize: '15px',
            }}
            variant='primary'
            type='submit'
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
      <div>
        <p style={{ marginTop: '50px', fontWeight: 'bold' }}>문의사항</p>
        <hr />
        <div style={{ height:'350px', overflowY:'auto'}}>
        {feedbackDatas.map((item, index) => (
          <Card key={index} style={{ marginTop: '20px'}}>
            <Card.Body style={{ position: 'relative' }}>
              {item}
              {userRole === 'DEV'
                ? null
                : [
                    <button
                      key={index}
                      onClick={() => {
                        deleteFeedback(item, index);
                      }}
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '-10px',
                        width: '25px',
                        height: '25px',
                        borderRadius: '50%',
                        border: 'none',
                      }}
                    >
                      X
                    </button>,
                  ]}
            </Card.Body>
          </Card>
        ))}
        </div>
      </div>
    </Container>
  );
};

export default Feedback;


/*mypage_bookingTable*/
// @media screen and (max-width: 700px) {
//   thead .tableTrTitle .tableTh {
//      font-size: 10px;
//      text-align: center;
//   }
//   tbody tr .tableTd {
//      font-size: 10px;
//   }
//   div .warning .warning1 {
//      font-size: 6px;
//   }
//   div .warning .warning2 {
//      font-size: 6px;
//   }
//  }