import { Col, Container, Row } from 'react-bootstrap'
import './what-we-do.scss'
import { constants } from '../../../../constants'
import { GiCarKey, GiJeep, GiRecycle, GiTimeSynchronization } from 'react-icons/gi'
import { TbBuildingSkyscraper } from 'react-icons/tb'
import { RiVipDiamondLine } from 'react-icons/ri'

const { whatWeDo: { desc, services, title }} = constants

const serviceIcons = [
  <GiCarKey key={0} />,
  <TbBuildingSkyscraper key={0} />,
  <GiTimeSynchronization key={0} />,
  <RiVipDiamondLine key={0} />,
  <GiRecycle key={0} />,
  <GiJeep key={0} />,
]

const WhatWeDo = () => {
  return (
    <Container fluid className="what-we-do">
      <Row>
        <Col xl={4}>
          <img src="/img/what_we_do.jpg" alt="What We Do" />
        </Col>
        <Col xl={8}>
          <div>
            <h2 className='mt-5'>{title}</h2>
            <p>{desc}</p>
          </div>
          <Row className='mb-5 props'>
            {
              services.map((item, index) => (
                <Col sm={6} lg={4} key={index}>
                  {serviceIcons[index]} <span> {item.title}</span>
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default WhatWeDo