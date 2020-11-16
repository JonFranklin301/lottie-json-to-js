import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { CSSTransition } from 'react-transition-group';
import jsonToJs from './jsonToJs';

const FileProcessor = () => {
  const [filePaths, setFilePaths] = useState([]); // the empty string is the default value
  const [processorCompleted, setProcessorCompleted] = useState(false);
  const [btnDisabed, setBtnDisabed] = useState(false);

  // processorCompleted, used to show the completed message for 2s and disable buttons
  useEffect(() => {
    let processorCompletedTimer;
    if (processorCompleted === true) {
      setBtnDisabed(true);
      processorCompletedTimer = setTimeout(() => {
        setProcessorCompleted(false);
        setBtnDisabed(false);
      }, 2000);
    }
    return () => {
      clearTimeout(processorCompletedTimer);
    };
  }, [processorCompleted]);

  // DROZONE
  const onDrop = useCallback((acceptedFiles) => {
    const filePathsTemp = [];
    acceptedFiles.forEach((file) => {
      filePathsTemp.push(file.path);
      // setFilePaths([...filePaths, file.path]);
    });
    setFilePaths(filePathsTemp);
  }, []);

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragActive,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: 'application/json',
    disabled: processorCompleted,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.name}</li>
  ));

  // Process the files. This will convert the .json file to a .js file.
  const processFiles = () => {
    if (filePaths.length === 0) return;
    jsonToJs(
      {
        varName: 'animationData',
        banner: `Converted: ${new Date().toLocaleString()}. File:`,
        save: true,
        path: filePaths,
      },
      (data) => {
        console.log(data);
        setProcessorCompleted(true);
      }
    );
  };

  // Clear the file list
  const clearFiles = () => {
    setFilePaths([]);
    acceptedFiles.splice(0, acceptedFiles.length);
  };

  return (
    <Fragment>
      <div className="btnGroup">
        <button
          className="btn btnGreen btnProcess"
          onClick={processFiles}
          disabled={btnDisabed}
        >
          Process Files
        </button>
        <button
          className="btn btnRed btnClear"
          onClick={clearFiles}
          disabled={btnDisabed}
        >
          Clear Files
        </button>
      </div>

      <CSSTransition
        in={processorCompleted}
        timeout={200}
        classNames="processorCompletedAnimation"
      >
        <div className="processorCompletedAnimation">
          <div>{'Files Processed! '}&#128512;</div>
        </div>
      </CSSTransition>

      <div
        {...getRootProps({
          className: `dropzone ${isDragActive ? 'active' : ''}`,
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop JSON files here</p>
        <button
          className="btn btnDark btnOpen"
          type="button"
          onClick={open}
          disabled={btnDisabed}
        >
          Click to select files
        </button>
      </div>

      <aside className="fileList">
        {acceptedFiles.length !== 0 && <h4>Files to Convert:</h4>}
        <ul>{files}</ul>
      </aside>
    </Fragment>
  );
};

export default FileProcessor;
