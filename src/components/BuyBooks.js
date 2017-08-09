import React from "react"
import Button from "material-ui/Button"

const mobileStyle = {
  display: "flex",
  justifyContent: "center"
}

export const getBookButton = (books, term, mobile) => {
  return (
    <div style={mobile ? mobileStyle : null}>
      <Button
        color="accent"
        title="Buy Books"
        raised
        tabIndex="0"
        onClick={handleBuyBooks}
      >
        View books for {term}
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
