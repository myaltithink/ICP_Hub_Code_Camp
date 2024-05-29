import { useEffect, useState } from 'react';
import { icp_project_backend } from 'declarations/icp_project_backend';

import { Card, Form, Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

import { db } from './firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

const sampleContent = "some card contentsome card contsomecontentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card contentsome card content";


function App() {

  const [showModal, setShowModal] = useState(false);

  const [display, setDisplay] = useState([]);

  const [firestoreCollection, setFirestoreCollection] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    postedAt: ''
  })

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) return
    const fsCollection = collection(db, "rants");
    setFirestoreCollection(fsCollection);
    initialize(fsCollection);
    setInit(true)
  })

  const initialize = async (fsCollection) => {
    await getDocs(fsCollection)
      .then(query => {
        let newDisplay = []
        query.docs.map(doc => {
          const data = doc.data()
          newDisplay.push({
            title: data.title,
            content: data.content,
            postedAt: data.postedAt,
            showMore: false
          })
        })
        setDisplay(newDisplay)
      })
  }

  function toggleModal() {
    setShowModal(!showModal);
    setFormData({
      title: '',
      content: '',
      postedAt: ''
    })
  }

  const toggleShowMore = (index) => {
    const newDisplays = display.map((display, i) => {
      if (index === i) display.showMore = !display.showMore;
      return display;
    })
    setDisplay(newDisplays)
  }

  const createRant = () => {

    const rant = {
      ...formData,
      postedAt: new Date().toDateString()
    }

    const doc = addDoc(firestoreCollection, rant)
      .then((result) => {
        let displays = display;
        const newRant = {
          ...rant,
          showMore: false
        }
        displays.unshift(newRant)
        setDisplay(displays)
        toggleModal()
      })

  }

  const handleTextChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    })
  }

  return (
    <main>
      <div className="title-container center">
        <div>
          <h3>BURant</h3>
          <p>A place where you can rant about Baliuag University annonymously</p>
          <Button variant='contained' color='success' className='add-btn' onClick={toggleModal}>
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: "10px" }} />
            Create a Rant
          </Button>
        </div>
      </div>

      <div className="rant-list center">
        <div>
          {display.length === 0 ?
            <p className='no-rant'>There are currently no rant to be seen</p>
            :
            display.map((rant, index) => (
              <Card className='item' key={`rant-${index}-${rant.showMore}`}>
                <Card.Header>
                  <h4 style={{ margin: "0" }} className='title'>{rant.title}</h4>
                  <small className='posted-at'>Posted At: {rant.postedAt}</small>
                </Card.Header>
                <Card.Body>
                  <p style={{ whiteSpace: 'pre' }}>
                    {rant.showMore ? rant.content : `${rant.content.substring(0, 30)}........`}
                    {(rant.content.length <= 38) ?
                      null
                      :
                      <Button variant='text' color='success' className='show-more' onClick={() => toggleShowMore(index)}>{rant.showMore ? "Show Less" : "Show More"}</Button>
                    }
                  </p>
                </Card.Body>
              </Card>
            ))

          }

        </div>
      </div>

      <Modal show={showModal} onHide={toggleModal}>

        <Modal.Header>
          <Modal.Title>Create Rant</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control onChange={handleTextChange} value={formData.title} />
            </Form.Group>
            <br />
            <Form.Group controlId='content'>
              <Form.Label>Content</Form.Label>
              <textarea rows={6} id='content' onChange={handleTextChange} value={formData.content} className='form-control'></textarea>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='contained' onClick={toggleModal} style={{ marginRight: '10px' }}>Close</Button>
          <Button variant='contained' color='success' onClick={createRant}>Submit</Button>
        </Modal.Footer>

      </Modal>

    </main>
  );
}


export default App;
