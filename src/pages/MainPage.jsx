import React from "react";
import {
  Routes,
  Route,
  Outlet,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { GiGraduateCap } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { BsCreditCard2Back } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styleCss/main-page.css";
import { Card, Container, Row } from "reactstrap";
import CardItem from "../component/Card/CardItem";

function MainPage() {
  const dataUser = useSelector(({ authState }) => authState.data);
  const navigate = useNavigate();

  const navigateToAdmin=()=>{
    navigate('/admin')
  }

  return (
    <section>
      <Container fluid="xl" className="py-5 px-3">
        <Row className="gap-2">
          <h1 className="title">
            <GiGraduateCap /> Selamat Datang
          </h1>
          <h2 className="subtitle">Sistem Pembayaran Pendidikan Sekolah</h2>
        </Row>
        <Row
          xs={1}
          md={1}
          lg={3}
          className="px-4 mt-5 gap-3 flex-flex-nowrap justify-content-center"
        >
          <CardItem
            text="Login Admin"
            onClick={navigateToAdmin}
            logo={<HiOutlineDesktopComputer size={120} />}
          />
          <CardItem
            text="Cek Pembayaran Siswa"
            logo={<BsCreditCard2Back size={120} />}
          />
        </Row>
      </Container>
    </section>
  );
}

export default MainPage;
