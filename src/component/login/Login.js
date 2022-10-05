import { Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "antd/dist/antd.min.css";
import styles from "./Login.module.css";
import encrypt from "../../hooks/encrypt";
import useUrl from "../../hooks/useUrl";
import { removeToken, setAdminAuth, setAuth } from "../../hooks/authModule";

export default function Login({ path }) {
  const isAdmin = path === "/admin" ? true : false;
  console.log("login page isAdmin", isAdmin);
  const ip = useUrl();
  const apiUrl = isAdmin
    ? `http://${ip}/admin/login`
    : `http://${ip}/auth/login`;
  const navigatePath = isAdmin ? "/admin/fileupload" : "/main";

  const navigate = useNavigate();
  // const [isAdmin, setIsAdmin] = useState(false);

  function getToken(userid) {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userid,
      }),
    })
      .then((res) => {
        console.log("login ing");
        console.log("header ", res.status);
        isAdmin
          ?setAdminAuth(res.headers.get("Authorization2")) 
          :setAuth(
            res.headers.get("Authorization"),
            res.headers.get("reAuthorization")
          ) 
        return res.json();
      })
      .then((data) => {
        if (data.message === "success") {
          navigate(navigatePath);
        } else {
          alert("알수없는 에러입니다.");
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
          getToken(userid);
        } else {
          alert(data.message); // 아이디 혹은 비밀번호가 일치하지 않습니다.
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {isAdmin ? (
          <h1 className={styles.centerNameAdmin}>탐나예 관리자 로그인</h1>
        ) : (
          <h1 className={styles.centerName}>더큰내일 회의실 예약 시스템</h1>
        )}
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
            {isAdmin ? (
              <Button
                size="large"
                style={{ width: "100%" }}
                type="default"
                htmlType="submit"
              >
                Login
              </Button>
            ) : (
              <Button
                size="large"
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Login
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
