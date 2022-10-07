import styled from "styled-components";
import { getCookie } from "../shared/Cookie";
import { Box } from "@mui/material";
export default function ChatForm({ item }) {
  return (
    <>
      {item.senderId == getCookie("id") ? (
        <Box
          style={{
            textAlign: "right",
            marginTop: "20px",
            paddingLeft: "auto",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            sx={{
              height: "100%",
              verticalAlign: "middle",
              fontSize: "13px",
              color: "gray",
              paddingTop: "1rem",
            }}
          >
            {item.createdAt.slice(5, 7)}.{item.createdAt.slice(8, 10)}
          </Box>

          <Box
            component="span"
            style={{
              backgroundColor: "#989FA7",
              color: "white",
              borderRadius: "5px",
              fontSize: "20px",
              padding: "5px 10px",
            }}
          >
            {item.message}
          </Box>
        </Box>
      ) : (
        <Box style={{ textAlign: "left", marginTop: "20px", display: "flex" }}>
          <Box
            component="span"
            style={{
              backgroundColor: "#8D8C86",
              color: "white",
              borderRadius: "5px",
              fontSize: "20px",
              padding: "5px 10px",
            }}
          >
            {item.message}
          </Box>
          <Box>
            <Box
              sx={{
                height: "100%",
                verticalAlign: "middle",
                fontSize: "13px",
                color: "gray",
                paddingTop: "1rem",
              }}
            >
              {item.createdAt.slice(5, 7)}.{item.createdAt.slice(8, 10)}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
