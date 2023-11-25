import { Col, Row, Space } from 'antd'
import { LibraryViewCart } from '~/components'
import { getMocksLibraryView } from '~/mocks'

const LibraryView = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <LibraryViewCart links={getMocksLibraryView(5)} title={'401(K)'} />
            <LibraryViewCart links={getMocksLibraryView(2)} title={'Compliance and Training'} />
            <LibraryViewCart links={getMocksLibraryView(63)} title={'Field Safety - SDS center'} />
            <LibraryViewCart links={getMocksLibraryView(6)} title={'Human Resources'} />
            <LibraryViewCart links={getMocksLibraryView(6)} title={'Human Dental & Vision'} />
          </Space>
        </Col>
        <Col span={24} md={12}>
          <LibraryViewCart links={getMocksLibraryView(16)} title={'Compliance'} />
        </Col>
      </Row>
    </div>
  )
}

export default LibraryView
