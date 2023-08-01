import { constants } from "../../../../constants";
import './map.scss';

const { website } = constants;

const ContactMap = () => {
  return (
    <div className="contact-map">
      <iframe
        title={website.name}
        src={website.mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=''
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactMap;
