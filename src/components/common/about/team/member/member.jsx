import { Card } from 'react-bootstrap'
import './member.scss'

const TeamMember = (props) => {
  return (
    <Card className="team-member text-center h-100">
      <Card.Img variant="top" src={`/img/${props.image}`} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle>{props.title}</Card.Subtitle>
        <Card.Text className='mt-4 p-2' style={{textAlign: 'justify'}}>{props.desc}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TeamMember