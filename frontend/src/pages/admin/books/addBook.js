import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import Select from "react-select"
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  UncontrolledAlert,
} from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../../store/actions"
import { doPut } from "../../../axios/restutils"
const AddBook = props => {
  const breadcrumbItems = [
    { title: "Jaypee Library", link: "/" },
    { title: "Add Book", link: "/book-add" },
  ]
  const handleSubmit = () => {
    doPut("book/0", formData)
      .then(response => {
        setFormData({
          name: "",
          author: "",
          categories: "",
        })
      })
      .catch(error => {
        setError(true)
        setErrorMessage(error)
      })
  }
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    categories: "",
  })
  const { name, author, categories } = formData
  useEffect(() => {
    props.setBreadcrumbItems("Add Book", breadcrumbItems)
  })
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <React.Fragment>
      <MetaTags>
        <title>Add Book</title>
      </MetaTags>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="h4">Add Book</CardTitle>
              <p className="card-title-desc">Please Enter Book details</p>
              {error && (
                <UncontrolledAlert color="danger" role="alert">
                  {errorMessage}
                </UncontrolledAlert>
              )}
              {sucess && (
                <UncontrolledAlert color="success">
                  Book Added Successfully!!!
                </UncontrolledAlert>
              )}
              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Name :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={e => handleChange(e)}
                    type="text"
                    id="example-number-input"
                  />
                </div>
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Author :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    name="author"
                    value={author}
                    onChange={e => handleChange(e)}
                    type="text"
                    id="example-number-input"
                  />
                </div>
              </Row>
              <Row className="mb-3">
                <label
                  htmlFor="example-email-input"
                  className="col-md-2 col-form-label"
                >
                  Category :
                </label>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    name="categories"
                    value={categories}
                    onChange={e => handleChange(e)}
                    type="text"
                    id="example-number-input"
                  />
                </div>
              </Row>
              <Row>
                <div className="col-10 text-end">
                  <button
                    className="btn btn-primary w-md waves-effect waves-light"
                    type="submit"
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    Add Book
                  </button>
                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(AddBook)
