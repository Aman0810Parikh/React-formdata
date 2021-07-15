import { object } from 'prop-types';
import React, { useState } from 'react'
import './style.css'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
//---------------------------------------------------------------------------------------------------------------------//


//--------------------------------------------------------------------------------------------------------------------//
class Create extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            mobile: null,
            dob: null,
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                dob: "",
                submit: ""
            }
        };
    }

    //-------------------------------------------------------------------------------------------------------------------//
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        let data = {
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            email: this.refs.email.value,
            mobile: this.refs.mobile.value,
            dob: this.refs.dob.value

        };
        //---------------------------------------post------------------------------------------------------------------------//
            if(!(this.refs.firstName.value == 0 ||  this.refs.lastName.value ==0  || this.refs.email.value==0 || this.refs.mobile.value==0 )){
                let data = {
                    firstName: this.refs.firstName.value,
                    lastName: this.refs.lastName.value,
                    email: this.refs.email.value,
                    mobile: this.refs.mobile.value,
                    dob: this.refs.dob.value
                };
                alert("succesfully Saved")
                fetch(" http://localhost:3333/comments", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }).then((resp) => {
                    // console.warn("resp",resp);;
                    resp.json().then((result) => {
                        console.warn("result", result)
                    })
                })
            }
    };

    //---------------------------------------ERROR CHECKING------------------------------------------------------------//
    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                   value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "mobile":
                formErrors.mobile =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };



    //--------------------------------------------------------------------------------------------------------------------//
    render(Submit) {
        const { formErrors } = this.state;

        //-------------------------------------------------------------------------------------------------------------------//
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1>Create Account</h1>
                    <form onSubmit={this.handleSubmit} noValidate required>
                        <div className="firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className={formErrors.firstName.length > 0 ? "error" : null}
                                placeholder="First Name"
                                type="text"
                                name="firstName"
                                ref="firstName"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {
                                formErrors.firstName.length > 0 ?
                                    <div className="errorMessage">{formErrors.firstName}</div>
                                    :this.state.firstName ==null ?<span className="errorMessage">FisrtName require</span>
                                    : ""
                            }
                        </div>
                        <div className="lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className={formErrors.lastName.length > 0 ? "error" : null}
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                noValidate
                                ref="lastName"
                                onChange={this.handleChange}
                            />
                            {formErrors.lastName.length > 0 ?
                                <span className="errorMessage">{formErrors.lastName}</span> : this.state.lastName ==null ?<span className="errorMessage">Lastname require</span>
                                : ""
                            }
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email</label>
                            <input
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                ref="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 ?
                                <span className="errorMessage">{formErrors.lastName}</span>:this.state.email ==null ?<span className="errorMessage">Email require</span>
                                : ""
                              
                            }
                        </div>
                        <div className="mobile">
                            <label htmlFor="mobile">Mobile :</label>
                            <input
                                className={formErrors.mobile.length > 0 ? "error" : null}
                                placeholder="Mobile"
                                type="tell"
                                name="mobile"
                                ref="mobile"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.mobile.length > 0 ?
                                <span className="errorMessage">{formErrors.mobile}</span> :this.state.mobile ==null ?<span className="errorMessage">Mobile require</span>
                                : ""
                                
                            }
                        </div>
                        <div className="dob">
                            <label htmlFor="dob">Date Of Birth : </label>
                            <input
                                className={formErrors.dob.length > 0 ? "error" : null}
                                type="date"
                                name="dob"
                                ref="dob"
                                noValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="createAccount">
                            <button type="submit">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Create
