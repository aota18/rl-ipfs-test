import React, { Component } from "react";
import sectiondata from "../../../data/sections.json";

class Soft_Box_About extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgattr = "image";
    let data = sectiondata.softboxabout;
    const inlineStyle = {
      // backgroundImage:
      //   "url(" + publicUrl + sectiondata.softboxabout.bgimg + ")",
    };

    return (
      <div className="my-20">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 sm:col-span-6 ">
            <img src={publicUrl + data.imgurl} alt={imgattr} />
          </div>
          <div className="col-span-12 sm:col-span-6 flex flex-col justify-center">
            <div className="flex flex-col space-y-4">
              <h2 className="text-3xl font-extrabold">
                {data.sectiontitle}{" "}
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
  }
}

export default Soft_Box_About;
