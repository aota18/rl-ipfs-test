import { Detector } from "../utils/ccapture/scripts/Detector";
import gsap from "gsap";
import CCapture from "ccapture.js-npmfixed";
import { FontLoader } from "../utils/ccapture/scripts/FontLoader";
import { useState, useEffect } from "react";
import { TextGeometry } from "../utils/ccapture/scripts/TextGeometry";
import * as THREE from "three";
import moment from "moment";

/*
    TextObj Properties
    {
        creator: text,
        eventLine2: text (max: 9 letters)
        eventLine3: text (max: 9 letters)
        numOfTickets: number;
        eventStartDate: number;
    }
*/
const useGifEncoder = (textObj, setValue, setGIFCreated) => {
  const [loading, setLoading] = useState(false);

  // THREE script load
  let capturer;

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    console.log("start Init");
    // Load CCapture Script
    let font;
    let container;
    let camera, scene, renderer;
    let lastTime = null;
    let ellapsedTime;

    const pivotGroup = new THREE.Group();
    const group = new THREE.Group();

    let m = 1;
    let bgPlaneGeoWidth = 2.5 * m;
    let planeGeoWidth = 1 * m;

    let windowWidth = 240;
    let windowHeight = 240;

    container = document.getElementById("container");

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    camera = new THREE.PerspectiveCamera(
      45,
      windowWidth / windowHeight,
      0.1,
      1000
    );

    camera.aspect = ((windowWidth * m) / windowHeight) * m;

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3 * m;

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.sortObjects = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xdddddd);
    renderer.setSize(windowWidth, windowHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    // Background PLANE
    var bgPlaneGeo = new THREE.PlaneGeometry(bgPlaneGeoWidth, bgPlaneGeoWidth);
    const bgTexture = new THREE.TextureLoader().load("/ticket-background.png");
    const bgMat = new THREE.MeshBasicMaterial({ map: bgTexture });
    var bgPlane = new THREE.Mesh(bgPlaneGeo, bgMat);

    // Text PLANE
    let planeBackgroundColor = 0x6697ef;
    var planeGeo = new THREE.PlaneGeometry(planeGeoWidth, planeGeoWidth);
    var planeMat = new THREE.MeshBasicMaterial({
      color: planeBackgroundColor,
      side: THREE.DoubleSide,
    });
    var plane = new THREE.Mesh(planeGeo, planeMat);

    // Smoth Movement of Camera
    gsap.to(pivotGroup.position, {
      duration: 0.3,
      z: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut",
    });

    group.add(plane);
    pivotGroup.add(group);
    scene.add(bgPlane);
    scene.add(pivotGroup);

    camera.lookAt(scene.position);

    // Font
    function loadFont() {
      var loader = new FontLoader();
      loader.load("/fonts/Cyberfall_Regular.json", function (res) {
        font = res;
        createText();
      });
    }

    loadFont();

    function getTextGeo() {
      let basicGeoOptions = {
        font: font,
        height: 0.01,
        curveSegments: 1,
        bevelThickness: 0,
        bevelSize: 0.0001,
        bevelSegments: 0,
        bevelEnabled: false,
      };

      let obj = {
        creator: {
          label: `CREATOR: ${textObj.creator}`,
          size: 0.03 * m,
          offset: 2,
        },
        eventLine1: {
          label: "LIFE EVENT:",
          size: 0.06 * m,
          offset: 2,
        },
        eventLine2: {
          label: `${textObj.eventLine2}`,
          size: 0.1 * m,
          offset: 2,
        },
        eventLine3: {
          label: `${textObj.eventLine3}`,
          size: 0.1 * m,
          offset: 2,
        },

        infoParticipants: {
          label: `OTHER PARTICIPANTS: ${textObj.numOfTickets}`,
          size: 0.04 * m,
          offset: 2,
        },

        infoDate: {
          label: `DATE: ${moment(textObj.eventStartDate).format("YYYY-MM-DD")}`,
          size: 0.04 * m,
          offset: 2,
        },
        infoBlockId: {
          label: "BLOCK ID: 39927343",
          size: 0.03 * m,
          offset: 2,
        },
      };

      let textGeoArr = Object.keys(obj).map((key, idx) => {
        let textGeo = new TextGeometry(obj[key].label, {
          ...basicGeoOptions,
          size: obj[key].size,
        });

        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();

        return textGeo;
      });

      return textGeoArr;
    }

    function createText() {
      let objPositions = [
        {
          x: -0.45,
          y: 0.4,
        },
        {
          x: -0.45,
          y: 0.2,
        },
        {
          x: -0.45,
          y: 0.08,
        },
        {
          x: -0.45,
          y: -0.05,
        },
        {
          x: -0.45,
          y: -0.2,
        },
        {
          x: -0.45,
          y: -0.25,
        },
        {
          x: 0,
          y: -0.4,
        },
      ];

      let textGeoArr = getTextGeo();
      let textMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      textGeoArr.forEach((item, idx) => {
        var text = new THREE.Mesh(item, textMat);
        text.position.x = objPositions[idx].x * m;
        text.position.y = objPositions[idx].y * m;

        group.add(text);
      });

      scene.add(pivotGroup);
    }

    animate();

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      var currentTime = Date.now();
      currentTime = performance.now();
      ellapsedTime = currentTime - lastTime;

      renderer.render(scene, camera);

      if (capturer) capturer.capture(renderer.domElement);

      lastTime = currentTime;
    }

    container.appendChild(renderer.domElement);

    lastTime = Date.now();
  };

  const startRecord = () => {
    let framerate = 10;
    let format = "gif";

    capturer = new CCapture({
      verbose: false,
      display: false,
      framerate: framerate,
      motionBlurFrames: (960 / framerate) * 0,
      quality: 99,
      format: format,
      workersPath: "../utils/ccapture/scripts/",
      timeLimit: 4,
      frameLimit: 0,
      autoSaveTime: 0,
    });

    setLoading(true);

    capturer.start();
    console.log("capturer start");

    setTimeout(() => {
      capturer.stop();
      capturer.save((blob) => {
        setValue("ticketImgFiles", [
          new File([blob], "ticket.gif", { type: "image/gif" }),
        ]);
        setLoading(false);
        setGIFCreated(true);
        console.log("gif successfully created");
      });
    }, 4000);
  };

  return { loading, startRecord };
};

export default useGifEncoder;
