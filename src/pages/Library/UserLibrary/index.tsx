import { Card } from '~/components'
import './styles.scss'
import { Col, Typography } from 'antd'
import { useGetLibrariesMutation } from '~/store/services/library.service'
import { useEffect } from 'react'


const UserLibrary = () => {
  const [getLibrary, { data }] = useGetLibrariesMutation()

  useEffect(() => {
    getLibrary('')
  }, [])

  return (
    <>
      {(data?.data?.libraryItems || []).map(
        (item: { title: string; fileUrl: string; category: string }) => (
          <Card className='Card-text'>
            <>
              <Typography.Title level={3}>{item?.title}</Typography.Title>
              <hr className='straight-line' />
              <div className='text'>
                <Col>
                  <>
                    <a href={item?.fileUrl}>{item?.category}</a>
                  </>
                </Col>
              </div>
            </>
          </Card>
        )
      )}
    </>
  )
}

export default UserLibrary
