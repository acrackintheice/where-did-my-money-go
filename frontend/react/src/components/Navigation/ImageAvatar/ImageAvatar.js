import React from 'react'
import './image-avatar.css'
import { Image } from 'semantic-ui-react'

const ImageAvatar = props => (
  <div className='image-avatar'>
    <Image src={props.image} avatar />
  </div>
)

export default ImageAvatar
