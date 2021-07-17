const React = require("react");

function ModalLarge(props) {
    return(
        <React.Fragment>
            <div className="modal fade" id={props.idModal}>
                <div className={props.large ? `modal-dialog modal-${props.large}`: `modal-dialog modal-lg` }>{/* xl modla extra large */}
                    <div className="modal-content bg-dafault">{/* bg-danger success secondary */}
                        <div className="modal-header">
                            <h4 className="modal-title">{props.title}</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        {/* <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
        </React.Fragment>
    );   
}
export default ModalLarge;