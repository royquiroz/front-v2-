import React, { Component } from "react";
import { Container, Segment, Grid, List, Image } from "semantic-ui-react";
import MessageUser from "./Message";
import { sentMessages, receivedMessages } from "../../service";

class Mailbox extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      sent: [],
      addressee: [],
      msg: {}
    };
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    sentMessages(user._id).then(res => {
      this.setState({ sent: res.messages });
    });
    receivedMessages(user._id).then(res => {
      this.setState({ addressee: res.messages });
    });

    this.setState({ user: user });
  }

  handleCheck = msg => {
    this.setState({ msg: msg });
  };

  render() {
    let { sent, addressee, msg } = this.state;
    return (
      <Container fluid style={{ padding: "5% 2% 0 2%" }}>
        <Grid.Column>
          <Grid celled="internally">
            <Grid.Column width="4">
              List
              <Segment style={{ overflowY: "auto", height: "500px" }}>
                <div>
                  <h3>Recibidos {sent.length}</h3>
                  <List divided selection verticalAlign="middle">
                    {sent.map((msg, i) => (
                      <List.Item key={i} onClick={() => this.handleCheck(msg)}>
                        <Image avatar src={msg.addressee.profile_pic} />
                        <List.Content>
                          <List.Header>
                            {msg.addressee.name} {msg.addressee.last_name}
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </div>
                {addressee.length < 0 ? (
                  <div>
                    <h3>Enviados</h3>
                    <List divided selection verticalAlign="middle">
                      {addressee.map((msg, i) => (
                        <List.Item
                          key={i}
                          onClick={() => this.handleCheck(msg.comment)}
                        >
                          <Image avatar src={msg.sent.profile_pic} />
                          <List.Content>
                            <List.Header>
                              {msg.sent.name} {msg.sent.last_name}
                            </List.Header>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  </div>
                ) : null}
              </Segment>
            </Grid.Column>
            <Grid.Column width="12">
              Messages
              {Object.keys(msg).length === 0 ? null : <MessageUser msg={msg} />}
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Container>
    );
  }
}

export default Mailbox;