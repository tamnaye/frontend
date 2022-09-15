import { Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import styles from "./Login.module.css";
import encrypt from "../../hooks/encrypt";
import useUrl from "../../hooks/useUrl";
import { getAuth, setAuth } from "../../hooks/authModule";

export default function Login() {
  const navigate = useNavigate();
  const ip = useUrl();

  function getToken(userid) {
    const url = `http://${ip}/auth/login`;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: userid,
      }),
    })
      .then((res) => {
        setAuth(
          res.headers.get("Authorization"),
          res.headers.get("reAuthorization")
        );
        return res.json();
      })

      .then((data) => {
        if (data.message === "success") {
          console.log("login auth check : ",getAuth().auth)
          navigate(`/main`);
        } else{
          alert("알수없는 에러입니다.")
        }
      });
  }

  const onFinish = (values) => {
    const userid = values.userid;
    const userpwd = values.userpwd; //get pwd
    const encrypted_pwd = encrypt(userpwd); //pwd 암호화

    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: userid,
        password: encrypted_pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 405) {
          getToken(userid);
          navigate(`/main`);
        } else {
          alert(data.message); // 아이디 혹은 비밀번호가 일치하지 않습니다.
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.centerName}>더큰내일 회의실 예약 시스템</h1>
        <Form onFinish={onFinish}>
          <Form.Item
            name='userid'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              autoComplete='off'
              size='large'
              placeholder='Account ID'
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name='userpwd'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input
              autoComplete='off'
              type='password'
              size='large'
              placeholder='Password'
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              size='large'
              style={{ width: '100%' }}
              type='primary'
              htmlType='submit'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
