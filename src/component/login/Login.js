import { Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import styles from "./Login.module.css";
import encrypt from "../../hooks/encrypt";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const id = window.localStorage.getItem("userid");
  useEffect(() => {
    if (id !== null) {
      navigate("/main");
    }
  }, [id, navigate]);

  function sendToken(userid) {
    const url = `http://192.168.4.146:8080/auth/login`;

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userid,
      }),
    })
      .then((res) => {
        console.log("res - contentType ",res.headers.get('content-type'))
        console.log("res - Authorization ",res.headers.get('Authorization'))
        console.log("res - reAuthorization ",res.headers.get('reAuthorization'))
        window.localStorage.setItem("Authorization", res.headers.get('Authorization'));

        return res.json();
      })

      .then((data) => {
        console.log("data : ", data);
        if (data.message === "success") {
          window.localStorage.setItem("userid", userid);
          navigate(`/main`);
        } else {
          alert(alert.data.message)
        }
      });
  }

  const onFinish = (values) => {
    const userid = values.userid;
    const userpwd = values.userpwd; //get pwd
    const encrypted_pwd = encrypt(userpwd); //pwd 암호화

    fetch("/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: userid,
        password: encrypted_pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 405) {
          // sendToken(userid);
          window.localStorage.setItem("userid", userid);
          navigate(`/main`);
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.centerName}>더큰내일 회의실 예약 시스템</h1>
        <Form onFinish={onFinish}>
          <Form.Item
            name="userid"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              autoComplete="off"
              size="large"
              placeholder="Account ID"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="userpwd"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              autoComplete="off"
              type="password"
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
