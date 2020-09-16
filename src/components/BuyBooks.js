import React from 'react'

import BookIcon from '@material-ui/icons/ImportContacts'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  button: {
    paddingTop: 10,
  },
  icon: {
    paddingLeft: 5,
    marginTop: -7,
  },
}))

export default function BuyBooks(props) {
  const { books } = props
  const classes = useStyles()

  const handleBuyBooks = () => {
    document.getElementById('courses-soffit-react-form-submit').click()
  }

  return (
    <div>
      <Button
        color='secondary'
        title='Buy Books'
        variant='contained'
        tabIndex='0'
        onClick={handleBuyBooks}
        className={classes.button}
      >
        Buy Books
        <BookIcon className={classes.icon} />
      </Button>
      <form
        name='BNForm'
        method='post'
        target='_blank'
        rel='noopener noreferrer'
        action='https://securex.bncollege.com/webapp/wcs/stores/servlet/TBListView'
        hidden
      >
        <input type='hidden' name='storeId' value='13551' />
        <input type='hidden' name='catalogId' value='10001' />
        <input type='hidden' name='langId' value='-1' />
        <input type='hidden' name='termMapping' value='N' />
        <input type='hidden' name='courseXml' value={books} />
        <button
          className='courses-soffit-react-form-submit'
          id='courses-soffit-react-form-submit'
          type='submit'
        />
      </form>
    </div>
  )
}
