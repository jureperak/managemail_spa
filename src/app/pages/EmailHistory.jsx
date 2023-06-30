import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ConfirmationDialog from "../components/ConfirmationDialog";
import DateFormatter from "../components/DateFormatter";
var uriTemplates = require('uri-templates');

function EmailHistory() {
  const [emailHistories, setEmailHistories] = useState([]);
  const [sorter, setSorter] = useState({ orderBy: 'dateCreated|desc' });
  const [emailHistory, setEmailHistory] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(async () => {
    await fetchEmailHistories(sorter);
  }, []);

  useEffect(async () => {
    await fetchEmailHistories(sorter);
  }, [sorter]);

  async function fetchEmailHistories(queryParams) {
    try {
      let template = new uriTemplates("https://localhost:44398/api/email-history/{?orderBy}");
      let url = '';
      if (queryParams) {
        url = template.fillFromObject(queryParams);
      }

      const response = await axios.get(url);
      setEmailHistories(response.data)
    } catch (error) {
      console.error(error);
    } 
  }

  async function onSortChange(field) {
    let splited = sorter.orderBy.split('|');

    if (splited) {
      if (splited[0] === field) {
        if (splited[1] === 'desc') {
          setSorter({ orderBy: `${field}|asc` });
        }
        else {
          setSorter({ orderBy: `${field}|desc` });
        }
      }
      else {
        setSorter({ orderBy: `${field}|desc` });
      }
    }
  }

  function showContent(element) {
    setEmailHistory(element);
    setShow(true);
  }

  return (
    <>
      <Table responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => onSortChange('fromEmailAddress')} style={{cursor: 'pointer', textDecoration: 'underline'}}>From Email Address</th>
            <th onClick={() => onSortChange('toEmailAddress')} style={{cursor: 'pointer', textDecoration: 'underline'}}>To Email Address</th>
            <th onClick={() => onSortChange('ccEmailAddress')} style={{cursor: 'pointer', textDecoration: 'underline'}}>CC Email Address</th>
            <th onClick={() => onSortChange('subject')} style={{cursor: 'pointer', textDecoration: 'underline'}}>Subject</th>
            <th onClick={() => onSortChange('content')} style={{cursor: 'pointer', textDecoration: 'underline'}}>Content</th>
            <th>Importance</th>
            <th onClick={() => onSortChange('dateCreated')} style={{cursor: 'pointer', textDecoration: 'underline'}}>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {emailHistories.map((element, index) => (
            <tr key={element.id}>
              <td>{index + 1}.</td>
              <td>{element.fromEmailAddress}</td>
              <td>{element.toEmailAddress}</td>
              <td>{element.ccEmailAddress}</td>
              <td>{element.subject}</td>
              <td onClick={() => showContent(element)} style={{cursor: 'pointer',textDecoration: 'underline'}}>{element.content.length > 100 ? `${element.content.substring(0,100)}...` : element.content}</td>
              <td>{element.importanceType.name}</td>
              <td><DateFormatter value={element.dateCreated} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmationDialog
        show={show}
        title={emailHistory.subject}
        content={emailHistory.content}
        primaryText="Close"
        handlePrimary={handleClose}
      />
    </>
  );
}

export default EmailHistory;