import React, { useContext } from 'react'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import "./table.css"
import { globalState } from '../../context/GlobalContext';
import Paginations from '../pagination/Paginations';
import { useNavigate } from 'react-router-dom';

const Tables = ({ page, setPage, totalpage }) => {
  const { data, handledelete, handleUpdateStatus } = useContext(globalState);
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className='shadow'>
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>FullName</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>&nbsp;&nbsp;&nbsp;Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data && data.length > 0 && data.map((i) => (
                      <tr key={i._id}>
                        <td>{i._id}</td>
                        <td>{i.fname}</td>
                        <td>{i.email}</td>
                        <td>{i?.gender?.toUpperCase()?.split("")[0]}</td>
                        <td className='d-flex align-items-center'>
                          <Dropdown className='text-center'>
                            <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                              <Badge bg={i.status === "Active" ? "primary" : "danger"}>
                                {i?.status} <i className="fa-solid fa-angle-down"></i>
                              </Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleUpdateStatus(i._id, "Active")} >Active</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleUpdateStatus(i._id, "InActive")}>InActive</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td className='img_parent'>
                          <img width={80} height={40} src={i?.img?.url} alt="" />
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => navigate(`/userprofile/${i._id}`)} >
                                <i className="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => navigate(`/edit/${i._id}`)}>
                                <i className="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span>
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => handledelete(i._id)} >
                                <i className="fa-solid fa-trash" style={{ color: "red" }}  ></i> <span>Delete</span>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </Table>
              <Paginations totalpage={totalpage} page={page} setPage={setPage} />
            </Card>
          </div>
        </Row>
      </div>
    </>
  )
}

export default Tables