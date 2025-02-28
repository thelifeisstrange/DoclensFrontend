import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { toast } from "react-toastify";
import {
  Box,
  CardMedia,
  Stack,
  Typography,
  Card,
  CardContent,
  Button,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";

const BatchUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [type, setType] = useState("");
  const [links, setLinks] = useState([]);
  const urls = {
    aadhaar: "http://127.0.0.1:8000/verification/ext_aadhaar/",
    gate: "http://127.0.0.1:8000/verification/ext_marksheet/",
    marksheet: "http://127.0.0.1:8000/verification/ext_marksheet/",
  };
  const [status, setStatus] = useState(null);
  const [finalData, setFinalData] = useState([]);

  const handleUpload = () => {
    if (type.length === 0) {
      toast.error("select a type aadhaar,gate,marksheet");
      return;
    }
    documents.forEach((element) => {
      const doc = new FormData();
      doc.append("image", element);
      fetch("http://127.0.0.1:8000/verification/upload-image/", {
        method: "POST",
        body: doc,
      })
        .then((response) => response.json())
        .then((data) => {
          setLinks((l) => [...l, data.file_path]); // Append response immediately
          return fetch("http://127.0.0.1:8000/verification/extract_data/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ link: data.file_path, type }),
          });
        })
        .then((response2) => response2.json())
        .then((data2) => {
          setFinalData((l) => [...l, data2]);
          console.log(data2);
        })
        .catch((error) => console.error("Fetch error:", error));
    });
    console.log(links);
  };
  return (
    <Stack
      paddingX={"100px"}
      paddingY={"20px"}
      borderRadius={5}
      sx={{ backgroundColor: "white" }}
      // boxShadow={"0px 0px 20px gray"}
      // justifyContent={"center"}
      // alignItems={"center"}
    >
      <NavBar />
      <Stack spacing={3} marginTop={"34px"} marginBottom={"50px"}>
        <Typography variant="h3" alignSelf={"center"}>
          Batch Upload
        </Typography>
        <h2>Upload Files:</h2>
        <Stack justifyContent={"center"} alignItems={"start"} spacing={3}>
          <input
            type="file"
            multiple
            onChange={(e) => {
              setDocuments(Array.from(e.target.files));
              console.log(Array.from(e.target.files));
            }}
          />
            <FormControl sx={{width:'25%'}}>
              <InputLabel id="type-label">Type of Doc</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                value={type}
                label="Type of Doc"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <MenuItem value={"aadhaar"}>Aadhaar</MenuItem>
                <MenuItem value={"marksheet"}>Marksheet</MenuItem>
              </Select>
            </FormControl>
          <Button
            onClick={handleUpload}
            variant="contained"
            // className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            Upload
          </Button>
        </Stack>
        {/* <div className="">
          {documents.map((file, index) => (
            <div key={index} className="">
              {file.name}
            </div>
          ))}
        </div> */}
      </Stack>
      <hr />
      <Stack spacing={3} marginTop={"50px"}>
        {finalData.length !== 0 ? (
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h4">Extracted Data:</Typography>
            <Button
              color='error'
              variant='outlined'
              onClick={() => {
                setFinalData([]);
                setLinks([]);
              }}
            >
              Reset Data
            </Button>
          </Stack>
        ) : (
          ""
        )}
        <Stack flexWrap={"wrap"} spacing={4}>
          {finalData.map((data, i) => {
            return (
              // <Stack
              //   width={"500px"}
              //   height={"200px"}
              //   color={"gray"}
              //   backgroundColor={"black"}
              //   direction={"column"}
              //   justifyContent={"space-between"}
              // >
              //   <img src={data.link} alt="no" />
              //   <pre>{JSON.stringify(data.data, null, 2)}</pre>
              <Card
                key={i}
                sx={{ display: "flex", padding: "10px", height: "200px" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography component="div" variant="h5">
                    <pre>{JSON.stringify(data.data, null, 2)}</pre>
                  </Typography>
                </Box>
                {/* <CardMedia
                component="img"
                image={data.link}
                alt={data.link}
              /> */}
              </Card>
              // </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BatchUpload;
