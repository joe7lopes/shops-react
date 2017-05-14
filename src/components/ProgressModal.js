import React from 'react';

const ProgressModal = ({progress}) =>(

    <div id="showProgress" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Saving, change this layout</h4>
                        </div>
                        <div class="modal-body">
                            <p>Saving
                                <strong>{" " + progress + " "}</strong>
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-dismiss="modal">OK</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>

                </div>
            </div>

);

export default ProgressModal;