import React, { useState, useRef, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import Context from "./context";
import Sections from "./components/Sections";
import SubSection from "./components/SubSection";

import Floor from "./components/Floor";
import Button from "./components/Button";
import Menu from "./components/Menu";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Title from "./components/Title";
import { OrbitControls } from "@react-three/drei";
import { useLocation, useParams, useNavigate } from "react-router-dom";

// import Rotate from "./components/Rotate";
// import { sectionsData as sectionsData } from "./data/data";

extend({ TextGeometry });

function Main(props) {
  let params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [bloomInit, setBloomInit] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [floorReady, setFloorReady] = useState(false);
  const [contentfulData, setContentfulData] = useState(null);
  const [cameraTarget, setCameraTarget] = useState([0, 0, 0]);
  const [urlSection, setUrlSection] = useState(null);
  // console.log(
  //   "contentfulData",
  //   contentfulData ? contentfulData.filter(
  //     (section) =>
  //       section.title.toLowerCase() ===
  //       location.pathname.split("/")[1].toLowerCase()
  //   )[0] !== undefined ? contentfulData.filter(
  //     (section) =>
  //       section.title.toLowerCase() ===
  //       location.pathname.split("/")[1].toLowerCase()
  //   )[0].sys.id : null : null
  // );

  // const urlSection = contentfulData
  //   ? contentfulData.filter(
  //       (section) =>
  //         section.title.toLowerCase() ===
  //         location.pathname.split("/")[1].toLowerCase()
  //     )[0] !== undefined
  //     ? contentfulData.filter(
  //         (section) =>
  //           section.title.toLowerCase() ===
  //           location.pathname.split("/")[1].toLowerCase()
  //       )[0].sys.id
  //     : null
  //   : null;
  const [currentSection, setCurrentSection] = useState(0);

  const [currentSubSectionContent, setCurrentSubSectionContent] =
    useState(null);
  // console.log("params.id",params.id)
  const [currentSubSection, setCurrentSubSection] = useState(
    params.id ? params.id : 0
  );
  var windowWidth =
    window.screen.width < window.outerWidth
      ? window.screen.width
      : window.outerWidth;
  var isMobile = windowWidth < 500;
  const contextValue = {
    setBloomInit: setBloomInit,
    bloomInit: bloomInit,
    currentSection: currentSection,
    setCurrentSection: setCurrentSection,
    currentSubSection: currentSubSection,
    setCurrentSubSection: setCurrentSubSection,
    isMobile: isMobile,
    menuActive: menuActive,
    setMenuActive: setMenuActive,
    contentfulData: contentfulData,
    floorReady: floorReady,
    setFloorReady: setFloorReady,
    setCurrentSubSectionContent: setCurrentSubSectionContent,
    currentSubSectionContent: currentSubSectionContent,
  };
  const controlsRef = useRef();

  useEffect(() => {
    console.log("currentSection", currentSection);

    if (contentfulData) {
      var index =
        currentSection === 0
          ? "/"
          : "/" +
            contentfulData
              .filter((section) => section.sys.id === currentSection)[0]
              .title.toLowerCase();
      console.log("index", index);
      setCurrentSubSection(0);
      setMenuActive(false);
    }
    navigate(index);
  }, [currentSection]);

  useEffect(() => {
    if (contentfulData) {
      console.log("contentfulData", contentfulData);
      setUrlSection(location.pathname.split("/")[1].toLowerCase());
    }
  }, [contentfulData]);
  useEffect(() => {
    setMenuActive(false);
  }, [currentSubSection]);

  useEffect(() => {
    setCurrentSection(
      contentfulData
        ? contentfulData.filter(
            (section) => section.title.toLowerCase() === urlSection
          )[0] !== undefined
          ? contentfulData.filter(
              (section) => section.title.toLowerCase() === urlSection
            )[0].sys.id
          : 0
        : 0
    );

    setBloomInit(urlSection != null ? true : false);
  }, [urlSection]);

  useEffect(() => {
    const TOKEN = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;
    const SPACEID = process.env.REACT_APP_CONTENTFUL_SPACE_ID;

    const fetchData = async () => {
      const data = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${SPACEID}/environments/master?access_token=${TOKEN}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authenticate the request
            // Authorization: "Bearer ${TOKEN}",
          },
          // send the GraphQL query
          body: JSON.stringify({ query }),
        }
      )
        .then((response) => response.json())
        .then(({ data, errors }) => {
          if (errors) {
            console.error(errors);
          }
          const mapArray = data.pageCollection.items.map((section) => {
            // console.log("section", section.cameraFov);
            // console.log("section", section.title);
            section.position = section.position ? section.position : [0, 0, 0];
            section.rotation = [0, 0, 0];
            section.scale = section.scale ? section.scale : [0.85, 0.85, 0.85];
            section.glb = "flower";
            section.rotationSpeed = section.rotationSpeed
              ? section.rotationSpeed
              : 0.35;
            section.cameraPosition = section.cameraPosition
              ? section.cameraPosition
              : [5, 10, -18];
            section.cameraFOV = section.cameraFov ? section.cameraFov : 45;
            section.cameraLookAt = section.cameraLookAt
              ? section.cameraLookAt
              : [0, 0, 0];
            const items = section.itemsCollection.items;
            const subCollection = [];
            items.map((item, index) => {
              const query =
                item.__typename == "Photo"
                  ? photoQuery(item.sys.id, index)
                  : item.__typename == "Skill"
                  ? skillQuery(item.sys.id, index)
                  : item.__typename == "Job"
                  ? jobQuery(item.sys.id, index)
                  : projectQuery(item.sys.id, index);

              const itemData = async () => {
                const getit = await fetch(
                  `https://graphql.contentful.com/content/v1/spaces/${SPACEID}/environments/master?access_token=${TOKEN}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query }),
                  }
                )
                  .then((response) => response.json())
                  .then(({ data, errors }) => {
                    if (errors) {
                      console.error(errors);
                    }
                    subCollection.push(data);
                  });
              };
              itemData()
                // make sure to catch any error
                .catch(console.error);

              section.itemsCollection = subCollection;
            });

            return section;
          });

          // rerender the entire component with new data
          setContentfulData(mapArray);
        });
    };
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
  // console.log("camera target", cameraTarget);
  if (!contentfulData) {
    return "Loading...";
  }
  return (
    <Context.Provider value={contextValue}>
      <div className="main">
        <div className="dom-container">
          <SubSection contextValue={contextValue} />
          <Menu contextValue={contextValue} />
        </div>
        <div className="canvas-container">
          {/* <SpringTest /> */}
          <Canvas shadows camera={{ position: [0, 6, -25], fov: 95 }}>
            <ambientLight intensity={0.1} />
            <directionalLight
              position={[-10, 20, -10]}
              intensity={1}
              castShadow
              shadow-mapSize-height={512}
              shadow-mapSize-width={512}
              shadow-camera-far={100}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            {/* <directionalLight
            position={[-10, -40, -30]}
            intensity={.5}
            castShadow

          /> */}
            {/* <mesh castShadow receiveShadow  position={[3, 2, 0]}>
          <boxGeometry args={[2, 2, 2]}/>
          <meshStandardMaterial />
        </mesh> */}

            <Sections
              bloomInit={bloomInit}
              contextValue={contextValue}
              controlsRef={controlsRef}
            />

            {/* <mesh receiveShadow castShadow renderOrder={2000} position={[10, 5, 10]} rotation={[0, 0, 0]}>
        <textGeometry args={['MICHAEL MOSLEY', { font, size: 20, height: 10 }]} />
        <meshNormalMaterial />
        </mesh> */}

            <group
              name="text"
              position={[0, 0, 60]}
              rotation={[0, -Math.PI, 0]}
            >
              <Title layers={[0]} name="title" contextValue={contextValue} />
            </group>
            <Button
              contextValue={contextValue}
              position={[0, 3, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              physicalMaterial={{
                color: "#71f604",
                reflectivity: 0.7,
                roughness: 0.2,
                metalness: 0,
              }}
            />
            <Floor contextValue={contextValue} />
            <OrbitControls
              target={currentSubSection ? [0, 5, 0] : cameraTarget}
              ref={controlsRef}
              enableRotate={currentSubSection ? false : true}
              enableZoom={false}
              makeDefault
              maxPolarAngle={Math.PI / 2 - 0.1}
            />
          </Canvas>
        </div>
      </div>
    </Context.Provider>
  );
}
const query = `{
  pageCollection (limit: 10) {
    items {
      title
      sys {
        id
      }
      itemsCollection {
        items {
          __typename
          sys {
            id
            
          }
        }
      }
      rotationSpeed
      position
      scale
      cameraPosition
      cameraLookAt
      cameraFov
    }
  }
}

`;

const photoQuery = (id, index) => {
  return `{ 
    photo(id: "${id}") {
      sys {
        id
      }
      image {
        url
        title
      }
    }
}
`;
};

const jobQuery = (id, index) => {
  return `{ 
    job(id:"${id}") {
      sys {
        id
      }
      company
      jobTitle
      startDate
      endDate
      description {
        json
      }
    }
}
`;
};

const projectQuery = (id, index) => {
  return `{ 
    project(id: "${id}") {
      sys {
        id
      }
      title
      poster {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      video {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      description {
        json
      }
    }
}
`;
};

const skillQuery = (id, index) => {
  return `{ 
    
   skill(id: "${id}") {
    sys {
      id
    }
      name
    }
}
`;
};
export default Main;
