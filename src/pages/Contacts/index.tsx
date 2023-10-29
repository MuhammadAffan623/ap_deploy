import { Col, Row } from 'antd'
import { useState } from 'react'
import { FaBuilding, FaFilter, FaPerson } from 'react-icons/fa6'
import { Button, Card, ContactCard, SearchField } from '~/components'
import { getMockUsers } from '~/mocks'
import './styles.scss'
import AddEditContact from './AddEditContact'

const Contacts = () => {
  const [mockUsers] = useState<Partial<IUser>[]>(getMockUsers(11, 'random', 'random'))
  const [addEditContactModalOpen, setAddEditContactModalOpen] = useState(false)
  const [contact, setContact] = useState<Partial<IUser>>({})

  const handleCloseAddEditContactModal = (status: boolean) => {
    if (status) {
      setAddEditContactModalOpen(false)
    } else {
      setAddEditContactModalOpen(false)
    }
  }

  const handleContactCardClick = (user: Partial<IUser>) => {
    setContact(user)
    setAddEditContactModalOpen(true)
  }

  return (
    <>
      <Row gutter={48} className='topBar'>
        <Card
          className='topBarCard'
          style={{ borderRadius: 0, flexGrow: 1 }}
          bodyStyle={{ padding: '12px 24px' }}
        >
          <Row gutter={16} align='middle'>
            <Col style={{ flexGrow: 1 }}>
              <SearchField
                placeholder='Search Contacts'
                className='contactSearchField'
                onChange={(e) => {
                  console.log(e.target.value)
                }}
                inverseBg
                suffix={
                  <Button
                    type='text'
                    className='filterButton'
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('filter')
                    }}
                  >
                    <FaFilter />
                  </Button>
                }
              />
            </Col>
            <Col>
              <Button type='text' className='divButton' icon={<FaBuilding />}>
                DIV
              </Button>
            </Col>
            <Col>
              <Button
                type='primary'
                className='addContactButton'
                icon={<FaPerson />}
                onClick={() => {
                  setAddEditContactModalOpen(true)
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Card>
      </Row>

      <Row gutter={[30, 30]}>
        {mockUsers.map((user) => {
          return (
            <ContactCard
              user={user}
              key={user?._id as string}
              onClick={() => handleContactCardClick(user)}
            />
          )
        })}
      </Row>

      <AddEditContact
        open={addEditContactModalOpen}
        handleClose={handleCloseAddEditContactModal}
        contact={contact}
      />
    </>
  )
}

export default Contacts
