/* ═══════════════════════════════════════════
   INTERACTIVE GLOBE — Global Research Footprint
   Three.js 3D Globe with arc connections
   from Ashoka University to partners worldwide
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  var container = document.getElementById('globe-container');
  if (!container) return;

  var ASHOKA = { lat: 28.85, lng: 77.10, name: 'Ashoka University' };

  var PARTNERS = [
    // ── Research Partners (International) ──
    { lat: 51.76, lng: -1.26, name: 'University of Oxford', category: 'research' },
    { lat: 33.64, lng: -117.84, name: 'UC Irvine', category: 'research' },
    { lat: 45.50, lng: -73.58, name: 'McGill University, Montreal', category: 'research' },
    { lat: 33.99, lng: -81.03, name: 'U of South Carolina', category: 'research' },
    { lat: 39.33, lng: -76.62, name: 'Johns Hopkins University, Baltimore', category: 'research' },
    { lat: 50.93, lng: -1.40, name: 'U of Southampton', category: 'research' },
    { lat: 40.45, lng: -3.73, name: 'Complutense University of Madrid (GRASIA)', category: 'research' },
    { lat: 51.52, lng: -0.13, name: 'Wellcome Trust, UK', category: 'research' },
    { lat: 42.39, lng: -72.53, name: 'UMass Amherst', category: 'research' },
    { lat: 11.93, lng: 79.83, name: 'French Institute of Pondicherry', category: 'research' },
    { lat: 47.62, lng: -122.35, name: 'Allen Institute of Cell Science, Seattle', category: 'research' },
    { lat: 52.08, lng: 4.31, name: 'Many Babies Consortium', category: 'research' },

    // ── Research Institutions (India) ──
    { lat: 28.57, lng: 77.21, name: 'AIIMS New Delhi', category: 'research-india' },
    { lat: 22.31, lng: 87.31, name: 'IIT Kharagpur', category: 'research-india' },
    { lat: 19.13, lng: 72.92, name: 'IIT Bombay', category: 'research-india' },
    { lat: 28.55, lng: 77.19, name: 'IIT Delhi', category: 'research-india' },
    { lat: 18.55, lng: 73.81, name: 'IISER Pune', category: 'research-india' },
    { lat: 23.29, lng: 87.54, name: 'IISER Kolkata', category: 'research-india' },
    { lat: 23.26, lng: 77.41, name: 'IISER Bhopal', category: 'research-india' },
    { lat: 22.66, lng: 88.40, name: 'S.N. Bose National Centre, Kolkata', category: 'research-india' },
    { lat: 12.92, lng: 79.13, name: 'CMC Vellore', category: 'research-india' },
    { lat: 13.07, lng: 77.58, name: 'NCBS Bangalore', category: 'research-india' },
    { lat: 17.38, lng: 78.49, name: 'NIN/ICMR Hyderabad', category: 'research-india' },
    { lat: 19.13, lng: 72.92, name: 'National Disease Modeling Consortium', category: 'research-india' },
    { lat: 28.53, lng: 77.58, name: 'Shiv Nadar University', category: 'research-india' },

    // ── Clinical Partners ──
    { lat: 28.57, lng: 77.21, name: 'Max Hospital, Delhi', category: 'clinical' },
    { lat: 28.63, lng: 77.21, name: 'Dr. RML Hospital, Delhi', category: 'clinical' },
    { lat: 28.57, lng: 77.21, name: 'WHO-SEARO, Delhi', category: 'clinical' },

    // ── Government & National Bodies ──
    { lat: 28.61, lng: 77.23, name: 'NACO', category: 'government' },
    { lat: 28.61, lng: 77.23, name: 'MeitY / India-AI Mission', category: 'government' },
    { lat: 28.63, lng: 77.22, name: 'Bureau of Indian Standards', category: 'government' },
    { lat: 26.22, lng: 78.18, name: 'BSF Academy, Gwalior', category: 'government' },
    { lat: 28.61, lng: 77.21, name: 'OHDSI India Chapter', category: 'government' },

    // ── Industry / Ecosystem ──
    { lat: 47.64, lng: -122.13, name: 'Karya Inc. & Microsoft Research', category: 'industry' },
    { lat: 10.02, lng: 76.31, name: 'TinkerHub Foundation, Kerala', category: 'industry' },
    { lat: 28.61, lng: 77.21, name: 'Param Innovation', category: 'industry' },
    { lat: 23.02, lng: 72.57, name: 'Maker Bhavan Foundation', category: 'industry' },

    // ── Conference Presentations ──
    { lat: 32.72, lng: -117.16, name: 'NeurIPS 2023, San Diego', category: 'conference' },
    { lat: 31.23, lng: 121.47, name: 'EMNLP 2025, Suzhou', category: 'conference' },
    { lat: 57.71, lng: 11.97, name: 'HCII 2025, Gothenburg', category: 'conference' },
    { lat: 53.34, lng: -6.26, name: 'ACM Multimedia 2025, Dublin', category: 'conference' },
    { lat: 50.06, lng: 19.94, name: 'CFTC IX, Krakow', category: 'conference' },
    { lat: 38.72, lng: -9.14, name: 'EACR 2025, Lisbon', category: 'conference' },
    { lat: 22.28, lng: 114.16, name: 'ASIACCS 2025, Hanoi', category: 'conference' },
    { lat: 48.85, lng: 2.35, name: 'Sorbonne University, Paris', category: 'conference' },
    { lat: 10.76, lng: 79.14, name: 'SASTRA, Thanjavur', category: 'conference' },
    { lat: 34.08, lng: 74.80, name: 'NIT Srinagar (NCVPRIPG 2025)', category: 'conference' },
    { lat: 52.51, lng: 13.39, name: 'TU Berlin', category: 'conference' },
    { lat: 52.24, lng: 6.85, name: 'University of Twente, Netherlands (IFOW 2024)', category: 'conference' },
    { lat: 13.76, lng: 100.50, name: 'IDM 2024, Bangkok', category: 'conference' },
    { lat: 33.75, lng: -84.39, name: 'IEEE Radar Conference 2021, Atlanta', category: 'conference' },
    { lat: 23.22, lng: 72.68, name: 'IIT Gandhinagar (IAMS 2025)', category: 'conference' },
    { lat: 28.61, lng: 77.21, name: 'India-AI Impact Summit 2026, Bharat Mandapam', category: 'conference' },
    { lat: 19.28, lng: 84.79, name: 'IISER Berhampur (ISEB 2025)', category: 'conference' },

    // ── Student Placements ──
    { lat: -35.28, lng: 149.13, name: 'ANU, Canberra (Student Placement)', category: 'placement' },
    { lat: 35.23, lng: 128.68, name: 'GIST, South Korea (Student Placement)', category: 'placement' },
    { lat: 45.50, lng: -73.58, name: 'McGill University (Student Placement)', category: 'placement' },

    // ── Field Sites ──
    { lat: 32.22, lng: 78.17, name: 'Spiti Valley (Field Site)', category: 'field' },
    { lat: 24.63, lng: 93.91, name: 'Manipur (Field Site)', category: 'field' },
    { lat: 24.58, lng: 80.83, name: 'Satpura Tiger Reserve (Field Site)', category: 'field' }
  ];

  // ── Category Colors ──
  var CAT_COLORS = {
    'research':       0x4dabf7,  // blue
    'research-india': 0x4dabf7,  // blue
    'clinical':       0xff6b9d,  // pink
    'government':     0xfcc419,  // yellow
    'industry':       0xff922b,  // orange
    'conference':     0x51cf66,  // green
    'placement':      0xcc5de8,  // purple
    'field':          0x20c997   // teal
  };

  var CAT_LABELS = {
    'research':       'Research Partner',
    'research-india': 'Research Institution',
    'clinical':       'Clinical Partner',
    'government':     'Government Body',
    'industry':       'Industry / Ecosystem',
    'conference':     'Conference Presentation',
    'placement':      'Student Placement',
    'field':          'Field Site'
  };

  // ── Scene Setup ──
  var width = container.clientWidth;
  var isInSideBySide = !!container.closest('.globe-layout');
  var height = isInSideBySide
    ? Math.min(550, Math.max(380, (window.innerHeight - 72) * 0.75))
    : Math.min(700, Math.max(500, window.innerHeight * 0.7));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = isInSideBySide ? 3.2 : 2.6;

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // ── Globe with Earth texture ──
  var textureLoader = new THREE.TextureLoader();
  var earthTexture = textureLoader.load('../src/assets/images/earth-dark.jpg');

  var globeGeometry = new THREE.SphereGeometry(1, 64, 64);
  var globeMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpScale: 0.02,
    shininess: 10,
    specular: new THREE.Color(0x222244)
  });
  var globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);

  // ── Subtle wireframe ──
  var wireGeometry = new THREE.SphereGeometry(1.003, 48, 24);
  var wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x4dabf7, wireframe: true, transparent: true, opacity: 0.04
  });
  var wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
  scene.add(wireframe);

  // ── Atmosphere ──
  var atmosGeometry = new THREE.SphereGeometry(1.12, 64, 64);
  var atmosMaterial = new THREE.ShaderMaterial({
    vertexShader: 'varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
    fragmentShader: 'varying vec3 vN;void main(){float i=pow(0.55-dot(vN,vec3(0,0,1)),2.5);gl_FragColor=vec4(0.3,0.67,0.97,0.8)*i;}',
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });
  scene.add(new THREE.Mesh(atmosGeometry, atmosMaterial));

  // ── Lighting ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  var sun = new THREE.DirectionalLight(0xffffff, 0.9);
  sun.position.set(5, 3, 5);
  scene.add(sun);
  var rim = new THREE.DirectionalLight(0x4dabf7, 0.4);
  rim.position.set(-5, -2, -5);
  scene.add(rim);

  // ── Helpers ──
  function latLngToV3(lat, lng, r) {
    var phi = (90 - lat) * Math.PI / 180;
    var theta = (lng + 180) * Math.PI / 180;
    return new THREE.Vector3(
      -(r) * Math.sin(phi) * Math.cos(theta),
      (r) * Math.cos(phi),
      (r) * Math.sin(phi) * Math.sin(theta)
    );
  }

  // ── Dots ──
  var dotGroup = new THREE.Group();
  scene.add(dotGroup);

  // Ashoka hub dot
  var ashokaDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.03, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xff6b6b })
  );
  ashokaDot.position.copy(latLngToV3(ASHOKA.lat, ASHOKA.lng, 1.015));
  dotGroup.add(ashokaDot);

  // Ashoka glow
  var glowMat = new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.25 });
  var ashokaGlow = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), glowMat);
  ashokaGlow.position.copy(ashokaDot.position);
  dotGroup.add(ashokaGlow);

  // Ashoka pulse ring
  var pulseMat = new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
  var pulseRing = new THREE.Mesh(new THREE.RingGeometry(0.035, 0.06, 32), pulseMat);
  var aPos = latLngToV3(ASHOKA.lat, ASHOKA.lng, 1.018);
  pulseRing.position.copy(aPos);
  pulseRing.lookAt(aPos.clone().multiplyScalar(2));
  dotGroup.add(pulseRing);

  // Partner dots
  PARTNERS.forEach(function (p) {
    var color = CAT_COLORS[p.category] || 0xffffff;
    var dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.014, 8, 8),
      new THREE.MeshBasicMaterial({ color: color })
    );
    dot.position.copy(latLngToV3(p.lat, p.lng, 1.012));
    dotGroup.add(dot);

    // Glow
    var g = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 8, 8),
      new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.12 })
    );
    g.position.copy(dot.position);
    dotGroup.add(g);
  });

  // ── Arcs ──
  var arcGroup = new THREE.Group();
  scene.add(arcGroup);

  function createArc(sLat, sLng, eLat, eLng, color, opacity) {
    var s = latLngToV3(sLat, sLng, 1.012);
    var e = latLngToV3(eLat, eLng, 1.012);
    var mid = s.clone().add(e).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(1.0 + s.distanceTo(e) * 0.45);
    var curve = new THREE.QuadraticBezierCurve3(s, mid, e);
    var geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
    return new THREE.Line(geo, new THREE.LineBasicMaterial({
      color: color, transparent: true, opacity: opacity || 0.45
    }));
  }

  PARTNERS.forEach(function (p) {
    var color = CAT_COLORS[p.category] || 0x4dabf7;
    var opacity = (p.category === 'conference' || p.category === 'placement' || p.category === 'field') ? 0.3 : 0.5;
    arcGroup.add(createArc(ASHOKA.lat, ASHOKA.lng, p.lat, p.lng, color, opacity));
  });

  // ── Tooltip ──
  var tooltip = document.createElement('div');
  tooltip.style.cssText = 'position:absolute;display:none;background:rgba(15,23,42,0.94);color:#fff;padding:10px 16px;border-radius:8px;font-size:0.8rem;font-family:var(--font-body,"Manrope",sans-serif);pointer-events:none;z-index:10;border:1px solid rgba(77,171,247,0.3);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,0.4);line-height:1.5;';
  container.style.position = 'relative';
  container.appendChild(tooltip);

  // ── Raycaster ──
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  function getHoverInfo(obj) {
    var idx = dotGroup.children.indexOf(obj);
    if (idx <= 2) return { name: ASHOKA.name, label: 'Ashoka University' };
    var pi = Math.floor((idx - 3) / 2);
    if (pi >= 0 && pi < PARTNERS.length) {
      var p = PARTNERS[pi];
      return { name: p.name, label: CAT_LABELS[p.category] || '' };
    }
    return null;
  }

  var isHovering = false;

  container.addEventListener('mousemove', function (e) {
    isHovering = true;
    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var hits = raycaster.intersectObjects(dotGroup.children, false);

    if (hits.length > 0) {
      var info = getHoverInfo(hits[0].object);
      if (info) {
        var catColor = info.label === 'Hub' ? '#ff6b6b' : '#4dabf7';
        // Find category color
        for (var k in CAT_LABELS) {
          if (CAT_LABELS[k] === info.label) {
            var c = CAT_COLORS[k];
            catColor = '#' + ('000000' + c.toString(16)).slice(-6);
            break;
          }
        }
        tooltip.innerHTML = '<span style="color:' + catColor + ';font-size:0.65rem;text-transform:uppercase;letter-spacing:0.05em;font-family:var(--font-mono,monospace);">' + info.label + '</span><br>' + info.name;
        tooltip.style.display = 'block';
        tooltip.style.left = Math.min(e.clientX - rect.left + 14, rect.width - 220) + 'px';
        tooltip.style.top = (e.clientY - rect.top - 10) + 'px';
        renderer.domElement.style.cursor = 'pointer';
        return;
      }
    }
    tooltip.style.display = 'none';
    renderer.domElement.style.cursor = 'grab';
  });

  container.addEventListener('mouseleave', function () {
    tooltip.style.display = 'none';
    isHovering = false;
  });

  // ── Drag ──
  var isDragging = false;
  var prev = { x: 0, y: 0 };
  var autoSpeed = 0.0015;
  var target = { x: 0.4, y: -((ASHOKA.lng + 180) * Math.PI / 180) + Math.PI };

  renderer.domElement.addEventListener('mousedown', function (e) {
    isDragging = true; prev.x = e.clientX; prev.y = e.clientY;
    renderer.domElement.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    target.y += (e.clientX - prev.x) * 0.005;
    target.x = Math.max(-1.2, Math.min(1.2, target.x + (e.clientY - prev.y) * 0.005));
    prev.x = e.clientX; prev.y = e.clientY;
  });
  window.addEventListener('mouseup', function () {
    isDragging = false; renderer.domElement.style.cursor = 'grab';
  });

  // Touch
  renderer.domElement.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) { isDragging = true; prev.x = e.touches[0].clientX; prev.y = e.touches[0].clientY; }
  }, { passive: true });
  renderer.domElement.addEventListener('touchmove', function (e) {
    if (!isDragging || e.touches.length !== 1) return;
    target.y += (e.touches[0].clientX - prev.x) * 0.005;
    target.x = Math.max(-1.2, Math.min(1.2, target.x + (e.touches[0].clientY - prev.y) * 0.005));
    prev.x = e.touches[0].clientX; prev.y = e.touches[0].clientY;
  }, { passive: true });
  renderer.domElement.addEventListener('touchend', function () { isDragging = false; });

  renderer.domElement.style.cursor = 'grab';

  // ── Animate ──
  var pt = 0;
  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging && !isHovering) target.y += autoSpeed;

    globe.rotation.x += (target.x - globe.rotation.x) * 0.06;
    globe.rotation.y += (target.y - globe.rotation.y) * 0.06;
    wireframe.rotation.copy(globe.rotation);
    dotGroup.rotation.copy(globe.rotation);
    arcGroup.rotation.copy(globe.rotation);

    pt += 0.04;
    var s = 1 + Math.sin(pt) * 0.4;
    pulseRing.scale.set(s, s, 1);
    pulseMat.opacity = 0.5 - Math.sin(pt) * 0.3;
    glowMat.opacity = 0.2 + Math.sin(pt * 0.8) * 0.1;

    renderer.render(scene, camera);
  }
  animate();

  // ── Resize ──
  window.addEventListener('resize', function () {
    var w = container.clientWidth;
    var h = isInSideBySide
      ? Math.min(550, Math.max(380, (window.innerHeight - 72) * 0.75))
      : Math.min(700, Math.max(500, window.innerHeight * 0.7));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // ── Legend ──
  var legend = document.createElement('div');
  legend.className = 'globe-legend';
  legend.innerHTML = [
    '<span style="color:#ff6b6b;">◉</span> Ashoka University',
    '<span style="color:#4dabf7;">●</span> Research Partner',
    '<span style="color:#ff6b9d;">●</span> Clinical Partner',
    '<span style="color:#fcc419;">●</span> Government',
    '<span style="color:#ff922b;">●</span> Industry',
    '<span style="color:#51cf66;">●</span> Conference',
    '<span style="color:#cc5de8;">●</span> Student Placement',
    '<span style="color:#20c997;">●</span> Field Site'
  ].join(' &nbsp;&nbsp; ');
  container.appendChild(legend);

})();
