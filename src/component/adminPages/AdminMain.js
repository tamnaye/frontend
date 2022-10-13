import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { doLogout } from '../../hooks/doLogout';
import { useNavigate } from 'react-router-dom';
import useUrl from '../../hooks/useUrl';

const AdminMain = () => {
  const url = `http://${useUrl()}/admin/logout`;
  const navigate = useNavigate();
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} bg='light' expand={expand} className='mb-3'>
          <Container fluid>
            <Navbar.Brand href='/admin/fileupload'>관리자 페이지</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement='end'
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  관리자 페이지
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <Nav.Link href='/admin/fileupload'>최신기수 업로드</Nav.Link>
                  <Nav.Link href='/admin/individual'>개별 인재관리</Nav.Link>
                  <Nav.Link href='/admin/floor'>기수별 층수관리</Nav.Link>
                  <Nav.Link href='/admin/room'>회의실 데이터</Nav.Link>
                  <Nav.Link
                    type='button'
                    style={{ color: '#1890FF' }}
                    onClick={() => doLogout(navigate, url)}
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default AdminMain;
