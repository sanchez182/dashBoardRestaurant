import React, { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import Button from '@material-ui/core/Button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

export const UploadImage = () => {
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef<any>(null);
   
 
    const onUpload = (event:any) => {
           //   toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
    const onSelect = (event:any) => {
        if(fileUploadRef.current.files.length> 1){
         fileUploadRef.current.files.splice(0,1)
        }
     //   toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
    


    return (
        <div>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <div className="card">
        {/*         <FileUpload multiple={false}  onUpload={onUpload}
                onSelect={onSelect}
                 ref={fileUploadRef} 
                 name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php"  accept="image/*" maxFileSize={1000000}
                    emptyTemplate={<p className="p-m-0">Drag and drop files=</p>} /> */}
                         <input
        accept="image/*"
        style={{display:"none"}}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
  </div>
        </div>
    )
}

export default UploadImage