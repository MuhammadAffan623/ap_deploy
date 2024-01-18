import { Col, Row } from 'antd'
import { useState, useEffect } from 'react'
import { FaBuilding, FaFilter, FaPerson } from 'react-icons/fa6'
import { Button, Card, ContactCard, Loader, SearchField } from '~/components'
import './styles.scss'
import AddEditContact from './AddEditContact'
import { useLazyGetAllContactQuery } from '~/store/services/contact.services'

const Contacts = () => {
  const [users, setUsers] = useState<Partial<IUser>[]>([])
  const [addEditContactModalOpen, setAddEditContactModalOpen] = useState(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [contact, setContact] = useState<Partial<IUser> | null>(null)
  const [pagination] = useState<IPagination>({
    pageSize: 20,
    current: 1,
    total: 0
  })
  const [search, setSearch] = useState('')

  const [getAllContacts, { data, isLoading }] = useLazyGetAllContactQuery()

  const handleCloseAddEditContactModal = (status: boolean) => {
    setAddEditContactModalOpen(status)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleContactCardClick = (user: Partial<IUser>) => {
    setContact(user)
    setAddEditContactModalOpen(true)
  }
  useEffect(() => {
    if (data) {
      setUsers(data?.data?.contacts)
    }
  }, [data])

  useEffect(() => {
    const timeout = setTimeout(() => {
      getAllContacts({ pagination, search })
        .unwrap()
        .then((res) => {
          console.log(res)
        })
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [pagination, search])
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
                onChange={handleSearchChange}
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
                  setContact(null)
                  setEdit(false)
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Card>
      </Row>

      <Row gutter={[30, 30]} style={{ height: '100%' }}>
        {isLoading ? (
          <Col span={24} style={{ height: '100%' }}>
            <Loader dark />
          </Col>
        ) : (
          users.map((user) => {
            return (
              <ContactCard
                user={user}
                key={user?._id as string}
                onClick={() => {
                  handleContactCardClick(user)
                  setEdit(true)
                }}
              />
            )
          })
        )}
      </Row>

      <AddEditContact
        open={addEditContactModalOpen}
        handleClose={handleCloseAddEditContactModal}
        contact={contact as IUser}
        isEdit={edit}
      />
    </>
  )
}

export default Contacts
