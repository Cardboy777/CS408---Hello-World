import React, { Component } from 'react';
import './css/DisplayMessage.css';

class DisplayMessage extends Component {

  render() {
    return (
        <div>
            {this.props.me === this.props.msg.from ?
                <div>
                    <div className='message message-self'>
                        {this.props.msg.message}
                    </div>
                    {this.props.last ?
                        <p>{this.props.msg.timestamp}</p>
                    :
                        <React.Fragment/>
                    }
                    <br className='clearfloat'/>
                </div>
            :
                <div>
                    <div className='message message-sender-self'>
                       {this.props.msg.message}
                    </div>
                    {this.props.last ?
                        this.props.msg.timestamp
                    :
                        <React.Fragment/>
                    }
                    <br className='clearfloat'/>
                </div>
            }
        </div>
    );
  }
}

export default DisplayMessage;
