//packages
import React from "react";
import ReactDOM from 'react-dom';

const Modal = props => {
    if(props.show){
        return ReactDOM.createPortal(
            <div onClick={props.onDismiss} className="ui dimmer modals visible active">
                <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                    <div className="header">
                        {props.header}
                    </div>
                    <div className="content">
                        {props.content}
                    </div>
                    <div className="actions">
                        {props.actions}
                    </div>
                </div>
            </div>,
            document.querySelector('#modal')
        )
    } else return <></>

    
}

export default Modal;