// import { useUser, useWallet } from "@civic/auth-web3/react";
// const sections = [
//   { id: "#intro", label: "Intro" },
//   { id: "#panel-1", label: "Character" },
//   { id: "#panel-2", label: "Lobby" },
//   { id: "#panel-3", label: "Assets" },
//   { id: "#panel-4", label: "Chat" },
//   { id: "#panel-5", label: "Games" },
// ];

// export const MapNavigation = ({
//   activeIndex,
//   setActiveIndex,
//   panelsVisible,
//   setPanelsVisible,
// }: {
//   activeIndex: number;
//   setActiveIndex: (index: number) => void;
//   panelsVisible: boolean;
//   setPanelsVisible: (visible: boolean) => void;
// }) => {
//   const { user } = useUser();
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: "20px",
//         left: "3%",
//         zIndex: 9999,
//         display: "flex",
//         flexDirection: "column",
//         gap: "20px",
//       }}
//     >
//       {sections.map((section, index) => (
//         <div
//           key={section.id}
//           onClick={() => setActiveIndex(index)}
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             transform: `translateX(${Math.sin(index * 1.2) * 8}px)`,
//             transition: "transform 0.3s ease",
//             cursor: "pointer",
//           }}
//         >
//           <div
//             style={{
//               width: "14px",
//               height: "14px",
//               borderRadius: "50%",
//               backgroundColor: index === activeIndex ? "white" : "transparent",
//               opacity: index === activeIndex ? 1 : 1,
//               boxShadow:
//                 index === activeIndex
//                   ? "0 0 0 4px rgba(255, 255, 255, 0.2)"
//                   : "none",
//               animation: index === activeIndex ? "pulse 1.6s infinite" : "none",
//               transition: "all 0.3s ease-in-out",
//               border: "1px solid #fff",
//             }}
//           />
//           <span
//             style={{
//               fontSize: "x-small",
//               color: "white",
//               opacity: index === activeIndex ? 1 : 0.6,
//               transition: "opacity 0.3s ease-in-out",
//               whiteSpace: "nowrap",
//               fontFamily: "Michroma-Regular",
//             }}
//           >
//             {section.label}
//           </span>
//         </div>
//       ))}

//       {/* Eye toggle */}
//       <div
//         onClick={() => setPanelsVisible(!panelsVisible)}
//         style={{
//           marginTop: "24px",
//           width: "24px",
//           height: "24px",
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           cursor: "pointer",
//           boxShadow: "0 0 4px rgba(255,255,255,0.4)",
//         }}
//       >
//         <span style={{ fontSize: "16px" }}>{!panelsVisible ? "👁" : "🙈"}</span>
//       </div>
//     </div>
//   );
// };
import { useUser } from "@civic/auth-web3/react";

export const MapNavigation = ({
  activeIndex,
  setActiveIndex,
  panelsVisible,
  setPanelsVisible,
}: {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  panelsVisible: boolean;
  setPanelsVisible: (visible: boolean) => void;
}) => {
  const { user } = useUser();

  // Dynamically set sections based on user
  const sections = [
    { id: "#intro", label: user ? "Profile" : "Intro" },
    { id: "#panel-1", label: "Character" },
    { id: "#panel-2", label: "Lobby" },
    { id: "#panel-3", label: "Assets" },
    { id: "#panel-4", label: "Chat" },
    { id: "#panel-5", label: "Games" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "3%",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {sections.map((section, index) => (
        <div
          key={section.id}
          onClick={() => setActiveIndex(index)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transform: `translateX(${Math.sin(index * 1.2) * 8}px)`,
            transition: "transform 0.3s ease",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: index === activeIndex ? "white" : "transparent",
              opacity: index === activeIndex ? 1 : 1,
              boxShadow:
                index === activeIndex
                  ? "0 0 0 4px rgba(255, 255, 255, 0.2)"
                  : "none",
              animation: index === activeIndex ? "pulse 1.6s infinite" : "none",
              transition: "all 0.3s ease-in-out",
              border: "1px solid #fff",
            }}
          />
          <span
            style={{
              fontSize: "x-small",
              color: "white",
              opacity: index === activeIndex ? 1 : 0.6,
              transition: "opacity 0.3s ease-in-out",
              whiteSpace: "nowrap",
              fontFamily: "Michroma-Regular",
            }}
          >
            {section.label}
          </span>
        </div>
      ))}

      {/* Eye toggle */}
      <div
        onClick={() => setPanelsVisible(!panelsVisible)}
        style={{
          marginTop: "24px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 0 4px rgba(255,255,255,0.4)",
        }}
      >
        <span style={{ fontSize: "16px" }}>{!panelsVisible ? "👁" : "🙈"}</span>
      </div>
    </div>
  );
};
