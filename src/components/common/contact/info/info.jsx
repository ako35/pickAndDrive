import { BiHeadphone } from "react-icons/bi";
import { AiOutlineMobile } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { constants } from "../../../../constants";
import './info.scss';

const { website: { address, email, phone, phone2, mapUrl } } = constants;

const contactInfoItems = [
  {
    direct: `tel:${phone}`,
    icon: <BiHeadphone />,
    text: phone,
  },
  {
    direct: `tel:${phone2}`,
    icon: <AiOutlineMobile />,
    text: phone2,
  },
  {
    direct: mapUrl,
    icon: <HiLocationMarker />,
    text: address,
  },
  {
    direct: `mailto:${email}`,
    icon: <MdEmail />,
    text: email,
  }
]

const ContactInfo = () => {
  return (
    <ul className="contact-info">
      {contactInfoItems.map(item => (
        <li key={item.text} className="icons">
          <a href={item.direct} rel="noopener noreferrer" target="_blank">
            {item.icon} {item.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default ContactInfo