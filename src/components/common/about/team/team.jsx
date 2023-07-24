import { Col, Container, Row } from "react-bootstrap"
import SectionHeader from "../../section-header/section-header"
import Spacer from "../../spacer/spacer"
import { constants } from "../../../../constants"
import TeamMember from "./member/member"

const { teamMembers } = constants

const Team = () => {
  return (
    <div className="team">
      <SectionHeader title1="Our" title2="Team" />
      <Spacer />
      <Container>
        <Row className='gy-5'>
          {
            teamMembers.map(item => (
              <Col lg={4} key={item.id}>
                <TeamMember {...item} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  )
}

export default Team