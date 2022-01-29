import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTableV5 } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle, Button, Modal } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../store/actions"
import "./datatables.scss"
import axios from "../../axios/axios"
import { doGet, doPatch, doDelete } from "../../axios/restutils"
import BillToModal from "./billtomodal"
import SweetAlert from "react-bootstrap-sweetalert"

const DatatableTables = props => {
  const breadcrumbItems = [
    { title: "SKRKMK", link: "#" },
    { title: "PARTY", link: "#" },
    { title: "Party List", link: "#" },
  ]
  const [modalshow, setModalshow] = useState(false)
  const toggle = () => {
    setModalshow(!modalshow)
  }
  const [change, setChange] = useState(false)

  const customStyles = {
    content: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }

  const ModelContent = () => {
    const [editable, seteditable] = useState(false)
    const [formExpense, setFormExpense] = useState({
      id: content.expense ? content.expense.id : 0,
      tulai: content.expense ? content.expense.tulai : 0,
      dharmada: content.expense ? content.expense.dharmada : 0,
      loading_charges: content.expense ? content.expense.loading_charges : 0,
      wages: content.expense ? content.expense.wages : 0,
      mandi_shulk: content.expense ? content.expense.mandi_shulk : 0,
      sutli: content.expense ? content.expense.sutli : 0,
      commision: content.expense ? content.expense.commision : 0,
      vikas_shulk: content.expense ? content.expense.vikas_shulk : 0,
      bardana: content.expense ? content.expense.bardana : 0,
      others: content.expense ? content.expense.others : 0,
    })
    const [formData, setFormData] = useState({
      name: content.name,
      address: content.address,
      gstin: content.gstin,
      bill_type: content.bill_type,
      state: content.state,
      state_code: content.state_code,
    })
    const [success_dlg, setsuccess_dlg] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [dynamic_title, setdynamic_title] = useState("")
    const [dynamic_description, setdynamic_description] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)
    const [nameError, setNameError] = useState(null)
    const [addressError, setAddressError] = useState(null)
    const [stateError, setStateError] = useState(null)
    const [error_dlg, seterror_dlg] = useState(false)
    const assembleformdata = (formData, formExpense) => {
      return {
        bill_to: formData,
        expense: formExpense,
      }
    }
    const handledeleteclick = () => {
      setConfirmDelete(true)
    }
    const handleSubmit = () => {
      const data = assembleformdata(formData, formExpense)
      console.log(data)
      doPatch("api/bill-to/" + content.id, data)
        .then(() => {
          setSuccess(true)
          setSuccessMessage("Updated Successfully!!!")
        })
        .catch(function (error) {
          setError(true)
          if (error.response) {
            console.log(error.response)
            if (error.response.status === 400) {
              setErrorMessage("Please fill the form correctly")
              if (error.response.data.name) {
                setNameError(error.response.data.name[0])
              }
              if (error.response.data.address) {
                setAddressError(error.response.data.address[0])
              }
              if (error.response.data.state) {
                setStateError("Please select a state")
              }
            } else if (error.response.status === 500) {
              setErrorMessage("Internal Server Error")
            }
          } else if (error.request) {
            setErrorMessage("Please check your internet connection")
          } else {
            setErrorMessage("Error", error.message)
          }
        })
    }
    const deleteclicks = () => {
      doDelete("api/bill-to/" + content.id)
        .then(response => {
          setConfirmDelete(false)
          setsuccess_dlg(true)
          setdynamic_title("Deleted")
          setdynamic_description("Party deleted Successfully.")
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
          setConfirmDelete(false)
          seterror_dlg(true)
          setdynamic_title("Error")
          setdynamic_description(errorMessage)
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
          {success ? (
            <SweetAlert
              title="Party Edited Successfully"
              success
              confirmBtnText="Ok"
              confirmBtnBsStyle="success"
              onConfirm={() => {
                setSuccess(false)
                seteditable(false)
                setChange(true)
                setModalshow(false)
              }}
            ></SweetAlert>
          ) : null}
          {error && (
            <SweetAlert
              title={errorMessage}
              error
              timeout={5000}
              showConfirm={true}
              onConfirm={() => {
                setError(false)
              }}
            >
              {nameError ? <br></br> : <></>}
              {nameError ? "Name : " + nameError : ""}
              {addressError ? <br></br> : <></>}
              {addressError ? "Address To : " + addressError : ""}
              {stateError ? <br></br> : <></>}
              {stateError ? "State : " + stateError : ""}
            </SweetAlert>
          )}
          {success_dlg ? (
            <SweetAlert
              success
              title={dynamic_title}
              onConfirm={() => {
                setsuccess_dlg(false)
                setModalshow(false)
                setChange(!change)
              }}
            >
              {dynamic_description}
            </SweetAlert>
          ) : null}
          {error_dlg ? (
            <SweetAlert
              error
              title={dynamic_title}
              onConfirm={() => {
                seterror_dlg(false)
                setModalshow(false)
                setChange(!change)
              }}
            >
              {dynamic_description}
            </SweetAlert>
          ) : null}
          {confirmDelete ? (
            <SweetAlert
              title="Are you sure?"
              warning
              showCancel
              confirmButtonText="Yes, delete it!"
              confirmBtnBsStyle="success"
              cancelBtnBsStyle="danger"
              onConfirm={() => {
                deleteclicks()
              }}
              onCancel={() => setConfirmDelete(false)}
            >
              Do you really want to delete this file? This can't be revert back.
              Please think again
            </SweetAlert>
          ) : null}
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
            <BillToModal
              content={content}
              formExpense={formExpense}
              setFormExpense={setFormExpense}
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
                  handledeleteclick()
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
        expense: company.expense,
        address: company.address,
        state: company.state,
        state_code: company.state_code,
        bill_type: company.bill_type,
        id: company.id,
        clickEvent: e => {
          handleRowClick(e)
        },
      }
    })
    return companies
  }
  useEffect(() => {
    props.setBreadcrumbItems("Party List", breadcrumbItems)
    const getData = async () => {
      const tableCont = await axios.get("api/bill-to-list/all")
      setData({ ...data, rows: assembleCompany(tableCont.data) })
    }
    getData()
  }, [change])

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
        label: "Mandi In",
        field: "bill_type",
        width: 200,
      },
      {
        label: "Address",
        field: "address",
        width: 150,
      },
      {
        label: "State",
        field: "state",
        width: 100,
      },
    ],
    rows: [],
  })
  return (
    <React.Fragment>
      <MetaTags>
        <title>Party List</title>
      </MetaTags>
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <CardTitle className="h4">Party List </CardTitle>
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
