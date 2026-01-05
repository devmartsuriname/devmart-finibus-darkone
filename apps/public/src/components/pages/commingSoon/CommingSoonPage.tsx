import React from "react";
import DateCounter from "./DateCounter";
import { useSystemSettings } from '../../../hooks/useSystemSettings';

// Default message (Finibus original)
const DEFAULT_MESSAGE = "Donec bibendum enim ut elit porta ullamcorper. Vestibulum Naiquam nulla, venenatis eget dapibus catali topuny wekemdini iaculis vitae nulla.";

function CommingSoonPage() {
  const { settings } = useSystemSettings();
  
  // Use custom message if provided, otherwise use default
  const displayMessage = settings.coming_soon_message || DEFAULT_MESSAGE;
  return (
    <>
      <section className="comming-soon">
        <div className="comming-soon-left">
          <div className="cngs-content">
            <h1>Coming Soon</h1>
            <p>{displayMessage}</p>
            <DateCounter />
            <div className="subscribe-mail">
              <form
                onSubmit={(e) => e.preventDefault()}
                action="#"
                method="post"
              >
                <input type="email" name="email" placeholder="Email Address" />
                <input type="submit" defaultValue="Send Now" />
              </form>
            </div>
            <ul className="social-icons">
              <li>
                <a href="https://www.facebook.com/">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com/">
                  <i className="fab fa-pinterest-p" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/">
                  <i className="fab fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="comming-soon-right">
          <img src="/images/commingsoon.jpg" alt="images" />
        </div>
      </section>
    </>
  );
}

export default CommingSoonPage;
