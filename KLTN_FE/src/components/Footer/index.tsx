import React from "react";
import {
  IoIosArrowUp,
  IoIosPhonePortrait,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMdHeart,
  IoMdMail,
  IoMdPhonePortrait,
} from "react-icons/io";

import { BiCurrentLocation } from "react-icons/bi";
import { Link } from "react-router-dom";

interface FooterPageProps {}

export const FooterPage = (props: FooterPageProps) => {
  return (
    <footer className="ftco-footer ftco-section" id="footer">
      <div className="container">
        <div className="row">
          <div className="mouse">
            <a href="#" className="mouse-icon">
              <div className="mouse-wheel">
                <IoIosArrowUp />
              </div>
            </a>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">SportStore</h2>
              <p>"Cửa hàng đồ thể thao"</p>
              <ul
                className="
									ftco-footer-social
									list-unstyled
									float-md-left float-lft
									mt-5
								"
              >
                <li className="ftco-animate">
                  <a
                    href="https://www.facebook.com/buitrunghieu2606/"
                    className="footer-social"
                  >
                    <IoLogoTwitter />
                    {/* <span className='icon-twitter'></span> */}
                  </a>
                </li>
                <li className="ftco-animate">
                  <a
                    href="https://www.facebook.com/buitrunghieu2606/"
                    className="footer-social"
                  >
                    <IoLogoFacebook />
                    {/* <span className='icon-facebook'></span> */}
                  </a>
                </li>
                <li className="ftco-animate">
                  <a
                    href="https://www.instagram.com/bt_hieu20/"
                    className="footer-social"
                  >
                    <IoLogoInstagram />
                    {/* <span className='icon-instagram'></span> */}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-5">
              <h2 className="ftco-heading-2">Dịch vụ</h2>
              <ul className="list-unstyled">
                <li>
                  <Link to="/Shop" className="py-2 d-block">
                    Trang chủ
                  </Link>
                </li>

                <li>
                  <Link to="/" className="py-2 d-block">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/Contact" className="py-2 d-block">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Hỗ trợ</h2>
              <div className="d-flex">
                <ul className="list-unstyled mr-l-5 pr-l-3 mr-4">
                  <li>
                    <Link to="/" className="py-2 d-block">
                      Phương thức vận chuyển
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="py-2 d-block">
                      Chính sách đổi trả
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="py-2 d-block">
                      Phương thức thanh toán
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="py-2 d-block">
                      Chính sách bảo mật
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Liên hệ chúng tôi</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <BiCurrentLocation />
                    {/* <span className='icon icon-map-marker'></span> */}
                    <span className="text">
                      01 Võ Văn Ngân, Thủ Đức, Thành Phố Hồ Chí Minh
                    </span>
                  </li>
                  <p></p>
                  <li>
                    <Link to="/">
                      <IoMdPhonePortrait />
                      {/* <span className='icon icon-phone'></span> */}

                      <span className="text">+0912 345 678</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <IoMdMail />
                      {/* <span className='icon icon-envelope'></span> */}
                      <span className="text">sportstore@gmail.com</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            {/* <p>
              Copyright &copy; 2022 All rights reserved | This template is made
              with <IoMdHeart />
              by {""}
              <a
                href="https://www.facebook.com/buitrunghieu2606/"
                target="_blank"
              >
                freshbook@gmail.com
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};
