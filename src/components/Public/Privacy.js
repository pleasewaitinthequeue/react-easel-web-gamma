import React, {Component } from 'react';

class Privacy extends Component{
    render(){
        return(
            <nav>
                <h1>
                    The EASEL Privacy Policy
                </h1>
                <p>
                    The EASEL application collects instructional data to assist the user directly.
                </p>
                <p>
                    The EASEL application allows the user to enter and store the following data for their benefit:
                </p>
                <ul>
                    <li>
                        User Identifiable Information
                    </li>
                    <li>
                        University Course Information
                    </li>
                    <li>
                        Curriculum and Instructional Information
                    </li>
                    <li>
                        Lesson Information
                    </li>
                    <li>
                        Audio / Video / Photographic Information
                    </li>
                </ul>
                <p>
                    The EASEL application will in turn provide access to this data via a Web application, as well
                    as a Mobile Application.  The application may provide push notifications, emails, and other
                    reminders with user permission.
                </p>

            </nav>
        );
    }
}

export default Privacy;