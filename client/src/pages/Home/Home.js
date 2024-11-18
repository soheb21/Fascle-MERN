import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Tables from '../../components/Tables/Tables';
import Spiner from "../../components/Spiner/Spiner"
import { useNavigate } from "react-router-dom"
import "./home.css"
import axios from 'axios';
import { BASE_URL } from '../../service/helper';
import { globalState } from '../../context/GlobalContext';

const Home = () => {

  const { setData } = useContext(globalState)

  const [showspin, setShowSpin] = useState(true)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("All")
  const [gender, setGender] = useState("All")
  const [sort, setSort] = useState("new")
  const [page, setPage] = useState(1)
  const [totalpage, setTotalPage] = useState(0)
  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register")
  }
  const fetchingData = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}?search=${search}&gender=${gender}&page=${page}&sort=${sort}&status=${status}`)
      setData(data.doc)
      setTotalPage(data.pagination.pageCount)

    } catch (e) {
      console.log("Data-Fetching Error", e)

    }

  }
  useEffect(() => {
    const timerOut = setTimeout(() => {
      fetchingData();
    }, [800])

    return () => clearTimeout(timerOut)

  }, [search, gender, status, page, sort])

  useEffect(() => {
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [])

  return (
    <>
      <div className="container">
        <div className="main_div">
          {/* search add btn */}
          <div className="search_add mt-4 ">
            <div className="search col-lg-12">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="primary" >Search</Button>
              </Form>
            </div>
            <div className="add_btn mt-4">
              <Button variant="primary" onClick={adduser}> <i className="fa-solid fa-plus"></i>&nbsp; Add User</Button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div mt-3 mb-4 d-flex justify-content-between flex-wrap">
            {/* <div className="export_csv">
              <Button className='export_btn'>Export To Csv</Button>
            </div> */}
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => setGender(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"male"}
                    onChange={(e) => setGender(e.target.value)}

                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* short by value */}
            <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")} >New</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner /> : <Tables setPage={setPage} page={page} totalpage={totalpage} />
        }

      </div>
    </>
  )
}

export default Home