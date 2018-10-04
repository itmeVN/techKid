import React, {Component} from 'react';
import axios from 'axios';
import {Form,FormGroup,Input,Button} from 'reactstrap'
class NewGame extends Component{
    handleSubmitForm = (event) =>{
        event.preventDefault();
        axios({
            url: 'http://localhost:6969/',
            method: 'POST',
            data:{

            }
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }

    handleInputChange = (event) =>{
        console.log(event.target.value);
        console.log(event.target.name);
    }
    render(){
        return(
            <Form>
                <FormGroup>
                        <Input
                            onChange = {this.hendleInputChange}
                            className="border boder-danger"
                            type="text"
                            placeholder="Player1"
                            name="player1"
                            required
                        />
                </FormGroup>
                <FormGroup>
                        <Input
                        onChange = {this.hendleInputChange}
                         className="border boder-danger"
                            type="text"
                            placeholder="Player2"
                            name="player2"
                            required
                        />
                </FormGroup>
                <FormGroup>
                        <Input
                        onChange = {this.hendleInputChange}
                         className="border boder-danger"
                            type="text"
                            placeholder="Player3"
                            name="player3"
                            required
                        />
                </FormGroup>
                <FormGroup>
                        <Input
                        onChange = {this.hendleInputChange}
                         className="border boder-danger"
                            type="text"
                            placeholder="Player4"
                            name="player4"
                            required
                        />
                </FormGroup>
                <FormGroup className=" text-center">
                        <Button type="submit" color="danger"  className="border boder-danger">Create New Game </Button>
                </FormGroup>
            </Form>
        )
    }
}

export default NewGame;