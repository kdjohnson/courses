import React from "react"
import Button from "material-ui/Button"
import AttachMoney from "material-ui-icons/AttachMoney"

const booksFab = {
  position: "absolute",
  right: 0,
  bottom: 0,
  margin: 12,
  marginRight: 28
}

export const getBookButton = books => {
  return (
    <div style={booksFab}>
      <Button
        fab
        color="accent"
        onClick={handleBuyBooks}
        title="Buy Books"
        aria-label="Buy Books"
        tabIndex="0"
      >
        <AttachMoney />
      </Button>
      <form
        name="BNForm"
        method="post"
        target="_blank"
        rel="noopener noreferrer"
        action="http://oakland.bncollege.com/webapp/wcs/stores/servlet/TBListView"
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
  document.getElementById("courses-portlet-react-form-submit").click()
}
