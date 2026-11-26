import { ImageResponse } from "next/og";

export const alt =
  "LYONDEV — Web Development & Custom Software Solutions in Nairobi, Kenya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#0A0A0A",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: "58px", height: "6px", backgroundColor: "#FFD700" }} />
          <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "5px" }}>LYONDEV</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ fontSize: "62px", fontWeight: 700, lineHeight: 1.08 }}>
            Web Development &amp;
          </div>
          <div style={{ display: "flex", gap: "12px", fontSize: "62px", fontWeight: 700 }}>
            <span style={{ color: "#FFD700" }}>Custom Software</span>
            <span>Solutions</span>
          </div>
          <div style={{ marginTop: "8px", fontSize: "28px", color: "#BDBDBD" }}>
            Nairobi, Kenya
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #333333",
            paddingTop: "22px",
            color: "#FFD700",
            fontSize: "21px",
            letterSpacing: "2px",
          }}
        >
          <span>Technology. Innovation. Growth.</span>
          <span>Web | Software | Digital Solutions</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
