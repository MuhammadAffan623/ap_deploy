import { Divider, Space, Typography, theme as antTheme } from 'antd'
import { useState } from 'react'
import './style.scss'
import { HiPaperClip } from 'react-icons/hi2'

const LibraryViewCart = ({ defaultShow = 5, links, title }: any) => {
  const [expanded, setExpanded] = useState(false)
  const theme = antTheme.useToken()
  const isExpandTextShown = links?.length > 5
  const sliceLinks = isExpandTextShown && !expanded ? links.slice(0, defaultShow) : links
  const remainingLength = links.length - links.slice(0, defaultShow).length
  return (
    <div className='library-view-cart-container'>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Divider />
      <div style={{ color: theme.token.colorLink }}>
        {links?.length &&
          sliceLinks.map((link: any): any => (
            <Typography.Text
              key={link}
              onClick={() => {
                alert('in testing')
              }}
              className='library-view-cart-link-text'
            >
              <HiPaperClip /> {link}
            </Typography.Text>
          ))}

        {isExpandTextShown && !expanded ? (
          <Typography.Text
            className='library-view-cart-show-more'
            onClick={() => {
              setExpanded(true)
            }}
          >
            Show {remainingLength} more items...
          </Typography.Text>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default LibraryViewCart
