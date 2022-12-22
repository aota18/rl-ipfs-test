import React, { Component } from "react";
import sectiondata from "../../../data/sections.json";

class Services_V3 extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgattr = "image";
    let data = sectiondata.servicesv3;

    return (
      <div>
        <div className="px-24">
          <div className="container">
            <div className="grid grid-cols-12 gap-12">
              {data.items.map((item, i) => (
                <div key={i} className="col-span-12 sm:col-span-4">
                  <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="">
                      <img src={publicUrl + item.icon} alt={imgattr} />
                    </div>
                    <h6 className="text-xl font-bold text-redletter">
                      {item.title}
                    </h6>
                    <p className="text-gray-500">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Services_V3;
