import React, { Component } from 'react';
import './css/ReportButton.css';

class DisplayMessage extends Component {

  render() {
    return (
        <div>
            {this.props.me === this.props.msg.from ?
                <div>
                    <div className='message message-self'>
                        {this.props.msg.message}
                    </div>
                    
                    <br className='clearfloat'/>
                </div>
            :
                <div>
                    <div className='message message-sender'>
                       {this.props.msg.message}
                    </div> 
                    <br className='clearfloat'/>
                </div>
            }
        </div>
    );
  }
}

export default DisplayMessage;
