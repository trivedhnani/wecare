import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer class="footer">
      {/* <div class="bottom_border">
        <div class="row divider">
          <div class=" col-sm-4 col-md  col-6 col">
            <h5 class="col_white_footermain pt2">ABOUT</h5>
            <ul class="footer_ul_align">
              <li>
                <a href="/">Contact Us</a>
              </li>
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a href="/">Careers</a>
              </li>
            </ul>
          </div>
          <div class=" col-sm-4 col-md  col-6 col">
            <h5 class="col_white_footermain pt2">HELP</h5>
            <ul class="footer_ul_align">
              <li>
                <a href="/">Payments</a>
              </li>
              <li>
                <a href="/">Shipping</a>
              </li>
              <li>
                <a href="/">Cancellation & Returns</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>
          <div class=" col-sm-4 col-md  col-6 col">
            <h5 class="col_white_footermain pt2">POLICY</h5>
            <ul class="footer_ul_align">
              <li>
                <a href="/return">Return Policy</a>
              </li>
              <li>
                <a href="/terms">Terms Of Use</a>
              </li>
              <li>
                <a href="/security">Security</a>
              </li>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
            </ul>
          </div>
          <div class=" col-sm-4 col-md  col-12 col">
            <h5 class="col_white_footermain pt2">Mail Us</h5>
            <ul class="footer_ul_align">
              <li>
                <a href="mailto:wecareteam@gmail.com">
                  <i class="fa fa fa-envelope fleft padding-right"></i>{" "}
                </a>
                <p>
                  360 Huntington Avenue Boston, Massachusetts, MA-02115
                  Telephone:<a href="tel:(857)-869-7841"> (857)-869-7841</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div class="containerfooter">
        <ul class="foote_bottom_ul_align">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Services</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </ul>
        <p class="text-center">Copyright @ 2020 We Care </p>
        <ul class="social_footer_ul">
          <li>
            <a href="https://www.facebook.com" target="_blank">
              <i class="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank">
              <i class="fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank">
              <i class="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank">
              <i class="fa fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
