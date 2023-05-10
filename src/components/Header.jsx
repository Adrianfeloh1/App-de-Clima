import React from 'react'

const Header = ({titulo}) => {
  return (
    <nav>
        <div className='nav-wrapper #00838f cyan darken-3'>
            <a href='#' className='brand-logo'>{titulo}</a>
        </div>
    </nav>
  )
}

export default Header