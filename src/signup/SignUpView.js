import React from "react";
import { Label, Input, Form, Button } from 'reactstrap'


const SignUpView = ({ onSubmit}) => {

    return (
        <div>
            <h1>Sign Up</h1>

                <Form onSubmit={onSubmit}>
                    <Label>Email: </Label>
                    <Input
                        type="email"
                        name="email"
                        label="Password"
                        component={Input}
                        required="true"
                    />
                    <br/>
                    <br/>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        component={Input}
                        required="true"
                        minLength={6}
                    />
                    <br/>
                    <br/>
                    <Label>Confirm Password</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        component={Input}
                        required="true"
                        minLength={6}

                    />
                        <br/>
                            <br/>
                    <Button type="submit">Sign Up</Button>
                </Form>


        </div>
    );
};

export default SignUpView;
