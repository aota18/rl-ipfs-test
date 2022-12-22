import React, { Component } from "react";
import sectiondata from "../../../data/sections.json";

class Soft_Box_Leftside_Image extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgattr = "image";
    let data = sectiondata.softboxleftsideimage;

    return (
      <div className="my-20">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 sm:col-span-6 ">
            <img src={publicUrl + "img/what-are-sbts.png"} alt={imgattr} />
          </div>
          <div className="col-span-12 sm:col-span-6 flex flex-col justify-center">
            <div className="flex flex-col space-y-4">
              <h2 className="text-3xl font-extrabold">
                {data.sectiontitle_part1}{" "}
                <span className="text-redletter">
                  {data.sectiontitle_color}
                </span>
              </h2>
              <p className="text-gray-500 leading-8">
                {data.short_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div className="leftside-image-area service-area sbs-business-tool pd-bottom-120 mg-top-120">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 col-xl-7 wow animated fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="0.3s"
              >
                <img src={publicUrl + "img/what-are-sbts.png"} alt="img" />
              </div>
              <div className="col-xl-5 col-lg-6 desktop-center-item">
                <div
                  className="desktop-center-area wow animated fadeInLeft"
                  data-wow-duration="1s"
                  data-wow-delay="0.3s"
                >
                  <div className="section-title style-two">
                    <h2 className="title">
                      {data.sectiontitle_part1}{" "}
                      <span>{data.sectiontitle_color}</span>
                    </h2>
                    <p>{data.short_description}</p>
                  </div>
                  {/* <div className="row">
                    <div className="col-lg-9">
                      {data.list_item.map((item, i) => (
                        <div key={i} className="riyaqas-check-list media">
                          <img
                            className="media-left"
                            src={publicUrl + item.icon}
                            alt={imgattr}
                          />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Soft_Box_Leftside_Image;
