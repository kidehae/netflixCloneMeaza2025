import React from "react";
import "./Footer.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
function footer() {
  return (
    <>
      <div className="footer_outer_container">
        <div className="footer_inner_container">
          <div className="footer_icons">
            <FacebookOutlinedIcon />
            <InstagramIcon />
            <YouTubeIcon />
          </div>
          <div className="footer_data">
            <div>
              <ul>
                <li> Audio Description</li>
                <li> Investor Relations</li>
                <li> Legal Notice</li>
              </ul>
            </div>
            <div>
              <ul>
                <li> Help Center</li>
                <li> Jobs</li>
                <li> Cookie Preferences</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Gift Card</li>
                <li>Terms of use</li>
                <li>Corporate Information</li>
              </ul>
            </div>
            <div>
              <ul>
                <li>Media Center</li>
                <li>Privacy</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="service_code">
            <p>Service Code</p>
          </div>
          <div className="copy-write">&copy; 1997-2025 Netflix, Inc.</div>
        </div>
      </div>
    </>
  );
}

export default footer;
