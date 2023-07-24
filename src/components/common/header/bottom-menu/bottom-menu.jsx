import { Container, Nav, Navbar } from "react-bootstrap"
import { BsCarFrontFill, BsHeadphones, BsInfoCircleFill } from "react-icons/bs"
import {ImHome} from "react-icons/im"
import { Link, useLocation } from "react-router-dom"
import { constants } from "../../../../constants"
import { UserMenu } from '../../../'
import './bottom-menu.scss'

const { 
  routes: { home, vehicles, about, contact },
} = constants;

const navigationLinks = [
  {
    direct: home,
    icon: <ImHome />,
    text: "Home",
  },
  {
    direct: vehicles,
    icon: <BsCarFrontFill />,
    text: "Vehicles",
  },
  {
    direct: about,
    icon: <BsInfoCircleFill />,
    text: 'About Us',
  },
  {
    direct: contact,
    icon: <BsHeadphones />,
    text: 'Contact Us',
  }
]

const BottomMenu = () => {
  const { pathname } = useLocation();
  return (
    <div className="bottom-menu">
      <Navbar expand='lg'>
        <Container className="p-0">
          <Navbar.Toggle aria-controls="toggle" />
          <Navbar.Collapse id="toggle">
            <Nav className="me-auto">
              {
                navigationLinks.map(item => (
                  <Nav.Link key={item.text} as={Link} to={item.direct} active={pathname === item.direct}>
                    {item.icon} {item.text}
                  </Nav.Link>
                ))
              }
            </Nav>
            <UserMenu />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default BottomMenu