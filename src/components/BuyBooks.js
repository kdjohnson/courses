import React from 'react'

import BookIcon from '@material-ui/icons/ImportContacts'
import Button from '@material-ui/core/Button'

const mobileStyle = {
  marginLeft: '0px'
}

const style = {
  marginLeft: '1em'
}

const icon = {
  paddingRight: 5,
  marginLeft: -5
}

export const getBookButton = (books, mobile) => {
  return (
    <div style={mobile ? mobileStyle : style}>
      <Button
        color="secondary"
        title="Buy Books"
        variant="contained"
        tabIndex="0"
        onClick={handleBuyBooks}
      >
        <BookIcon style={icon}/>
        Buy Books
      </Button>
      <form
        name="BNForm"
        method="post"
        target="_blank"
        rel="noopener noreferrer"
        action="https://securex.bncollege.com/webapp/wcs/stores/servlet/TBListView"
        hidden
      >
        <input type="hidden" name="storeId" value="13551" />
        <input type="hidden" name="catalogId" value="10001" />
        <input type="hidden" name="langId" value="-1" />
        <input type="hidden" name="termMapping" value="N" />
        <input type="hidden" name="courseXml" value={books} />
        <button
          className="courses-soffit-react-form-submit"
          id="courses-soffit-react-form-submit"
          type="submit"
        />
      </form>
    </div>
  )
}

const handleBuyBooks = () => {
  document.getElementById('courses-soffit-react-form-submit').click()
}
