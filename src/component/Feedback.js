import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

const Feedback = () => {
  return (
    <Container style={{ marginTop: '60px' }}>
      <Form>
        <p>소중한 피드백 감사합니다🧡 아래에 작성해 주세요!</p>
        <InputGroup style={{ marginTop: '10px' }}>
          <InputGroup.Text>피드백</InputGroup.Text>
          <Form.Control as='textarea' aria-label='With textarea' />
        </InputGroup>
        <Button
          style={{
            marginTop: '20px',
            float: 'right',
          }}
          variant='primary'
          type='submit'
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Feedback;
