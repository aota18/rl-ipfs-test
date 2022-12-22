import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import footerdata from '../../../data/footerdata.json';
import { AiFillTwitterCircle } from 'react-icons/ai';

class Footer_V2 extends Component {
  componentDidMount() {
    let publicUrl = process.env.PUBLIC_URL + '/';

    const minscript = document.createElement('script');
    minscript.async = true;
    minscript.src = publicUrl + 'assets/js/main.js';

    document.body.appendChild(minscript);
  }

  render() {
    let publicUrl = process.env.PUBLIC_URL + '/';
    let imgAlt = 'footer logo';

    return (
      <div>
        <footer className="flex flex-col py-16 border-y">
          <div className="container">
            <div className="footer-widget-area mg-top-120">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-6">
                  <div className="footer-widget widget">
                    <div className="about_us_widget space-y-8">
                      <a href="/" className="footer-logo">
                        <img
                          style={{ width: '2rem' }}
                          src={publicUrl + footerdata.footerlogo}
                          alt={imgAlt}
                        />
                      </a>
                      <p className="text-gray-500">{footerdata.footertext}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="footer-widget widget space-y-8">
                    <h4 className="text-xl font-bold text-redletter">
                      {footerdata.contactwidget.title}
                    </h4>
                    <div className="contact_info_list space-y-8">
                      <a
                        href={footerdata.socialurl.twitter}
                        className="flex space-x-4 cursor-pointer items-center text-gray-500"
                      >
                        <AiFillTwitterCircle />
                        <span>@redlettereth</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-3">
                  <div className="footer-widget widget">
                    <h4 className="widget-title">
                      {footerdata.latestnews.title}
                    </h4>
                    <div className="about_recent_post">
                      {footerdata.latestnews.items.map((item, i) => (
                        <div key={i} className="media">
                          <img src={publicUrl + item.image_url} alt={imgAlt} />
                          <div className="media-body">
                            <h6 className="riyaqas-nav">
                              <Link to={item.url}>{item.title}</Link>
                            </h6>
                            <span>{item.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="copyright-inner text-center pt-8">
            <div
              className="copyright-text text-gray-500"
              dangerouslySetInnerHTML={{ __html: footerdata.copyrighttext }}
            ></div>
            <div>Version: ##version##</div>
          </div>
        </footer>
        <div className="back-to-top">
          <span className="back-top">
            <i className="fa fa-angle-up"></i>
          </span>
        </div>
      </div>
    );
  }
}

export default Footer_V2;
