import React from 'react';
import { useDropzone } from 'react-dropzone';
import '../../assets/Dropzone.css';

function Dropzone(props) {
    const [selectedFileMsg, setSelectedFileMsg] = React.useState('No File Selected');

    // Make callback function to do something. The name is up to you
    const onDrop = React.useCallback((acceptedFiles) => {
        // this callback throw value to parent component
        props.onDrop(acceptedFiles);
        // this method to set state value
        setSelectedFileMsg('Selected File:')
    }, [props]);

    // Include the function above to init
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        onDrop,
        noClick: false,
        noKeyboard: true
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            <b>{file.path} - [{file.size/1000} kB]</b>
        </li>
    ));

    return (
        <div className="dz">
            {acceptedFiles.length > 0 ? <div {...getRootProps({ className: 'dropzone rounded d-none' })}>
                <input {...getInputProps()} />
                <p className="ml-3 mt-2 font-weight-bolder">Drop some files here or Click</p>
                <button className="btn btn-primary btn-rounded" type="button" onClick={open}>
                    Browse
                </button>
            </div>
            :<div {...getRootProps({ className: 'dropzone rounded' })}>
                <input {...getInputProps()} />
                <p className="ml-3 mt-2 font-weight-bolder">Drop some files here or Click</p>
                <button className="btn btn-primary btn-rounded" type="button" onClick={open}>
                    Browse
                </button>
            </div>
            }
            <aside className="mt-1 ml-5">
                <h6>{selectedFileMsg}</h6>
                <ul>{files}</ul>
            </aside>
        </div>
    );
};

export default Dropzone;