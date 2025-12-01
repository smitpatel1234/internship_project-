import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Card, CardMedia, IconButton, CircularProgress, Alert } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import { uploadFiles, downloadFile, getFilePreviewUrl } from "../../services/fileService";
import {Divider} from '@mui/material'
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({ formik, name, disabled = false }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState({});

  useEffect(() => {
    if (formik.values[name] && Array.isArray(formik.values[name])) {
      setUploadedFiles(formik.values[name]);
      loadPreviewUrls(formik.values[name]);
    }
  }, [formik.values[name], name]);

  const loadPreviewUrls = async (files) => {
    const urls = {};
    for (const file of files) {
      try {
        const url = await getFilePreviewUrl(file.path);
        urls[file.path] = url;
      } catch (error) {
        console.error(`Failed to load preview for ${file.name}:`, error);
      }
    }
    setPreviewUrls(urls);
  };

  const handleChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadedFilesData = await uploadFiles(files);

      const newUrls = { ...previewUrls };
      for (const file of uploadedFilesData) {
        try {
          const url = await getFilePreviewUrl(file.path);
          newUrls[file.path] = url;
        } catch (error) {
          console.error(`Failed to load preview for ${file.name}:`, error);
        }
      }
      setPreviewUrls(newUrls);

      const newFiles = [...uploadedFiles, ...uploadedFilesData];
      setUploadedFiles(newFiles);

      await formik.setFieldValue(name, newFiles);
    } catch (error) {
      setUploadError(`Upload failed: ${error.message}`);
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleDelete = (index) => {
    const deletedFile = uploadedFiles[index];
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    formik.setFieldValue(name, newFiles);

    const newUrls = { ...previewUrls };
    delete newUrls[deletedFile.path];
    setPreviewUrls(newUrls);
  };

  const handleDownload = async (fileData) => {
    try {
      await downloadFile(fileData.path, fileData.name);
    } catch (error) {
      setUploadError(`Download failed: ${error.message}`);
    }
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        disabled={disabled || isUploading || formik.isSubmitting}
        className="uploadButton"
        sx={{
          minHeight: "48px",
          minWidth: "160px",
          fontSize: "14px",
          fontWeight: "600",
          textTransform: "none",
          borderRadius: "6px",
          margin: "16px",
          
        }
      }
      >
        {isUploading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Uploading...
          </>
        ) : (
          "Upload Images"
        )}
        <VisuallyHiddenInput
          name={name}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          disabled={disabled || isUploading}
        />
      </Button>

      {uploadError && (
        <Alert severity="error" sx={{ marginBottom: "16px" }}>
          {uploadError}
        </Alert>
      )}

      {uploadedFiles.length > 0 && (
       
        <Box >
          <Divider/>
          <h4 style={{margin:"10px"}}>Uploaded Files ({uploadedFiles.length})</h4>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {uploadedFiles.map((fileData, index) => (
              <Card key={index} sx={{ position: "relative", width: 180, height: 180 , margin: "10px" }}>
                <CardMedia
                  component="img"
                  image={previewUrls[fileData.path] || ""}
                  alt={fileData.name}
                  sx={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    backgroundColor: "#f5f5f5"
                  }}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999' font-family='sans-serif'%3ENo Preview%3C/text%3E%3C/svg%3E";
                  }}
                />
                <Box sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  display: "flex",
                  gap: "4px",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "0 4px 0 4px"
                }}>
                  <IconButton
                    size="small"
                    onClick={() => handleDownload(fileData)}
                    sx={{ color: "primary.main", padding: "4px" }}
                    title="Download"
                  >
                    <GetAppIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(index)}
                    sx={{ color: "error.main", padding: "4px" }}
                    title="Delete"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  color: "white",
                  padding: "4px",
                  fontSize: "11px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {fileData.name}
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
        
      )}
    </>
  );
}
