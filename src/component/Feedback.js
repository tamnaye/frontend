import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
//hooks
import { useEffect, useRef, useState } from 'react';
import useUrl from '../hooks/useUrl';
import { fetchGet } from '../hooks/fetchUrl';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const myUrl = useUrl();
  const userid = window.localStorage.getItem('userid');
  const feedbackRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(feedbackRef.current.value);

    //feadback POST
    fetch(`http://${myUrl}/api/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: feedbackRef.current.value,
        userId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.message) {
          alert('피드백 주셔서 감사합니다😍');
          feedbackRef.current.value = ''; //제출하고 나면 빈값으로 변경
        }
      });
  };

  //feadback GET
  const [feedbackDatas, setFeedbackDatas] = useState([]);
  const navigate = useNavigate()
  const url = `http://${myUrl}/api/feedback`;
  useEffect(() => {
    fetchGet(url, navigate)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackDatas(data.FeedbackData);
      });
  }, [url]);
  //console.log(feedbackDatas);

  return (
    <Container style={{ marginTop: '60px' }}>
      <div>
        <Form onSubmit={onSubmit}>
          <p style={{ fontWeight: 'bold' }}>
            아래에 작성해 주세요! (피드백 기간에만 오픈할 예정입니다.)
          </p>
          <InputGroup style={{ marginTop: '10px' }}>
            <InputGroup.Text>피드백</InputGroup.Text>
            <Form.Control
              as='textarea'
              aria-label='With textarea'
              ref={feedbackRef}
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
          >
            Submit
          </Button>
        </Form>
      </div>
      {userid === '22106060' ||
      userid === '22106040' ||
      userid === '22106045' ||
      userid === '22106069' ? (
        <div>
          <p style={{ marginTop: '50px', fontWeight: 'bold' }}>피드백 리스트</p>
          <hr />
          {feedbackDatas.map((item, index) => (
            <Card key={index} style={{ marginTop: '20px' }}>
              <Card.Body>{item}</Card.Body>
            </Card>
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default Feedback;
