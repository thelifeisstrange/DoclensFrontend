import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { toast } from "react-toastify";
import { Box, CardMedia, Stack, Typography,Card,CardContent } from "@mui/material";

const BatchUpload = () => {
  const [documents, setDocuments] = useState([]);
  const [type, settype] = useState("");
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

    // let updated_doc = documents;
    // updated_doc = updated_doc.map((e) => new File([e], `${type}@${e.name}`));
    // console.log(updated_doc);

    // setDocuments(updated_doc);
    // updated_doc.forEach((element) => {
    //   const doc = new FormData();
    //   doc.append("image", element);
    //   fetch("http://127.0.0.1:8000/verification/upload-image/", {
    //     method: "POST",
    //     body: doc,
    //   });
    // });
    // setTimeout(ping(), 2000);
  };
  // const ping = ()=>{
  //     fetch("http://127.0.0.1:8000/verify/batchdata/", {
  //       method: "GET",
  //     }).then((res) => {
  //       return res.json();
  //     }).then((data) => {
  //       setStatus(data);
  //       setTimeout(ping, 2000)
  //     });
  // }
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <NavBar />
      <Stack
        spacing={3}
        marginTop={"34px"}
        paddingX={"250px"}
        paddingY={"20px"}
        borderRadius={5}
        sx={{ backgroundColor: "white" }}
        boxShadow={'0px 0px 20px gray'}
      >
        <Typography variant="h2" alignSelf={"center"}>
          Batch Upload
        </Typography>
        <h2>Upload Files:</h2>
        <div className="flex space-x-4">
          <input
            type="file"
            multiple
            onChange={(e) => {
              setDocuments(Array.from(e.target.files));
              console.log(Array.from(e.target.files));
            }}
          />
          <label htmlFor="type">Type : </label>
          <input
            id="type"
            // className="m-3 border border-red"
            type="text"
            value={type}
            onChange={(e) => settype(e.target.value)}
          />
          <button
            onClick={handleUpload}
            type="button"
            // className="px-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            Upload
          </button>
        </div>
        {/* <div className="">
          {documents.map((file, index) => (
            <div key={index} className="">
              {file.name}
            </div>
          ))}
        </div> */}
      </Stack>
      <Stack spacing={3}>
        {finalData.length!==0?<Typography variant="h3">Extracted Data:</Typography>:""}
        <Stack flexWrap={'wrap'} spacing={4}>{finalData.map((data) => {
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
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography component="div" variant="h5">
                    <pre>{JSON.stringify(data.data, null, 2)}</pre>
                  </Typography>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: '151px' }}
                image={data.link}
                alt={data.link}
              />
            </Card>
            // </Stack>
          );
        })}</Stack>
      </Stack>
      {/* <div>
        {documents.map((file) => (
          <div
            key={file.name}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {file.name}
              </h5>
            </a>
            <div
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              extracted data:{" "}
              {status[file.name] ? status[file.name] : "loading..."}
              time: {status?.timetaken}
            </div>
          </div>
        ))}
      </div> */}

      {/* <div>
        <button onClick={ping}>
          PING
        </button>
      </div> */}
    </Stack>
  );
};

export default BatchUpload;
