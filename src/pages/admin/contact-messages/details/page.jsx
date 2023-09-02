import { useEffect, useState } from "react";
import { constants } from "../../../../constants";
import { useNavigate, useParams } from "react-router-dom";
import { Loading, SectionHeader, TableRow } from "../../../../components";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { utils } from "../../../../utils";
import { services } from "../../../../services";
import "./style.scss";

const { routes } = constants;

const tableItems = [
  {
    title: "Name",
    content: "name",
  },
  {
    title: "Email",
    content: "email",
  },
  {
    title: "Subject",
    content: "subject",
  },
  {
    title: "Message",
    content: "body",
  },
];

const AdminContactMessageDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({});
  const [deleting, setDeleting] = useState(false);

  const { contactMessageId } = useParams();
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const messageData = await services.contact.getMessage(contactMessageId);
      setMessage(messageData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeMessage = async () => {
    setDeleting(true);
    try {
      await services.contact.deleteMessage(contactMessageId);
      utils.functions.swalToast("Message deleted successfully.", "success");
    } catch (error) {
      utils.functions.swalToast(
        "There was an error while deleting the message.",
        "error"
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    utils.functions.swalQuestion(
      "Are you sure you want to delete this message?",
      "You won't be able to revert this action!"
    )
    .then((result) => {
      if (result.isConfirmed) {
        removeMessage();
      }
    })
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading ? (
    <Loading height={500} />
  ) : (
    <div className="admin-contact-message-details-page">
      <SectionHeader title1="Message" title2="Details" />
      <div className="content">
        <table>
          <tbody>
            {tableItems.map((item, index) => (
              <TableRow
                key={index}
                title={item.title}
                content={message[item.content]}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttons-container">
        <ButtonGroup>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting && <Spinner animation="border" size="sm" />} Delete
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => navigate(`${routes.adminContactMessages}`)}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AdminContactMessageDetailsPage;
