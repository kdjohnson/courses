import BookIcon from '@material-ui/icons/ImportContacts'
import Button from 'material-ui/Button'
import React from 'react'

const mobileStyle = {
  margin: 'auto'
}

const style = {
  marginLeft: '1em'
}

export const getBookButton = (books, term, mobile, rightIconStyle) => {
  return (
    <div style={mobile ? mobileStyle : style}>
      <Button
        color="secondary"
        title="Buy Books"
        variant="raised"
        tabIndex="0"
        onClick={handleBuyBooks}
      >
        Buy Books
        <BookIcon className={rightIconStyle} />
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
          className="courses-portlet-react-form-submit"
          id="courses-portlet-react-form-submit"
          type="submit"
        />
      </form>
    </div>
  )
}

const handleBuyBooks = () => {
  document.getElementById('courses-portlet-react-form-submit').click()
}
