import React, { Component } from "react";
import sectiondata from "../../../data/sections.json";

class Talented_People extends Component {
  render() {
    let publicUrl = process.env.PUBLIC_URL + "/";
    let imgattr = "image";

    return (
      <div className="my-20">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 sm:col-span-4 flex flex-col justify-center">
            <div className="space-y-4 ">
              <h2 className="text-3xl font-extrabold">
                {sectiondata.talentedpeople.sectiontitle}
              </h2>
              <p className="text-gray-500 leading-8">
                {sectiondata.talentedpeople.short_description}
              </p>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-8">
            <div className="world-map-wrap">
              <img
                src={publicUrl + sectiondata.talentedpeople.image}
                alt={imgattr}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Talented_People;
