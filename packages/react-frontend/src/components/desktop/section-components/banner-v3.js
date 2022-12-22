import React, { Component } from "react";
import sectiondata from "../../../data/sections.json";
import { Link } from "react-router-dom";

class BannerV3 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imagealt = "image";
    let data = sectiondata.bannerv3;

    return (
      <div className="flex my-40 h-max">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="text-center col-span-12 sm:text-left sm:col-span-3 flex flex-col justify-center space-y-10">
              <h1
                className="text-5xl font-extrabold"
                data-wow-duration="1s"
                data-wow-delay="0.3s"
              >
                {data.subtitle}{" "}
                <span className="text-redletter">{data.secitoncolor}</span>
              </h1>
              <p
                className="font-nomral"
                data-wow-duration="1s"
                data-wow-delay="0.6s"
              >
                {data.content1}
                <br />
                {data.content2}
              </p>
              <div
                className="btn-wrapper desktop-left padding-top-20 wow animated fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="0.9s"
              >
                <Link to="/read-more">
                  <a
                    href="#"
                    className="bg-redletter text-white p-4 rounded-lg drop-shadow-md"
                  >
                    {data.btntxt}
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden col-span-0 sm:col-span-9 sm:block">
              <img
                style={{ width: "100%", top: "200px" }}
                className="header-inner-img"
                src={publicUrl + data.bannerimage}
                alt={imagealt}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerV3;
