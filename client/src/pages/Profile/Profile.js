import React, { useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row'
import "./profile.css"
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../service/helper'
import axios from 'axios'

const Profile = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({})

  const handleUserDetail = async () => {
    const { data } = await axios.get(`${BASE_URL}/user-detail/${id}`);
    if (data.success) {
      setDetail(data.doc)
    }
  }
  useEffect(() => {
    handleUserDetail();
  }, [id])
  const getTimeandDate = (curr) => {
    return new Date(curr).toLocaleString();
  }
  return (
    <>
      <div className="container">
        <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
          <Card.Body>
            <Row>
              <div className="col">
                <div className="card-profile-stats d-flex justify-content-center">
                  <img width={100} height={100} src={detail.img?.url || "/man.png"} alt="" />
                </div>
              </div>
            </Row>
            <div className='text-center'>
              <h3>{detail?.fname}{" "}{detail?.lname}</h3>
              <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:- <span>{detail?.email}</span> </h4>
              <h5><i class="fa-solid fa-mobile"></i>&nbsp;:- <span>{detail?.mobile}</span> </h5>
              <h4><i class="fa-solid fa-person"></i>&nbsp;:- <span>{detail?.gender}</span> </h4>
              <h4><i class="fa-solid fa-location-pin location"></i>&nbsp;:- <span>{detail?.location}</span> </h4>
              <h4>Status&nbsp;:- <span>{detail?.status}</span> </h4>
              <h5><i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Created&nbsp;:- <span>{getTimeandDate(detail.createdAt)}</span> </h5>
              <h5> <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Updated&nbsp;:- <span>{getTimeandDate(detail.updatedAt)}</span> </h5>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Profile