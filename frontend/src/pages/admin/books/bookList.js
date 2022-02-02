import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { MDBDataTableV5 } from "mdbreact"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { connect } from "react-redux"
import { setBreadcrumbItems } from "../../../store/actions"
import "../../bills/datatables.scss"
import { doGet } from "../../../axios/restutils.js"

const BookList = props => {
  const breadcrumbItems = [
    { title: "Jaypee Group", link: "#" },
    { title: "Books", link: "#" },
    { title: "List", link: "#" },
  ]
  
  const [change, setChange] = useState(false)

  
  
  const assembleCompany = tableCont => {
    let companies = tableCont.map((company, index) => {
      return {
        id: company.id,
        name: company.name,
        author: company.author,
        category: company.categories,
        issued: company.is_issued?"Yes":"No",
      }})
    return companies
  }
  useEffect(() => {
    props.setBreadcrumbItems("Book List", breadcrumbItems)
    const getData = async () => {
      const tableCont = await doGet("book-list/all")
      setData({ ...data, rows: assembleCompany(tableCont.data) })
    }
    getData()
  }, [change])

  const [data, setData] = useState({
    columns: [
      {
        label: "Name",
        field: "name",
        width: 0,
      },
      {
        label: "Author",
        field: "author",
        width: 0,
      },
      {
        label: "Category",
        field: "category",
        width: 0,
      },
      {
        label: "Issued",
        field: "issued",
        width: 0,
      },
    ],
    rows: [],
  })
  return (
    <React.Fragment>
      <MetaTags>
        <title>Book List</title>
      </MetaTags>
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <CardTitle className="h4">Book List </CardTitle>
              <br></br>
              <MDBDataTableV5
                responsive
                hover
                bordered
                data={data}
                filter="company_name"
                searchBottom={false}
                searchTop
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BookList)
