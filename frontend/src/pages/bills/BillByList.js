import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTableV5 } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, Modal } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import "./datatables.scss"
import { doDelete, doGet, doPatch } from "../../axios/restutils"
import BillModal from "./billmodal"
const DatatableTables = props => {
  const breadcrumbItems = [
    { title: "SKRKMK", link: "#" },
    { title: "COMPANY", link: "#" },
    { title: "Company List", link: "#" },
  ]
  const [modalshow, setModalshow] = useState(false)
  const toggle = () => {
    setModalshow(!modalshow)
  }

  const ModelContent = () => {
    const [editable, seteditable] = useState(false)
    const [formData, setFormData] = useState(content)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const assembleformdata = formData => {
      return {
        name: formData.name,
        gstin: formData.gstin,
        mobile1: formData.mobile1,
        mobile2: formData.mobile2,
        address: formData.address,
        state: formData.state,
        state_code: formData.state_code,
        bank_name: formData.bank_name,
        bank_branch: formData.bank_branch,
        bank_account_no: formData.bank_account_no,
        bank_ifsc: formData.bank_ifsc,
      }
    }
    const handleSubmit = () => {
      const data = assembleformdata(formData)
      doPatch("api/bill-by/" + content.id, data)
        .then(() => {
          setSuccess(true)
          setSuccessMessage("Updated Successfully!!!")
          seteditable(false)
        })
        .catch(function (error) {
          setError(true)
          if (error.response) {
            if (error.response.status === 400) {
              setErrorMessage("Something went wrong!!! Please try again later")
            } else if (error.response.status === 500) {
              setErrorMessage("Something went wrong!!! Please try again later")
            }
          } else if (error.request) {
            setErrorMessage("Please check your internet connection")
          } else {
            setErrorMessage("Error", error.message)
          }
        })
    }
    const deleteclicks = () => {
      doDelete("api/bill-by/" + content.id)
        .then(response => {
          setSuccess(true)
          setSuccessMessage("Deleted Successfully!!!")
        })
        .catch(function (error) {
          setError(true)
          if (error.response) {
            if (error.response.status === 400) {
              setErrorMessage("Something went wrong!!! Please try again later")
            } else if (error.response.status === 500) {
              setErrorMessage("Something went wrong!!! Please try again later")
            }
          } else if (error.request) {
            setErrorMessage("Please check your internet connection")
          } else {
            setErrorMessage("Error", error.message)
          }
        })
    }
    return (
      <Col sm={12} md={3} className="mt-4">
        <Modal
          size="lg"
          isOpen={modalshow}
          toggle={() => {
            toggle()
          }}
          centered={true}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myLargeModalLabel">
              {content.name}
            </h5>
            <button
              onClick={() => {
                toggle()
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <BillModal
              content={content}
              setFormData={setFormData}
              formData={formData}
              editable={editable}
              success={success}
              error={error}
              errorMessage={errorMessage}
              successMessage={successMessage}
              setError={setError}
              setSuccess={setSuccess}
            />
          </div>
          <div className="modal-footer">
            <div className="col-1 text-end">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={() => {
                  deleteclicks()
                }}
              >
                DELETE
              </button>
            </div>
            <div className="col-9 text-end">
              {!editable ? (
                <button
                  className="btn btn-warning w-md waves-effect waves-light"
                  type="submit"
                  onClick={() => {
                    seteditable(true)
                  }}
                >
                  EDIT
                </button>
              ) : (
                <button
                  className="btn btn-success w-md waves-effect waves-light"
                  type="submit"
                  onClick={() => {
                    handleSubmit()
                  }}
                >
                  SUBMIT
                </button>
              )}
            </div>
          </div>
        </Modal>
      </Col>
    )
  }
  const [content, setContent] = useState({})
  const handleRowClick = props => {
    setModalshow(true)
    setContent(props)
  }
  const assembleCompany = tableCont => {
    let companies = tableCont.map(company => {
      return {
        name: company.name,
        gstin: company.gstin,
        mobile1: company.mobile1,
        mobile2: company.mobile2,
        address: company.address,
        bank_account_no: company.bank_account_no,
        state: company.state,
        state_code: company.state_code,
        bank_name: company.bank_name,
        bank_branch: company.bank_branch,
        bank_ifsc: company.bank_ifsc,
        id: company.id,
        clickEvent: e => {
          handleRowClick(e)
        },
      }
    })
    return companies
  }
  useEffect(() => {
    props.setBreadcrumbItems("Company List", breadcrumbItems)
    const getData = async () => {
      const tableCont = await doGet("api/bill-by-list/all")
      setData({ ...data, rows: assembleCompany(tableCont.data) })
    }
    getData()
  }, [])

  const [data, setData] = useState({
    columns: [
      {
        label: "Name",
        field: "name",
        width: 150,
      },
      {
        label: "GSTIN",
        field: "gstin",
        width: 270,
      },
      {
        label: "Mobile No.",
        field: "mobile1",
        width: 200,
      },
      {
        label: "Alternative Mobile No.",
        field: "mobile2",
        width: 100,
      },
      {
        label: "Address",
        field: "address",
        width: 150,
      },
    ],
    rows: [],
  })
  return (
    <React.Fragment>
      <MetaTags>
        <title>Company List</title>
      </MetaTags>
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <CardTitle className="h4">Company List </CardTitle>
              <br></br>
              <MDBDataTableV5
                responsive
                hover
                bordered
                data={data}
                filter="position"
                searchBottom={false}
                barReverse
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {modalshow ? <ModelContent /> : null}
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(DatatableTables)
