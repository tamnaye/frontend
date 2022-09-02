import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from 'react-bootstrap';

const Feedback = () => {
  return (
    <Container style={{ marginTop: '60px' }}>
      <Form.Label htmlFor='basic-url'>
        소중한 피드백 감사합니다🧡 아래에 작성해 주세요!
      </Form.Label>

      <InputGroup style={{ marginTop: '10px' }}>
        <InputGroup.Text>피드백</InputGroup.Text>
        <Form.Control as='textarea' aria-label='With textarea' />
      </InputGroup>
    </Container>
  );
};

export default Feedback;
